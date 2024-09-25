
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { getUserByEmail } from '@/lib/actions/user.action';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email.toLowerCase();
        const password = credentials?.password;

        const user = await getUserByEmail(email);
        if (!user) {
          console.error('User not not found');
          console.log('nope')
          return null;
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          console.error('Invalid password');
          return null;
        }

        return {
          ...user,
          image: user.imageUrl,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, trigger, session }) {
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.picture = session.image;
      }
      return token;
    },
  },
};
