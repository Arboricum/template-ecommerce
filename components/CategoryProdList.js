"use client"

import React from 'react'
import { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader"; // Assicurati di aver installato react-spinners
import Card from "@/components/Card";
import { getEventsByCategory } from "@/lib/actions/event.action";
import '../app/shop/Shop.css'

export default function CategoryProdList({category}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funzione per ottenere gli eventi dalla categoria
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await getEventsByCategory(category);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  // Mostra uno spinner se sta caricando
  if (loading) {
    return <ClipLoader color="#36d7b7" />; // Mostra uno spinner durante il caricamento
  }
  return (
    <section className="shop-prod-container">
      {events.length !== 0 ? (
        events.map((event) => (
          event.forSell && event.quantity > 0 && (
            <Card key={event._id} event={event} parent="category" />
          )
        ))
      ) : (
        <p>Non ci sono prodotti in questa categoria</p>
      )}
    </section>
  )
}
