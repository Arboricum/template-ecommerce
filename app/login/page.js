import LoginForm from '@/components/LoginForm';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/authConfig';
import { redirect } from 'next/navigation';

export default async function Login({ searchParams }) {
  const data = await getServerSession(authConfig);
  if (data !== null) {
    redirect('/admin');
  }
  return (
    <div className=''>
      <div className=''>
        <h1 className=''>Log In</h1>
        <p>Inserisci le tue credenziali!</p>
      </div>
      <LoginForm callbackUrl={searchParams?.callbackUrl} />
    </div>
  );
}