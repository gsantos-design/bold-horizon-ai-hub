const HUBSPOT_BASE = 'https://api.hubapi.com'
import { getAccessToken, getAuthMode } from './hubspotAuth'

async function hs(path: string, method: string, body?: any) {
  // Use PAT by default; if HUBSPOT_AUTH_MODE=oauth, use OAuth access token with refresh
  const key = await getAccessToken()
  const res = await fetch(HUBSPOT_BASE + path, {
    method,
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  } as any)
  if (!res.ok) {
    const t = await res.text()
    throw new Error(`HubSpot ${method} ${path} failed: ${res.status} ${t}`)
  }
  return res.json()
}

export async function findContactByEmail(email: string) {
  const body = { 
    filterGroups: [{ 
      filters: [{ 
        propertyName: 'email', 
        operator: 'EQ', 
        value: email 
      }]
    }], 
    properties: ['email','firstname','lastname'] 
  }
  const res = await hs('/crm/v3/objects/contacts/search', 'POST', body)
  return (res.results||[])[0] || null
}

export async function listDealsForContact(contactId: string) {
  const res = await hs(`/crm/v4/objects/contacts/${contactId}/associations/deals`, 'GET')
  return (res.results||[]).map((x:any)=>x.to)||[]
}

export async function updateDealStage(dealId: string, pipeline?: string, dealstage?: string) {
  return hs(`/crm/v3/objects/deals/${dealId}`, 'PATCH', { 
    properties: { pipeline, dealstage } 
  })
}

export async function createNoteOnContact(contactId: string, bodyText: string) {
  const note = await hs('/crm/v3/objects/notes', 'POST', { 
    properties: { 
      hs_note_body: bodyText, 
      hs_timestamp: new Date().toISOString() 
    } 
  })
  await hs(`/crm/v4/objects/notes/${note.id}/associations/contacts/${contactId}`, 'PUT', { 
    types: [{ 
      associationCategory:'HUBSPOT_DEFINED', 
      associationTypeId: 202 
    }] 
  })
  return note
}

export async function getHubSpotOwners() {
  try {
    if (getAuthMode() !== 'oauth' && !process.env.HUBSPOT_API_KEY && !process.env.HUBSPOT_TOKEN) {
      console.log('No HubSpot token configured, returning empty results')
      return []
    }
    const res = await hs('/crm/v3/owners', 'GET')
    return res.results || []
  } catch (error) {
    console.log('HubSpot API not available, returning empty results:', error.message)
    return []
  }
}

// Create or update a contact by email (basic upsert)
export async function upsertContact(props: {
  email?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  lifecyclestage?: string;
  [key: string]: any;
}) {
  const properties = {
    lifecyclestage: 'lead',
    ...props,
  }

  let id: string | null = null
  try {
    if (props.email) {
      const existing = await findContactByEmail(props.email)
      if (existing?.id) id = existing.id
    }
  } catch {}

  if (id) {
    await hs(`/crm/v3/objects/contacts/${id}`, 'PATCH', { properties })
    return id
  }

  const created = await hs('/crm/v3/objects/contacts', 'POST', { properties })
  return created.id as string
}
