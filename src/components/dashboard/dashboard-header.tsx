'use client';

import { useSession } from 'next-auth/react';
import { Search } from 'lucide-react';

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search Section */}
        <div className="relative flex-1 max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search..."
          />
        </div>

        {/* User Info Section */}
        <div className="flex items-center">
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {session?.user?.email}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-900">
                Hello, <span className="font-bold">{session?.user?.username || 'User'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
