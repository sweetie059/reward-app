'use client';

import DashboardContent from './tabs/DashboardContent';
import TasksContent from './tabs/TasksContent';
import WithdrawContent from './tabs/WithdrawContent';
import RewardsContent from './tabs/RewardsContent';
import ProfileContent from './tabs/ProfileContent';

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  firebase_uid: string;
}

interface TabContentProps {
  activeTab: string;
  user: User;
}

export default function TabContent({ activeTab, user }: TabContentProps) {
  switch (activeTab) {
    case 'dashboard':
      return <DashboardContent />;
    case 'tasks':
      return <TasksContent />;
    case 'withdraw':
      return <WithdrawContent user={user} />;
    case 'rewards':
      return <RewardsContent />;
    case 'profile':
      return <ProfileContent />;
    default:
      return null;
  }
}
