'use client';

import { SignOutButton, useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
        {user ? (
          <div>
            <p className='mb-2'>Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!</p>
            <p className='text-sm text-gray-600'>User ID: {user.id}</p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}

        <SignOutButton />
      </div>
    </div>
  );
}
