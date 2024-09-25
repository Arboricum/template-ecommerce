"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import './admin.css'

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Se l'utente non è autenticato, reindirizzalo alla pagina di login
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/admin');
    }
  }, [status, router]);

  if (status === 'loading') {
    // Mostra un loader mentre si verifica la sessione
    return <p>Caricamento...</p>;
  }

  // Se l'utente è autenticato, mostra la pagina di gestione
  if (status === 'authenticated') {
    return (
      <main className='admin-main'>
        <h1>Pagina di gestione</h1>
        <h2>Cosa vuoi fare?</h2>
        <div className='admin-menu'>
          <Link href='/admin/changeBkg'>-Cambiare sfondo della homepage-</Link>
          <hr />
          <Link href='/admin/manageShop'>-Gestire i prodotti del negozio-</Link>
          <hr />
        </div>
      </main>
    );
  }

  return null; // Questo ritorno previene errori durante il caricamento
}
