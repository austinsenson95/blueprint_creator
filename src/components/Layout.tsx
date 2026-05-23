// ============================================================
// DISCOVERY ENGINE — App Shell Layout (Sidebar + TopNav + Content)
// ============================================================

import type { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import type { User } from '@/types';

interface LayoutProps {
  children: ReactNode;
  user: User | null;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Sidebar */}
      <Sidebar user={user} />

      {/* Main content area */}
      <div className="lg:ml-[260px] pt-16">
        {/* Top navigation */}
        <Navbar user={user} />

        {/* Page content */}
        <main className="relative">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.04,
            }}
          />
          <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
