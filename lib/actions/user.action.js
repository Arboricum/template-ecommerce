'use server';

import { dbConnect } from '@/lib/dbConnect';
import User from '@/lib/models/user.model';
/* import bcrypt from 'bcrypt'; */
import { revalidatePath } from 'next/cache';

export async function getUserByEmail(userEmail) {
  await dbConnect();

  const user = await User.findOne({ email: userEmail });

  if (!user) throw new Error('User Not Found');
  return JSON.parse(JSON.stringify(user));
}
