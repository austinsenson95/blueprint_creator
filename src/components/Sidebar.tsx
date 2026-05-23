// ============================================================
// DISCOVERY ENGINE — Sidebar Navigation
// ============================================================

import { useLocation, useNavigate } from 'react-router';
import { LayoutDashboard, Map, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { User } from '@/types';

interface SidebarProps {
  user: User | null;
}

interface NavItem {
  label: string;
  icon: typeof LayoutDashboard;
  path: string;
  section: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', section: 'PROGRAM' },
  { label: 'Blueprint', icon: Map, path: '/blueprint', section: 'PROGRAM' },
  { label: 'Journey', icon: Map, path: '/journey', section: 'MY STUFF' },
  { label: 'Profile', icon: UserIcon, path: '/profile', section: 'MY STUFF' },
];

export default function Sidebar({ user }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const programItems = navItems.filter((item) => item.section === 'PROGRAM');
  const myStuffItems = navItems.filter((item) => item.section === 'MY STUFF');

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const renderNavItem = (item: NavItem) => {
    const active = isActive(item.path);
    const Icon = item.icon;

    return (
      <button
        key={item.path}
        onClick={() => handleNav(item.path)}
        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
          active
            ? 'bg-[#1F1F1F] text-white border-l-[3px] border-orange'
            : 'text-white hover:bg-[#141414] border-l-[3px] border-transparent'
        }`}
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full lg:w-[260px]'
        }`}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-white"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <img src="/logo-diamond.svg" alt="Discovery Engine" className="w-8 h-8" />
            <span className="font-serif text-white text-lg tracking-wide">
              DISCOVERY ENGINE
            </span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#9CA3AF] font-medium">
            Build your blueprint
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 overflow-y-auto">
          {/* PROGRAM section */}
          <div className="mb-2">
            <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
              PROGRAM
            </p>
            <div className="space-y-1">{programItems.map(renderNavItem)}</div>
          </div>

          {/* Divider */}
          <div className="mx-4 my-3 border-t border-[#1F1F1F]" />

          {/* MY STUFF section */}
          <div className="mb-2">
            <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9CA3AF]">
              MY STUFF
            </p>
            <div className="space-y-1">{myStuffItems.map(renderNavItem)}</div>
          </div>
        </nav>

        {/* User card at bottom */}
        <div className="px-4 py-4 border-t border-[#1F1F1F]">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
              alt={user?.name || 'User'}
              className="w-10 h-10 rounded-full border border-[#333]"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'Guest'}</p>
              <p className="text-xs text-[#9CA3AF] truncate">{user?.email || ''}</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-[#9CA3AF] hover:text-white hover:bg-[#1F1F1F] rounded-lg transition-colors w-full">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
