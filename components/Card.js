"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { adminContext } from "@/context/adminContext";
import { useLoadingContentContext } from "@/context/loadingContext";
import { useContext, useEffect } from "react";
import { deleteEvent } from '@/lib/actions/event.action';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import './Cards.css';


//l'event è il prodotto, isAdminLogged viene settato in manageShop
/* 
title, description, shortDescription, imageUrl, imageUrls(array), category, dimensions, price, forSell, quantity
*/

export default function Card({ event, parent}) {
  const {isAdminLogged, setIsAdminLogged} = useContext(adminContext)
  useEffect(() => {
    if (parent === 'category') {
      setIsAdminLogged(false)
    } else {
      setIsAdminLogged(true)
    }
  }, [parent])
    const {_id, title, imageUrl, category, shortDescription, price, forSell, quantity} = event;
  return (
    <section className="card">
    {!isAdminLogged && forSell && quantity > 0 && (
      <CardLink
        href={`/shop/${category}/${_id}`}
        text="Dettagli"
        imageUrl={imageUrl}
        title={title}
        shortDescription={shortDescription}
        price={price}
        isAdminLogged={isAdminLogged}
      />
    )}
    {isAdminLogged && (
      <CardLink
        _id={_id}
        category={category}
        href={`/admin/manageShop/${_id}`}
        text="Modifica"
        secondText="Elimina"
        imageUrl={imageUrl}
        title={title}
        shortDescription={shortDescription}
        price={price}
        isAdminLogged={isAdminLogged}
      />
    )}
  </section>
  )
}

function CardLink({ _id, category, href, text, secondText, imageUrl, title, shortDescription, price, isAdminLogged }) {
  //const router = useRouter()
  const { setIsDeleted} = useLoadingContentContext();
  const manageDelete = async () => {
    const confirmDelete = window.confirm('Sei sicuro di voler eliminare questo prodotto?');
    console.log('Conferma eliminazione:', confirmDelete);
  
    if (confirmDelete) {
      try {
        console.log('Inizio eliminazione prodotto...');
        // Esegui l'azione di eliminazione
        await deleteEvent(_id, '/');
        console.log('Eliminazione completata. Provo a mostrare toast.');
        toast.success('Prodotto eliminato');
        console.log('Toast mostrato. Provo a ricaricare la pagina.');
        setIsDeleted(true);
        console.log('Refresh tentato.');
      } catch (error) {
        console.error('Errore durante l\'eliminazione del prodotto:', error);
        toast.error('Errore durante l\'eliminazione del prodotto');
      }
    }
  };
  

  return (
    <>
      {isAdminLogged && <span className='card-category'>{category}</span>}
      <Link href={href} className="card-link">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={0}
          style={{ display: 'block', height: 'auto', maxWidth: '100%' }}
          className="card-img"
        />
      </Link>
      <h1 className="card-title">{title}</h1>
      <p className="card-short-desc">{shortDescription}</p>
      <p className="card-price">{price}&nbsp;€</p>
      <Link href={href} className="card-text">
        <p>{text}&gt;&gt;</p>
      </Link>
      {isAdminLogged && (
        <button className="" onClick={manageDelete}>
          <p>{secondText}</p>
        </button>
      )}
    </>
  );
}


