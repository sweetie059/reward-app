'use client';

import {
  LayoutDashboard,
  ListTodo,
  DollarSign,
  User,
  LogOut,
  Gift,
} from 'lucide-react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const router = useRouter();

  const tabs = [
    { name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { name: 'tasks', label: 'Tasks', icon: ListTodo },
    { name: 'withdraw', label: 'Withdraw', icon: DollarSign },
    { name: 'rewards', label: 'Rewards', icon: Gift },
    { name: 'profile', label: 'Profile', icon: User },
  ];

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="hidden md:flex bg-white border-b border-gray-100 px-6 py-3 items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <div className="bg-violet-600 text-white p-2 rounded-lg mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4" />
            <path d="m16.24 7.76 2.83-2.83" />
            <path d="M18 12h4" />
            <path d="m16.24 16.24 2.83 2.83" />
            <path d="M12 18v4" />
            <path d="m4.93 19.07 2.83-2.83" />
            <path d="M2 12h4" />
            <path d="m4.93 4.93 2.83 2.83" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-800">TaskEarn</h1>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1">
        {tabs.map(({ name, label, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            className={`flex flex-col items-center px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === name
                ? 'text-violet-600'
                : 'text-gray-500 hover:text-violet-500 hover:bg-violet-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-gray-500 hover:text-red-500 px-4 py-2 rounded-lg transition group"
      >
        <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
        <span className="text-sm font-medium hidden lg:inline">Logout</span>
      </button>
    </header>
  );
}