"use client"

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { CartContext } from "@/context/StateContext";
//import { runFireworks } from "../../lib/utils";

const SuccessContent = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useContext(CartContext);

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    //runFireworks();
  }, []);
  

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Grazie per il tuo ordine!</h2>
        <p className="email-msg">Controlla la tua email per la ricevuta</p>
        <p className="description">
          Per qualunque domanda, scrivimi su
          <a className="email" href="mailto:werkstattValente@gmail.com">
          &nbsp;test@test.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continua con gli acquisti
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessContent;