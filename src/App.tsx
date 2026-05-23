// ============================================================
// DISCOVERY ENGINE — App Shell with HashRouter
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BlueprintWizard from './pages/BlueprintWizard';
import { ToastContainer } from './components/ui/Toast';
import { fetchUser } from './lib/api';
import type { User, Toast } from './types';

const Journey = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <img src="/empty-journey.svg" alt="Journey" className="w-[200px] h-auto mx-auto mb-6 opacity-60" />
      <h1 className="font-serif text-3xl text-black mb-2">My Journey</h1>
      <p className="text-gray-500">Track your progress and completed blueprints</p>
    </div>
  </div>
);

const Profile = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <h1 className="font-serif text-3xl text-black mb-2">Profile</h1>
      <p className="text-gray-500">Account settings and preferences</p>
    </div>
  </div>
);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    fetchUser()
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch((err) => {
        console.error('Failed to fetch user:', err);
      });
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    (window as unknown as Record<string, unknown>).addToast = addToast;
    return () => {
      delete (window as unknown as Record<string, unknown>).addToast;
    };
  }, [addToast]);

  return (
    <HashRouter>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/blueprint" element={<BlueprintWizard user={user} onUserUpdate={setUser} />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </Layout>
    </HashRouter>
  );
}

export default App;
