"use client";

import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  category: 'survey' | 'app' | 'video' | 'signup';
  estimatedTime: string;
  completed?: boolean;
}

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'surveys' | 'apps' | 'videos'>('all');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Consumer Preferences Survey",
      description: "Share your opinions about shopping habits (5-7 minutes)",
      reward: 250,
      category: 'survey',
      estimatedTime: "5-7 min",
    },
    {
      id: 2,
      title: "Install Finance App",
      description: "Download and open the app once to earn coins",
      reward: 500,
      category: 'app',
      estimatedTime: "2 min",
    },
    {
      id: 3,
      title: "Watch Product Video",
      description: "View a 30-second video about our new product",
      reward: 100,
      category: 'video',
      estimatedTime: "1 min",
    },
    {
      id: 4,
      title: "Sign Up for Newsletter",
      description: "Subscribe to our weekly deals newsletter",
      reward: 150,
      category: 'signup',
      estimatedTime: "2 min",
    },
    {
      id: 5,
      title: "Mobile Gaming Survey",
      description: "Tell us about your mobile gaming preferences",
      reward: 300,
      category: 'survey',
      estimatedTime: "8-10 min",
    },
  ]);

  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'all') return true;
    if (activeTab === 'surveys') return task.category === 'survey';
    if (activeTab === 'apps') return task.category === 'app';
    if (activeTab === 'videos') return task.category === 'video';
    return true;
  });

  const completeTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    // In a real app, you would call your API here
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'survey': return 'bg-blue-100 text-blue-600';
      case 'app': return 'bg-green-100 text-green-600';
      case 'video': return 'bg-amber-100 text-amber-600';
      case 'signup': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'survey': return '📝';
      case 'app': return '📱';
      case 'video': return '🎬';
      case 'signup': return '✉️';
      default: return '✅';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Available Tasks</h1>
        <p className="text-gray-600">Complete tasks to earn coins and rewards</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto mb-6 scrollbar-hide">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'all' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-gray-500'}`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setActiveTab('surveys')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'surveys' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-gray-500'}`}
        >
          Surveys
        </button>
        <button
          onClick={() => setActiveTab('apps')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'apps' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-gray-500'}`}
        >
          App Installs
        </button>
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-4 py-2 font-medium text-sm whitespace-nowrap ${activeTab === 'videos' ? 'text-violet-600 border-b-2 border-violet-600' : 'text-gray-500'}`}
        >
          Videos
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div 
              key={task.id} 
              className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${task.completed ? 'opacity-75' : ''}`}
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-sm px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                        {getCategoryIcon(task.category)} {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{task.estimatedTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xl font-bold text-violet-600">{task.reward} coins</div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  {task.completed ? (
                    <button 
                      disabled
                      className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                    >
                      Completed
                    </button>
                  ) : (
                    <button
                      onClick={() => completeTask(task.id)}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition"
                    >
                      Start Task
                    </button>
                  )}
                </div>
              </div>
              
              {!task.completed && (
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Pays instantly upon verification
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No tasks available</h3>
            <p className="text-gray-500">Check back later for new tasks or try a different category</p>
          </div>
        )}
      </div>

      {/* Daily Bonus Promo */}
      <div className="mt-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">Daily Bonus Available!</h3>
            <p className="opacity-90">Complete 3 tasks today to earn 200 bonus coins</p>
          </div>
          <button className="bg-white text-violet-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition">
            Claim Bonus
          </button>
        </div>
      </div>
    </div>
  );
}