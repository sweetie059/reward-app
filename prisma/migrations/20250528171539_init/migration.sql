-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "email" VARCHAR(255),
    "password_hash" VARCHAR(255),
    "referral_code" VARCHAR(50),
    "referred_by" INTEGER,
    "mobile_money_number" VARCHAR(20),
    "points_balance" BIGINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskCompletions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "offer_id" VARCHAR(100),
    "points_earned" BIGINT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskCompletions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referrals" (
    "id" SERIAL NOT NULL,
    "referrer_id" INTEGER NOT NULL,
    "referred_id" INTEGER NOT NULL,
    "bonus_points_awarded" BIGINT,
    "awarded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referrals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayoutRequests" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "mobile_money_number" VARCHAR(20),
    "amount_points" BIGINT,
    "amount_money" DECIMAL(10,2),
    "status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3),

    CONSTRAINT "PayoutRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offers" (
    "id" SERIAL NOT NULL,
    "offer_name" VARCHAR(255),
    "offer_provider" VARCHAR(100),
    "payout_points" BIGINT,
    "country_restrictions" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Offers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" VARCHAR(50),
    "points" BIGINT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "points" BIGINT,
    "rank" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSettings" (
    "id" SERIAL NOT NULL,
    "setting_key" VARCHAR(255) NOT NULL,
    "setting_value" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_firebase_uid_key" ON "Users"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_referral_code_key" ON "Users"("referral_code");

-- CreateIndex
CREATE UNIQUE INDEX "Referrals_referrer_id_referred_id_key" ON "Referrals"("referrer_id", "referred_id");

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_user_id_key" ON "Leaderboard"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdminSettings_setting_key_key" ON "AdminSettings"("setting_key");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_referred_by_fkey" FOREIGN KEY ("referred_by") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskCompletions" ADD CONSTRAINT "TaskCompletions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referrals" ADD CONSTRAINT "Referrals_referred_id_fkey" FOREIGN KEY ("referred_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PayoutRequests" ADD CONSTRAINT "PayoutRequests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
