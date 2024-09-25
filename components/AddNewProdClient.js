"use client";

import React from 'react';
import { useLoadingContentContext } from '@/context/loadingContext';
import EventForm from '@/components/EventForm';
import Loading from '@/components/Loading';
import Link from 'next/link';

export default function AddNewProdClient({ userId }) {
  const { loadingContent } = useLoadingContentContext();

  return (
    <>
      <Link href='/admin/manageShop'>Torna alla gestione prodotti</Link>
      <h2 className='anp-h2'>Crea un nuovo prodotto</h2>
      {loadingContent && <Loading />}
      <EventForm userId={userId} type={'Create'} />
    </>
  );
}