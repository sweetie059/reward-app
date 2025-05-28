'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-6">
        This Privacy Policy describes how we collect, use, and share information when you use our platform (&quot;the Site&quot; or &quot;the App&quot;). We are committed to protecting your personal data and respecting your privacy.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
      <p className="mb-4">We collect the following types of information:</p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li><strong>Personal Information:</strong> When you sign up or log in using Google, we collect your name, email address, profile picture, and unique ID.</li>
        <li><strong>Device &amp; Usage Data:</strong> We may collect information about your device, IP address, browser type, and how you use the platform.</li>
        <li><strong>Task &amp; Activity Data:</strong> We track your interactions with the app, such as tasks completed, coins earned, and rewards redeemed.</li>
        <li><strong>Referral and Promotion Data:</strong> If you participate in referral programs, we track referrer IDs and bonus activity.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>To provide and personalize our services</li>
        <li>To track user progress, earnings, and rewards</li>
        <li>To detect and prevent fraud, abuse, or illegal activities</li>
        <li>To provide customer support and respond to your requests</li>
        <li>To improve the platform’s performance, design, and experience</li>
        <li>To send updates, announcements, and important notifications</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies &amp; Tracking Technologies</h2>
      <p className="mb-4">
        We may use cookies, beacons, pixels, and other tracking technologies to analyze traffic, understand user behavior, and deliver personalized content and ads. You may disable cookies through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third-Party Services</h2>
      <p className="mb-4">
        We integrate with third-party services such as offerwall providers, analytics tools, and ad networks. These services may collect data directly under their own privacy policies. We encourage you to review their terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Storage &amp; Security</h2>
      <p className="mb-4">
        Your data is stored securely using industry-standard encryption and protection methods. However, no online platform can guarantee 100% security. Please use strong passwords and protect your login credentials.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>
      <p className="mb-4">
        We retain your personal data for as long as your account is active, or as needed to provide services and comply with legal obligations. You may request deletion of your data at any time.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Children&apos;s Privacy</h2>
      <p className="mb-4">
        Our platform is not intended for children under 13. We do not knowingly collect personal information from anyone under 13. If we become aware that a child has provided us with personal data, we will take steps to delete such information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Rights</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Access and review the data we hold about you</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your account and data</li>
        <li>Withdraw consent for certain data uses</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Users</h2>
      <p className="mb-4">
        If you are accessing the platform from outside [your country], please note that your information may be transferred to, stored, and processed in our servers located in other countries. By using the platform, you consent to this.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time. If we make material changes, we will notify users via email or a prominent notice on the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. Contact Us</h2>
      <p>
        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us on our{' '}
        <Link href="/contact" className="underline text-blue-600">Contact Page</Link>.
      </p>
    </div>
  );
}

