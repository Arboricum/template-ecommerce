"use client";
import React, { useState, useEffect } from "react";
import { useLoadingContentContext } from "@/context/loadingContext";
import { getEventsByCategory, getAllEvents } from "@/lib/actions/event.action";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "@/components/Card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../admin.css";

export default function ManageShop() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDeleted, setIsDeleted} = useLoadingContentContext();
  const [filterCategory, setFilterCategory] = useState("all"); // "all" per rappresentare tutte le categorie
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (filterCategory === "all") {
          const data = await getAllEvents(); // Carica tutti gli eventi se nessuna categoria è selezionata
          setEvents(data);
        } else {
          const data = await getEventsByCategory(filterCategory); // Carica solo gli eventi filtrati per categoria
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filterCategory]);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
          const data = await getAllEvents();
          setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
        setIsDeleted(false);
      }
    }
    if (isDeleted) {
      fetchEvents();
    }
  }, [isDeleted])

  // Mostra uno spinner se sta caricando
  if (loading) {
    return <ClipLoader color="#36d7b7" />;
  }

  return (
    <main>
      <p>
        <Link href="/admin" className="admin-back-link">Torna alla pagina Admin</Link>
      </p>
      <select
        onChange={(e) => setFilterCategory(e.target.value)}
        value={filterCategory}
      >
        <option value="all">Tutte le categorie</option>
        <option value='Orecchini'>Orecchini</option>
        <option value='Collane'>Collane</option>
        <option value='Bracciali'>Bracciali</option>
        <option value='Anelli'>Anelli</option>
      </select>
      <button onClick={() => router.push("/admin/manageShop/addNewProd")}>
        Aggiungi un prodotto
      </button>
      <section className="admin-prod-container">
        {events.length !== 0 ? (
          events.map((event) => (
            <Card key={event._id} event={event} parent="admin" />
          ))
        ) : (
          <p>Non ci sono prodotti da mostrare</p>
        )}
      </section>
    </main>
  );
}
