import crypto from 'node:crypto'

type Tokens = {
  access_token: string
  refresh_token: string
  expires_at: number // epoch ms
  token_type?: string
  scope?: string
}

let tokens: Tokens | null = null
const stateNonces = new Map<string, number>() // state -> expiresAt

function now() { return Date.now() }

export function getAuthMode(): 'pat' | 'oauth' {
  return (process.env.HUBSPOT_AUTH_MODE === 'oauth') ? 'oauth' : 'pat'
}

export function setTokens(t: Tokens) {
  tokens = t
}

export function getTokens(): Tokens | null { return tokens }

export function status() {
  return {
    mode: getAuthMode(),
    hasPat: Boolean(process.env.HUBSPOT_API_KEY || process.env.HUBSPOT_TOKEN),
    hasTokens: Boolean(tokens?.access_token),
    expiresAt: tokens?.expires_at || null,
  }
}

export function createState(): string {
  const s = crypto.randomBytes(16).toString('hex')
  // 10 minutes ttl
  stateNonces.set(s, now() + 10 * 60 * 1000)
  return s
}

export function consumeState(s?: string | null): boolean {
  if (!s) return false
  const exp = stateNonces.get(s)
  if (!exp) return false
  stateNonces.delete(s)
  return exp > now()
}

export function buildAuthUrl(): string {
  const clientId = process.env.HUBSPOT_CLIENT_ID || ''
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI || ''
  const scopes = (process.env.HUBSPOT_SCOPES || '').trim()
  if (!clientId || !redirectUri || !scopes) throw new Error('Missing HUBSPOT_CLIENT_ID, HUBSPOT_REDIRECT_URI or HUBSPOT_SCOPES')
  const state = createState()
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopes,
    state,
  })
  return `https://app.hubspot.com/oauth/authorize?${params.toString()}`
}

export async function exchangeCodeForTokens(code: string) {
  const clientId = process.env.HUBSPOT_CLIENT_ID || ''
  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET || ''
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI || ''
  if (!clientId || !clientSecret || !redirectUri) throw new Error('Missing HUBSPOT_CLIENT_ID/SECRET or HUBSPOT_REDIRECT_URI')

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  })

  const res = await fetch('https://api.hubapi.com/oauth/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    body: body.toString(),
  } as any)

  if (!res.ok) {
    const t = await res.text()
    throw new Error(`HubSpot token exchange failed: ${res.status} ${t}`)
  }
  const json = await res.json() as { access_token: string, refresh_token: string, expires_in: number, token_type?: string, scope?: string }
  const expires_at = now() + (json.expires_in * 1000) - 60_000 // renew 60s early
  setTokens({ access_token: json.access_token, refresh_token: json.refresh_token, expires_at, token_type: json.token_type, scope: json.scope })
}

async function refreshTokens() {
  if (!tokens?.refresh_token) throw new Error('Missing HubSpot refresh token')
  const clientId = process.env.HUBSPOT_CLIENT_ID || ''
  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET || ''
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh_token,
    client_id: clientId,
    client_secret: clientSecret,
  })
  const res = await fetch('https://api.hubapi.com/oauth/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' },
    body: body.toString(),
  } as any)
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`HubSpot token refresh failed: ${res.status} ${t}`)
  }
  const json = await res.json() as { access_token: string, expires_in: number }
  const expires_at = now() + (json.expires_in * 1000) - 60_000
  tokens = { ...tokens!, access_token: json.access_token, expires_at }
}

export async function getAccessToken(): Promise<string> {
  // PAT mode always wins unless explicitly set to oauth
  if (getAuthMode() !== 'oauth') {
    const pat = process.env.HUBSPOT_API_KEY || process.env.HUBSPOT_TOKEN || ''
    if (!pat) throw new Error('Missing HubSpot token (set HUBSPOT_API_KEY or HUBSPOT_TOKEN)')
    return pat
  }
  if (!tokens?.access_token) throw new Error('HubSpot OAuth not connected: no access token')
  if (tokens.expires_at <= now()) {
    await refreshTokens()
  }
  return tokens.access_token
}

export function clearTokens() {
  tokens = null
}

export async function getAccessTokenMetadata(providedToken?: string) {
  const token = providedToken || (getAuthMode() === 'oauth' ? (await getAccessToken()) : '')
  if (!token) throw new Error('Token metadata is only available in OAuth mode or when a token is provided')
  const res = await fetch(`https://api.hubapi.com/oauth/v1/access-tokens/${encodeURIComponent(token)}`, {
    method: 'GET',
    headers: { 'Accept': 'application/json' },
  } as any)
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`HubSpot access token info failed: ${res.status} ${t}`)
  }
  return res.json()
}

export async function revokeRefreshToken(providedRefreshToken?: string) {
  const refresh = providedRefreshToken || tokens?.refresh_token
  if (!refresh) throw new Error('No refresh token to revoke')
  const cid = process.env.HUBSPOT_CLIENT_ID || ''
  const secret = process.env.HUBSPOT_CLIENT_SECRET || ''
  const headers: Record<string,string> = { 'Accept': 'application/json' }
  if (cid && secret) {
    const basic = Buffer.from(`${cid}:${secret}`).toString('base64')
    headers['Authorization'] = `Basic ${basic}`
  }
  const res = await fetch(`https://api.hubapi.com/oauth/v1/refresh-tokens/${encodeURIComponent(refresh)}`, {
    method: 'DELETE',
    headers,
  } as any)
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`HubSpot refresh token revoke failed: ${res.status} ${t}`)
  }
  clearTokens()
  return { success: true }
}
