"use client"

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { useStateContext } from "../../context/StateContext";
//import { urlFor } from "../../lib/client";
import getStripe from "../../lib/getStripe";
import toast from "react-hot-toast";
//import { eUSLocale } from "../../lib/utils";
import EmptyCart from "@/components/EmptyCart";
import './cart.css'
//per usare lo stesso sfondo di shop
import '../shop/Shop.css'

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const router = useRouter()

  const handleCheckout = async () => {
    const stripe = await getStripe();

    stripe? console.log('stripe') : console.log('no stripe')
  
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });
  
    if (!response.ok) {
      console.error('Failed to create Stripe checkout session:', await response.text());
      return;
    }
  
    const data = await response.json();
  
    if (!data.id) {
      console.error('Session ID not returned by the server:', data);
      return;
    }
  
    toast.loading("Redirecting...");
  
    stripe.redirectToCheckout({ sessionId: data.id });
  };
  

  return (
    <>
    <div className={'shop-bkg'}></div>
    <main className="cart-wrapper" ref={cartRef}>
      <h1 className='main-h1'>Carrello</h1>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => router.push('/shop')}
        >
          <AiOutlineLeft />
          <span className="heading">Sono presenti</span>
          <span className="cart-num-items">({totalQuantities} oggetti)</span>
        </button>

        {cartItems.length < 1 && (
          <EmptyCart>
            <Link href="/shop">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continua con gli acquisti
              </button>
            </Link>
          </EmptyCart>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => onRemove(item)}
                >
                  <TiDeleteOutline />
                </button>
                <Image
                  src={item.imageUrl}
                  className="cart-product-image"
                  style={{ display: 'block', height: 'auto' }}
                  width={200}
                  height={0}
                  alt={item.title}
                />
                <div className="item-desc">
                  <div>
                    <h3 className="cart-item-title">{item.title}</h3>
                    <span>
                      Quantità: {item.cartQuantity} {/* @ ${eUSLocale(item.price)} */}
                    </span>
                  </div>
                  <p className="quantity-desc">
                    <span
                      className="minus"
                      onClick={() => toggleCartItemQuantity(item._id, "dec")}
                    >
                      <AiOutlineMinus />
                    </span>
                    <span
                      className="plus"
                      onClick={() => toggleCartItemQuantity(item._id, "inc")}
                    >
                      <AiOutlinePlus />
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h4>Subtotale:</h4>
              <span>{/* ${eUSLocale(totalPrice)} */}{totalPrice}&nbsp;€</span>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Paga con Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
    </>
  );
};

export default Cart;
