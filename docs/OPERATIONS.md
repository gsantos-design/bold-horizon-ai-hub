# Bold Horizons AI Hub — Operations Guide

This guide standardizes deploy, DNS, env, endpoints, and quick tests for the AI Hub so recovery is fast if anything drifts.

## Overview
- Stack: React/Vite client + Node/Express server (Node 18+)
- Build: `npm run build` → client in `dist/public`, server bundle `dist/index.js`
- Start: `npm start` → runs `node dist/index.js`
- Server entry: `server/index.ts`
- Routes: `server/routes.ts`

## Domains & DNS
- Hub: `https://hub.boldhorizonsfinancial.com`
- DNS: `CNAME hub → i-hub.onrender.com` (no scheme, no slash)
- Render: add `hub.boldhorizonsfinancial.com` as a Custom Domain on the i-hub service and complete TLS.

## Render Configuration
- Repository: `gsantos-design/bold-horizon-ai-hub`
- Build command: `npm run build`
- Start command: `npm start`
- Runtime: Node 18+

### Required Environment Variables (server only)
- `GEMINI_API_KEY`
- `APPS_SCRIPT_LEADS_URL` (Google Apps Script Web App URL for Sheet logging)
- `LEADS_WEBHOOK_SECRET` (shared secret header for Apps Script)
- `HUBSPOT_API_KEY` (preferred) or `HUBSPOT_TOKEN` (HubSpot Private App token)

### Optional Environment Variables
- `HUBSPOT_PIPELINE`, `HUBSPOT_STAGE`, `HUBSPOT_OWNER_ID`
- `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_MESSAGING_SID`, `TWILIO_PHONE_NUMBER`
- `ENFORCE_HOST=1` (optional: enforce serving only on `hub.boldhorizonsfinancial.com`)

An example template lives at `.env.example`.

## HubSpot Modes
Default is Private App Token (PAT). OAuth is supported but optional.

- PAT (recommended)
  - Create Private App in HubSpot with scopes: contacts read/write, notes write, owners read (deals read/write optional)
  - Set `HUBSPOT_API_KEY` in Render.

- OAuth (optional, multi-account)
  - Set envs: `HUBSPOT_AUTH_MODE=oauth`, `HUBSPOT_CLIENT_ID`, `HUBSPOT_CLIENT_SECRET`, `HUBSPOT_REDIRECT_URI`, `HUBSPOT_SCOPES`
  - Endpoints: see OAuth section below.

## Key Endpoints

Health
- `GET /api/healthz` — basic status
- `GET /api/healthz?deep=1` — checks Google AI, HubSpot, and Apps Script reachability
  - Code: `server/routes.ts:~87`

Lead Capture
- `GET /api/lead` — returns 405 + example (helps avoid “Cannot GET” confusion)
- `POST /api/lead` — logs to Google Sheet and upserts HubSpot Contact + Note (best-effort)
  - Code: `server/routes.ts:~256`

Twilio Inbound SMS
- `POST /api/twilio/sms` — logs SMS to Sheet, upserts HubSpot Contact + Note, replies bilingually; honors STOP
  - Code: `server/routes.ts` (near bottom)
  - Twilio Console → Number → Messaging → “A message comes in” → webhook: `https://hub.boldhorizonsfinancial.com/api/twilio/sms`

HubSpot OAuth (optional)
- `GET /api/hubspot/oauth/init` — redirect to HubSpot consent (requires OAuth env)
- `GET /api/hubspot/oauth/callback` — exchanges code → stores access/refresh tokens (in-memory)
- `GET /api/hubspot/oauth/status` — `{ mode, hasPat, hasTokens, expiresAt }`
- `GET /api/hubspot/oauth/token-info` — metadata for current/explicit token
- `DELETE /api/hubspot/oauth/refresh-token` — revokes refresh token and clears memory
  - Code: `server/lib/hubspotAuth.ts`, routes in `server/routes.ts:~127, ~139, ~156`

## Google Sheet Logging
- `APPS_SCRIPT_LEADS_URL` points to a Web App deployment in Apps Script (spreadsheet logger)
- Requests include header `X-Webhook-Secret: LEADS_WEBHOOK_SECRET`

## Quick Tests

Health (basic and deep)
- `GET https://hub.boldhorizonsfinancial.com/api/healthz`
- `GET https://hub.boldhorizonsfinancial.com/api/healthz?deep=1`

Lead Submit
- curl:
  ```bash
  curl -X POST https://hub.boldhorizonsfinancial.com/api/lead \
    -H "Content-Type: application/json" \
    -d '{"name":"QA Test","email":"qa@example.com","phone":"+15555550123","message":"Sanity test","lang":"en","source":"ops-test"}'
  ```

Twilio SMS (simulate)
- curl (URL-encoded):
  ```bash
  curl -X POST https://hub.boldhorizonsfinancial.com/api/twilio/sms \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "From=%2B15551234567&Body=hola"
  ```

## Troubleshooting
- “Cannot GET /api/lead” in browser → use `POST /api/lead`, or hit `GET /api/lead` for sample payload.
- `/api/healthz?deep=1` shows only Gemini fields → service likely not running latest repo; link Render to `bold-horizon-ai-hub`, set envs, redeploy.
- Lead 500s → confirm `APPS_SCRIPT_LEADS_URL` and `HUBSPOT_API_KEY` are set; the endpoint should still succeed on Sheet-only if HubSpot fails.
- TLS/Domain not working → ensure DNS CNAME `hub → i-hub.onrender.com` is propagated; complete Custom Domain in Render.

## Security Notes
- Never expose HubSpot token (PAT) or OAuth secrets to the browser.
- Keep Twilio/SendGrid keys server-side.
- Consider enabling host enforcement via `ENFORCE_HOST=1` to guard against mismapped domains.

## File Pointers
- Server entry: `server/index.ts`
- Vite/Static: `server/vite.ts`
- Routes: `server/routes.ts`
- HubSpot helper: `server/lib/hubspot.ts`
- OAuth helper: `server/lib/hubspotAuth.ts`
- Env template: `.env.example`

