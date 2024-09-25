import React from 'react'
import Link from 'next/link';
import { getEventById } from '@/lib/actions/event.action';
import CardDetails from '@/components/CardDetails';

export default async function ProdManagement({params}) {
  const eventSingle = await getEventById(params.prodManagement)
  return (
    <main>
        <Link href='/admin/manageShop'>Torna alla gestione prodotti</Link>
      <p>Il prodotto da modificare ha id: {params.prodManagement}</p>
      <CardDetails 
        eventSingle={eventSingle} 
        parent={params.prodManagement? 'admin' : null}/>
    </main>
  )
}
