// ============================================================
// DISCOVERY ENGINE — Top Navigation Bar
// ============================================================

import { useLocation } from 'react-router';

import { Bell, Globe, ChevronDown, Coins } from 'lucide-react';
import type { User } from '@/types';

interface NavbarProps {
  user: User | null;
}

const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/dashboard': 'Dashboard',
  '/blueprint': 'Blueprint Wizard',
  '/journey': 'My Journey',
  '/profile': 'Profile',
};

export default function Navbar({ user }: NavbarProps) {
  const location = useLocation();
  const pageTitle = routeTitles[location.pathname] || 'Dashboard';

  const creditColor =
    (user?.credits ?? 100) <= 0
      ? 'bg-red-light text-red'
      : (user?.credits ?? 100) < 20
        ? 'bg-orange-light text-amber'
        : 'bg-green-light text-green';

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 fixed top-0 right-0 left-0 lg:left-[260px] z-40">
      {/* Left: Page title */}
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-black">{pageTitle}</h1>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Credit badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${creditColor}`}>
          <Coins size={14} />
          <span className="text-sm font-semibold">{user?.credits ?? 100} credits</span>
        </div>

        {/* Language selector */}
        <button className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors">
          <Globe size={16} />
          <span>EN</span>
          <ChevronDown size={14} />
        </button>

        {/* Notification bell */}
        <button className="relative p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange rounded-full" />
        </button>

        {/* User avatar dropdown */}
        <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1 pr-2 transition-colors">
          <img
            src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
            alt={user?.name || 'User'}
            className="w-8 h-8 rounded-full border border-gray-200"
          />
          <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>
    </header>
  );
}
