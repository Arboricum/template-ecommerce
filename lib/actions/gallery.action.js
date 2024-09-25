'use server';

import { dbConnect } from '@/lib/dbConnect';
import GalleryImages from '../models/galleryImages.model';
/* import bcrypt from 'bcrypt'; */
import { revalidatePath } from 'next/cache';

export async function getAllGalleryImages() {
  await dbConnect();

  const galleryImages = await GalleryImages.find({});

  console.log('Dati recuperati:', galleryImages); // Aggiungi questo log per controllare i dati
  if (!galleryImages) throw new Error('Images Not Found');

  // Verifica che ci sia almeno un elemento
  if (galleryImages.length > 0) {
      return JSON.parse(JSON.stringify(galleryImages[0]));
  }

  return null; // Restituisci null se non ci sono immagini
}

export async function updateGalleryImages({ newGalleryImages, path }) {
  await dbConnect();
  console.log(newGalleryImages._id, 'id');  // Aggiungi il log per verificare che _id sia passato correttamente

  const updatedGalleryImages = await GalleryImages.findByIdAndUpdate(
    newGalleryImages._id,  // Usa '_id' anziché 'id'
    { ...newGalleryImages },
    { new: true }
  );
  revalidatePath(path);

  return JSON.parse(JSON.stringify(updatedGalleryImages));
}

