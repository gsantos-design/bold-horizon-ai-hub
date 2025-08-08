import { NextResponse } from 'next/server'
import { getDb } from '../../../../lib/firestore'
import { findContactByEmail, listDealsForContact, updateDealStage, createNoteOnContact } from '../../../../lib/hubspot'

export async function POST(req: Request) {
  const data = await req.json().catch(()=>null)
  if (!data) return NextResponse.json({ ok:false, error:'No payload' }, { status:400 })
  const payload = data.payload || data
  const email = (payload?.invitee?.email) || (payload?.email) || ''
  const name = (payload?.invitee?.name) || (payload?.name) || ''
  if (!email) return NextResponse.json({ ok:false, error:'No email in payload' }, { status:400 })

  // Update local lead stage
  const db = getDb()
  if (db) {
    const snap = await db.collection('leads').where('email','==', email).limit(5).get()
    for (const doc of snap.docs) {
      await doc.ref.update({ stage: 'Meeting Booked' })
    }
  }

  // Advance HubSpot deals + note
  try {
    const contact = await findContactByEmail(email)
    if (contact) {
      const deals = await listDealsForContact(contact.id)
      const pipeline = process.env.HUBSPOT_PIPELINE || 'default'
      const dealstage = process.env.HUBSPOT_DEALSTAGE_MEETING || 'appointmentscheduled'
      for (const d of deals) await updateDealStage(d.id, pipeline, dealstage)
      await createNoteOnContact(contact.id, `Meeting booked via Calendly for ${name || email}.`)
    }
  } catch {}

  return NextResponse.json({ ok:true })
}
