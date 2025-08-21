'use client';

import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

export default function Home() {
  const users = useQuery(api.users.api.getUsers, {
    paginationOpts: {
      numItems: 10,
      cursor: null,
    },
  });


  return (
    <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="max-w-4xl mx-auto space-y-12">
        {/* Users Section */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Users</h3>
          <div className="grid gap-2">
            {users?.page.map((user) => (
              <div key={user._id} className="bg-gray-50 rounded-lg p-3 text-gray-700">
                {user.email} {user.firstName} {user.lastName} {user.clerkId}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
