import React from 'react'
import { getServerSession } from 'next-auth';
import { getUserByEmail } from '@/lib/actions/user.action';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';
import AddNewProdClient from '@/components/AddNewProdClient';

// Funzione server-side per ottenere i dati dell'utente
export default async function AddNewProd() {
  let userId = '';
  
  // Ottieni la sessione utente dal server
  const data = await getServerSession(authConfig);
  if (data?.user) {
    const user = await getUserByEmail(data.user?.email);
    userId = user?._id || '';
  }

  return (
    <main>
      <AddNewProdClient userId={userId} />
    </main>
  );
}