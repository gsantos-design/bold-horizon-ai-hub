'use client'
import { useEffect, useState } from 'react'

type Lead = { id:string, ownerId?:string, stage?:string }

export default function Leaderboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [owners, setOwners] = useState<any[]>([])

  useEffect(()=>{
    fetch('/api/leads/list').then(r=>r.json()).then(setLeads)
    fetch('/api/hubspot/owners').then(r=>r.json()).then(d=> setOwners(d.results || []))
  }, [])

  const stats: Record<string, {name:string, total:number, meetings:number, won:number}> = {}
  for (const l of leads) {
    const id = l.ownerId || 'unassigned'
    const owner = owners.find((o:any)=>o.id===id)
    const name = owner ? (owner.firstName || owner.email || owner.id) : 'Unassigned'
    stats[id] = stats[id] || { name, total:0, meetings:0, won:0 }
    stats[id].total += 1
    if ((l.stage||'') === 'Meeting Booked') stats[id].meetings += 1
    if ((l.stage||'') === 'Closed Won') stats[id].won += 1
  }

  const rows = Object.entries(stats).map(([id, s]) => ({ id, ...s }))
    .sort((a,b)=> b.won - a.won || b.meetings - a.meetings || b.total - a.total)

  return (
    <section>
      <h1 className="text-3xl font-serif mb-4">Team Leaderboard</h1>
      <div className="card">
        <table className="w-full text-sm">
          <thead><tr><th className="text-left">Owner</th><th className="text-left">Total Leads</th><th className="text-left">Meetings</th><th className="text-left">Closed Won</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id} className="border-t">
                <td>{r.name}</td>
                <td>{r.total}</td>
                <td>{r.meetings}</td>
                <td>{r.won}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
