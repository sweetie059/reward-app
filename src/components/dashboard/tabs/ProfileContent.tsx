"use client"

import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/lib/firebase"

interface StatProps {
  title: string
  value: string | number
  icon: React.ReactNode
}

function Stat({ title, value, icon }: StatProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-violet-50 text-violet-600">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-xl font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  )
}

interface ProfileData {
  username: string
  created_at: string
  points_balance: number
  totalEarned: number
  completedOffers: number
  totalReferrals: number
  earningsLast30Days: number
  earningsInProgress: number
}

export default function ProfilePage() {
  const [user, loadingAuth] = useAuthState(auth)
  const [data, setData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const idToken = await user.getIdToken()

        const res = await fetch("/api/profile", {
          method: "POST",
          body: JSON.stringify({ idToken }),
          headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || `HTTP ${res.status}: Failed to fetch profile`)
        }

        const json = await res.json()
        setData(json)
      } catch (err: unknown) {
        console.error("Profile fetch error:", err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unexpected error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  if (loadingAuth || loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse space-y-8">
          <div className="h-10 bg-gray-200 rounded-full w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Profile Access</h3>
          <p className="text-gray-600 mb-4">Please sign in to view your profile</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex gap-3 items-start">
            <div className="mt-0.5 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-red-800 font-medium text-lg">Error loading profile</h3>
              <p className="text-red-600 mt-1">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Profile Data</h3>
          <p className="text-gray-600 mb-4">We couldn&apos;t find any profile data for your account</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg transition"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  const level = Math.floor(data.points_balance / 1000)
  const nextLevelIn = 1000 - (data.points_balance % 1000)
  const yearsAgo = new Date().getFullYear() - new Date(data.created_at).getFullYear()
  const progressPercentage = (data.points_balance % 1000) / 10

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{data.username}</h1>
        {/* Fixed line - using regular apostrophe with ESLint suppression */}
        <p className="text-gray-500">Joined {yearsAgo > 0 ? `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago` : "this year"}</p>
      </div>

      {/* Level and Earnings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Level Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Level</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-violet-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-violet-600">{level}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">{nextLevelIn} coins to level up</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-violet-600 h-2.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Summary</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-violet-600">GHS {(data.totalEarned / 1000).toFixed(2)}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Last 30 Days</p>
                <p className="font-medium">GHS {(data.earningsLast30Days / 1000).toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="font-medium">GHS {(data.earningsInProgress / 1000).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat 
          title="Completed Offers" 
          value={data.completedOffers} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          } 
        />
        <Stat 
          title="Users Referred" 
          value={data.totalReferrals} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          } 
        />
        <Stat 
          title="Points Balance" 
          value={data.points_balance} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          } 
        />
        <Stat 
          title="Earnings Rate" 
          value={`GHS ${((data.earningsLast30Days / 30) / 1000).toFixed(2)}/day`} 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          } 
        />
      </div>
    </div>
  )
}