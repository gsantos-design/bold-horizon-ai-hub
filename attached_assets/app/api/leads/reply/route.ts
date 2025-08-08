import { NextResponse } from 'next/server'
import { getDb } from '../../../../lib/firestore'
import { findContactByEmail, listDealsForContact, updateDealStage, createNoteOnContact } from '../../../../lib/hubspot'

export async function POST(req: Request) {
  const body = await req.json().catch(()=>({}))
  const email = (body.email || '').toString().trim()
  if (!email) return NextResponse.json({ ok:false, error:'Missing email' }, { status:400 })

  const db = getDb()
  if (db) {
    const snap = await db.collection('leads').where('email','==', email).limit(5).get()
    for (const doc of snap.docs) await doc.ref.update({ stage: 'Contacted' })
  }

  try {
    const contact = await findContactByEmail(email)
    if (contact) {
      const deals = await listDealsForContact(contact.id)
      const pipeline = process.env.HUBSPOT_PIPELINE || 'default'
      const dealstage = process.env.HUBSPOT_DEALSTAGE_CONTACTED || undefined
      if (dealstage) for (const d of deals) await updateDealStage(d.id, pipeline, dealstage)
      await createNoteOnContact(contact.id, `Email reply detected for ${email}.`)
    }
  } catch {}

  return NextResponse.json({ ok:true })
}
