"use client"

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function HeaderAdmin() {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    return (
      <div className='header-admin'>
        <Link href='/admin'>Admin</Link>
        <Link href='' onClick={signOut}>Sign Out</Link>
      </div>
    )
  }
}
