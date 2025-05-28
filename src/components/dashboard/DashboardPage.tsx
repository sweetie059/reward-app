'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/dashboard/Header';
import BottomNav from '@/components/dashboard/BottomNav';
import TabContent from '@/components/dashboard/TabContent';
import { User } from '@/types/User';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        if (!res.ok) throw new Error('Failed to fetch user');

        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div className="p-4">Loading user...</div>;
  if (!user) return <div className="p-4 text-red-600">User not found</div>;

  return (
    <div className="h-screen flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 overflow-auto bg-gray-50 text-gray-800">
        <TabContent activeTab={activeTab} user={user} />
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
