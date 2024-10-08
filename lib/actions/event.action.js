'use server';

import { revalidatePath } from 'next/cache';
import { dbConnect } from '@/lib/dbConnect';
import Event from '@/lib/models/event.model';
import User from '@/lib/models/user.model';

export async function createEvent(userId, event, path) {
  await dbConnect();

  const organizer = await User.findById(userId);
  if (!organizer) throw new Error('Organizer not found');

  const newEvent = await Event.create({
    ...event,
    organizer: userId,
  });
  revalidatePath(path);

  return JSON.parse(JSON.stringify(newEvent));
}

const populateEvent = query => {
  return query
    .populate({
      path: 'organizer',
      model: User,
      select: '_id name',
    })
};

export async function updateEvent({ userId, event, path }) {
  await dbConnect();

  const eventToUpdate = await Event.findById(event._id);
  if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
    throw new Error('Unauthorized or event not found');
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    event._id,
    { ...event },
    { new: true }
  );
  revalidatePath(path);

  return JSON.parse(JSON.stringify(updatedEvent));
}

export async function deleteEvent(eventId) {
  await dbConnect();

  const deletedEvent = await Event.findByIdAndDelete(eventId);
  if (deletedEvent) revalidatePath('/admin/manageShop')
}

export async function getEventsByUser(userId) {
  await dbConnect();

  const conditions = { organizer: userId };

  const eventsQuery = Event.find(conditions).sort({ createdAt: 'desc' });

  const events = await populateEvent(eventsQuery);

  return JSON.parse(JSON.stringify(events));
}

export async function getAllEvents() {
  await dbConnect();

  // Assicurati di aspettare il risultato della query con `await`
  const events = await Event.find({}).sort({ createdAt: 'desc' });

  return JSON.parse(JSON.stringify(events));
}


export async function getRelatedEventsByCategory(
  categoryName,
  eventId,
  limit = 3,
) {
  await dbConnect();

  const conditions = {
    $and: [{ category: categoryName }, { _id: { $ne: eventId } }],
  };

  const eventsQuery = Event.find(conditions)
    .sort({ createdAt: 'desc' })
    .limit(limit);

  const events = await populateEvent(eventsQuery);

  return JSON.parse(JSON.stringify(events))
}

export async function getEventsByCategory(categoryName) {
  // Stabilire la connessione al database
  await dbConnect();

  // Definire le condizioni per la query
  const conditions = { category: categoryName };

  // Eseguire la query per ottenere tutti gli eventi della categoria specificata
  const events = await Event.find(conditions).sort({ createdAt: 'desc' });

  // Restituire i risultati come array di oggetti JSON
  return JSON.parse(JSON.stringify(events));
}

export async function getEventById(eventId) {
  try {
    await dbConnect();

    const event = await Event.findById(eventId);

    if (!event) throw new Error('Event not found');

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}


