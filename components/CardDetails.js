"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { adminContext } from "@/context/adminContext";
import { useContext } from "react";
import { useStateContext } from '@/context/StateContext';
import { useRouter } from 'next/navigation';
import './Cards.css';

//l'event è il prodotto, isAdminLogged viene settato in manageShop
export default function CardDetails({ eventSingle, parent }) {
  const { isAdminLogged, setIsAdminLogged } = useContext(adminContext);
  const [cartAddingError, setCartAddingError] = useState(false);
  const [thisProdInCartQty, setThisProdInCartQty] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (parent === 'category') {
      setIsAdminLogged(false);
    } else {
      setIsAdminLogged(true);
    }
  }, [parent]);

  const { title, description, imageUrl, category, dimensions, price, quantity } = eventSingle;
  const { decQty, incQty, qty, onAdd, totalQuantities, cartItems } = useStateContext();

  // Aggiorna la quantità del prodotto nel carrello
  useEffect(() => {
    const productInCart = cartItems.find((item) => item._id === eventSingle._id);
    const productQuantity = productInCart ? productInCart.cartQuantity : 0;

    setThisProdInCartQty(productQuantity); // Imposta la quantità nel carrello
  }, [cartItems, eventSingle._id]);

  // Controlla se la quantità che l'utente vuole aggiungere supera la disponibilità
  useEffect(() => {
    if (thisProdInCartQty + qty > quantity) {
      setCartAddingError(true);
    } else {
      setCartAddingError(false);
    }
  }, [thisProdInCartQty, qty, quantity]);

  // Aggiungi al carrello
  const handleAddToCart = () => {
    if (!cartAddingError) {
      onAdd(eventSingle, qty);
    }
  };

  // Compra subito e vai al carrello
  const handleBuyNow = () => {
    if (!cartAddingError) {
      onAdd(eventSingle, qty);
      router.push('/cart');
    }
  };

  return (
    <>
    <section className='card-det'>
      <aside>
        <Image
          src={imageUrl}
          alt='Event Image'
          style={{ display: 'block', height: 'auto' }}
          width={300}
          height={200}
          className='card-img'
        />
      </aside>
      <article className='card-det-article'>
        <h1 className='card-title'>{title}</h1>
        <hr />
        <p className='card-price'>{price}&nbsp;€</p>
        {quantity > 10 ? 
          <p className='card-available'>Disponibile</p> 
          : 
          <p className='card-available'>Solo {quantity} disponibili</p>
        }
        <hr />
        <h2>Descrizione</h2>
        <p className='card-long-desc'>{description}</p>
        <br />
        {dimensions && <p>Dimensioni:&nbsp;{dimensions}</p>}
        <hr />
        {/* Manteniamo quantity come la disponibilità del prodotto */}
        
        {/* Quantità che l'utente sta aggiungendo al carrello */}
        <div className="quantity">
          {/* <h3>Quantità da aggiungere al carrello:</h3> */}
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}>
              <AiOutlineMinus />
            </span>
            <span className="num">&nbsp;{qty}&nbsp;</span>
            <span className="plus" onClick={incQty}>
              <AiOutlinePlus />
            </span>
          </p>
        </div>

        <div className="buttons">
          <button
            className="button btn-cart"
            type="button"
            onClick={handleAddToCart}
            disabled={cartAddingError}  // Disabilita il pulsante se c'è un errore
          >
            <span>Aggiungi al carrello</span>
          </button>
          {cartAddingError && (
            <p>Non puoi aggiungere ancora questo articolo, disponibilità superata</p>
          )}

          <button type="button" className="buy-now" onClick={handleBuyNow} disabled={cartAddingError}>
            Compra ora
          </button>
        </div>

        {isAdminLogged && (
          <>
            <p>Modifica</p>
            <p>Cancella</p>
          </>
        )}
      </article>
    </section>

    {/* ------------------------------------------------------------------- */}

    <section className='card-det-mobile'>
      <aside style={{maxWidth: '300px' }}>
        <Image
          src={imageUrl}
          alt='Event Image'
          width={300}
          height={200}
          style={{ display: 'block', height: 'auto', maxWidth: '100%' }}
          className='card-img'
        />
      </aside>
      <article className='card-det-article'>
        <h1 className='card-title'>{title}</h1>
        <hr />
        <p className='card-price'>{price}&nbsp;€</p>
        {quantity > 10 ? 
          <p className='card-available'>Disponibile</p> 
          : 
          <p className='card-available'>Solo {quantity} disponibili</p>
        }
        <hr />
        {/* Manteniamo quantity come la disponibilità del prodotto */}
        
        {/* Quantità che l'utente sta aggiungendo al carrello */}
        <div className="quantity">
          {/* <h3>Quantità da aggiungere al carrello:</h3> */}
          <p className="quantity-desc">
            <span className="minus" onClick={decQty}>
              <AiOutlineMinus />
            </span>
            <span className="num">&nbsp;{qty}&nbsp;</span>
            <span className="plus" onClick={incQty}>
              <AiOutlinePlus />
            </span>
          </p>
        </div>

        <div className="buttons">
          <button
            className="button btn-cart"
            type="button"
            onClick={handleAddToCart}
            disabled={cartAddingError}  // Disabilita il pulsante se c'è un errore
          >
            <span>Aggiungi al carrello</span>
          </button>
          {cartAddingError && (
            <p>Non puoi aggiungere ancora questo articolo, disponibilità superata</p>
          )}

          <button type="button" className="buy-now" onClick={handleBuyNow} disabled={cartAddingError}>
            Compra ora
          </button>
        </div>

        {isAdminLogged && (
          <>
            <p>Modifica</p>
            <p>Cancella</p>
          </>
        )}
      </article>
      <article className='mobile-long-desc'>
        <h2>Descrizione</h2>
        <p className='card-long-desc'>{description}</p>
        <br />
        {dimensions && <p>Dimensioni:&nbsp;{dimensions}</p>}
        <hr />
      </article>
    </section>
    </>
  );
}
