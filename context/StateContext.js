"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

// Crea il contesto per il carrello
export const CartContext = createContext();

// Componente Provider per lo stato del carrello
export const CartStateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1); // Quantità che l'utente sta aggiungendo al carrello

  // Recupera lo stato del carrello da localStorage quando il componente viene montato
  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    const savedTotalPrice = localStorage.getItem("totalPrice");
    const savedTotalQuantities = localStorage.getItem("totalQuantities");

    if (savedCartItems && savedTotalPrice && savedTotalQuantities) {
      // Se i dati sono presenti, ripristinali
      setCartItems(JSON.parse(savedCartItems));
      setTotalPrice(parseFloat(savedTotalPrice));
      setTotalQuantities(parseInt(savedTotalQuantities));
    } else {
      // Se non ci sono dati, logga un messaggio di debug
      console.log("Nessun dato nel localStorage");
    }
  }, []);

  // Salva lo stato del carrello in localStorage ogni volta che cambia
  useEffect(() => {   
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", totalPrice.toString());
      localStorage.setItem("totalQuantities", totalQuantities.toString());
    }
  }, [cartItems, totalPrice, totalQuantities]);

  // Funzione per aggiungere un prodotto al carrello
  const onAdd = (product, quantityTemp) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantityTemp);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantityTemp);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            cartQuantity: cartProduct.cartQuantity + quantityTemp, // Usa cartQuantity per tracciare la quantità nel carrello
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, cartQuantity: quantityTemp }]);
    }

    toast.success(`${quantityTemp} ${product.title} added to the cart.`);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - Number(foundProduct.price) * Number(foundProduct.cartQuantity));
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - Number(foundProduct.cartQuantity));
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, cartQuantity: Number(foundProduct.cartQuantity) + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + Number(foundProduct.price));
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.cartQuantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, cartQuantity: Number(foundProduct.cartQuantity) - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - Number(foundProduct.price));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook per utilizzare il contesto del carrello
export const useStateContext = () => useContext(CartContext);
