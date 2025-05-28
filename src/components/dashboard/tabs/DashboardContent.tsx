'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [balance, setBalance] = useState<number>(0);
  const [todayEarnings, setTodayEarnings] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [withdrawalThreshold] = useState<number>(5);

  // Sample tasks data
  const [tasks, setTasks] = useState([
    { id: 1, title: "Install Mobile App", reward: 500, type: "app" },
    { id: 2, title: "Complete Survey", reward: 200, type: "survey" },
    { id: 3, title: "Refer a Friend", reward: 1000, type: "referral" }
  ]);

  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setBalance(prev => prev + task.reward);
      setTodayEarnings(prev => prev + task.reward);
      setCompletedTasks(prev => prev + 1);
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
        <p className="text-gray-600">Ready to earn today?</p>
      </header>

      {/* Balance Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Available Balance</p>
            <p className="text-3xl font-bold text-purple-600">GHS {balance.toFixed(2)}</p>
          </div>
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
            onClick={() => window.location.href = '/withdraw'}
          >
            Withdraw
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-500">Today&apos;s Earnings</p>
          <p className="text-xl font-semibold">GHS {todayEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Quick Tasks */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${task.type === 'app' ? 'bg-blue-100' : 
                    task.type === 'survey' ? 'bg-green-100' : 'bg-purple-100'}`}>
                  {task.type === 'app' ? '📱' : task.type === 'survey' ? '📝' : '👥'}
                </div>
                <h3 className="ml-3 font-medium">{task.title}</h3>
              </div>
              <p className="text-gray-600 mb-3">Earn: {task.reward} coins</p>
              <button 
                onClick={() => completeTask(task.id)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
              >
                Start Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Progress Section */}
      <section className="mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Progress</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span>Withdrawal threshold</span>
              <span>GHS {balance.toFixed(2)} / {withdrawalThreshold.toFixed(2)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, (balance / withdrawalThreshold) * 100)}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span>Level Progress</span>
              <span>{completedTasks} / 3 tasks</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${(completedTasks / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          {completedTasks > 0 ? (
            <ul className="space-y-3">
              <li className="flex justify-between p-2 hover:bg-gray-50 rounded">
                <span>Completed survey</span>
                <span className="text-green-500">+200 coins</span>
              </li>
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No activity yet. Complete your first task!</p>
          )}
        </div>
      </section>
    </div>
  );
}
