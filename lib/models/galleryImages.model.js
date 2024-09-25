import { Schema, model, models } from "mongoose";

const GalleryImagesSchema = new Schema({
  galleryImages: { type: [String], required: true },
}, { collection: 'galleryImages' }); // Specifica il nome della collezione qui

const GalleryImages = models.GalleryImages || model('GalleryImages', GalleryImagesSchema);

export default GalleryImages;