import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageUrls: { type: [String], required: false },
  category: { type: String, required: true },
  dimensions: { type: String, required: false },
  price: { type: String, required: true },
  forSell: { type: Boolean, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Event = models.Event || model('Event', EventSchema);

export default Event;

/* 
title, description, shortDescription, location, imageUrl, imageUrls(array), category, dimensions, description, price, forSell, quantity
*/

/* 
nome
categoria
immagine
immagini
dimensioni
descrizione
prezzo
disponibilità (forSell)
quantità (se sopra 10 mostra "disponibile", altrimenti quantità)


pulsante aggiungi al carrello
*/