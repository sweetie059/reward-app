'use client';

import {
  LayoutDashboard,
  ListTodo,
  DollarSign,
  User,
  Gift,
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  const tabs = [
    { name: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { name: 'tasks', label: 'Tasks', icon: ListTodo },
    { name: 'withdraw', label: 'Withdraw', icon: DollarSign },
    { name: 'rewards', label: 'Rewards', icon: Gift },
    { name: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50">
      {tabs.map(({ name, label, icon: Icon }) => (
        <button
          key={name}
          onClick={() => setActiveTab(name)}
          className={`flex flex-col items-center text-xs ${
            activeTab === name ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Icon className="w-5 h-5 mb-1" />
          {label}
        </button>
      ))}
    </nav>
  );
}
