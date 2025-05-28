import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import type { Users, TaskCompletions, Referrals, Transactions } from "@prisma/client"
import { auth } from "@/lib/firebase-admin"

type FullUser = Users & {
  TaskCompletions: TaskCompletions[]
  ReferralsAsReferrer: Referrals[]
  Transactions: Transactions[]
}

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json()

    if (!idToken) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    // Verify Firebase ID token
    const decodedToken = await auth.verifyIdToken(idToken)
    const email = decodedToken.email
    const firebaseUid = decodedToken.uid

    if (!email) {
      return NextResponse.json({ error: "User email not found" }, { status: 400 })
    }

    // First try to find user by email or firebase_uid
    let user = (await prisma.users.findFirst({
      where: {
        OR: [
          { email },
          { firebase_uid: firebaseUid }
        ],
      },
      include: {
        TaskCompletions: true,
        ReferralsAsReferrer: true,
        Transactions: true,
      },
    })) as FullUser | null

    // If user not found, create new user with unique username
    if (!user) {
      console.log(`Creating new user for email: ${email}, uid: ${firebaseUid}`)

      // Generate base username from name or email
      const baseUsername = (decodedToken.name || email.split("@")[0])
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "") // Remove special characters
        .substring(0, 20); // Limit length

      if (!baseUsername) {
        return NextResponse.json({ error: "Could not generate username" }, { status: 400 })
      }

      let username = baseUsername
      let counter = 1
      let usernameExists = true
      const maxAttempts = 10 // Prevent infinite loops

      // Check for existing username and find an available one
      while (usernameExists && counter <= maxAttempts) {
        const existingUser = await prisma.users.findUnique({
          where: { username },
          select: { id: true }
        })

        if (!existingUser) {
          usernameExists = false
          break
        }

        // Try different variations
        if (counter === 1) {
          username = `${baseUsername}${Math.floor(Math.random() * 1000)}`
        } else {
          username = `${baseUsername}${counter}`
        }
        counter++
      }

      if (usernameExists) {
        return NextResponse.json(
          { error: "Could not generate a unique username after multiple attempts" },
          { status: 400 }
        )
      }

      // Create the new user
      try {
        user = (await prisma.users.create({
          data: {
            email,
            firebase_uid: firebaseUid,
            username,
            points_balance: 0,
            created_at: new Date(),
          },
          include: {
            TaskCompletions: true,
            ReferralsAsReferrer: true,
            Transactions: true,
          },
        })) as FullUser
      } catch (createError) {
        console.error("User creation failed:", createError)
        return NextResponse.json(
          { error: "Failed to create user profile" },
          { status: 500 }
        )
      }
    }

    // Calculate statistics
    const toNumber = (val: number | bigint | null | undefined) => Number(val ?? 0)

    const earningsInProgress = user.Transactions
      .filter((t) => t.type === "pending")
      .reduce((sum, t) => sum + toNumber(t.points), 0)

    const earningsLast30Days = user.Transactions
      .filter((t) => {
        const date = new Date(t.created_at)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return t.type === "credit" && date > thirtyDaysAgo
      })
      .reduce((sum, t) => sum + toNumber(t.points), 0)

    const totalEarned = user.Transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + toNumber(t.points), 0)

    return NextResponse.json({
      username: user.username,
      created_at: user.created_at,
      points_balance: toNumber(user.points_balance),
      totalEarned,
      completedOffers: user.TaskCompletions.length,
      totalReferrals: user.ReferralsAsReferrer.length,
      earningsLast30Days,
      earningsInProgress,
    })

  } catch (error) {
    console.error("Profile API error:", error)
    const message = error instanceof Error ? error.message : "Internal server error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}