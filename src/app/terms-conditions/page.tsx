'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>

      <p className="mb-6">
        These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our platform (&quot;the Service&quot;). By creating an account or using any part of the Service, you agree to be bound by these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of the Service</h2>
      <p className="mb-4">
        You must be at least 13 years old to use this Service. You agree to use the platform only for lawful purposes and in accordance with these Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account Registration</h2>
      <p className="mb-4">
        When you sign up with Google, your account will be created automatically. You are responsible for maintaining the confidentiality of your login credentials and for any activity under your account.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">3. Earnings &amp; Rewards</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Users can earn points/coins by completing tasks, offers, or other activities.</li>
        <li>We reserve the right to audit, reject, or reverse rewards if fraud, abuse, or violations are detected.</li>
        <li>Rewards are subject to availability, regional restrictions, and provider terms.</li>
        <li>Any manipulation of the system, fake task completions, or multiple account usage will lead to suspension and forfeiture of earnings.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">4. Prohibited Activities</h2>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Using bots or automated tools to complete tasks</li>
        <li>Creating multiple or fake accounts</li>
        <li>Interfering with or disrupting the integrity of the platform</li>
        <li>Uploading harmful content or violating third-party rights</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">5. Third-Party Offerwalls &amp; Services</h2>
      <p className="mb-4">
        We partner with third-party offerwall providers and advertisers. Their content, terms, and conditions are separate and not controlled by us. We are not responsible for errors, delays, or losses related to third-party offers.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">6. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access at any time if you violate these Terms. Upon termination, any pending or unredeemed earnings may be forfeited at our discretion if fraud or abuse is suspected.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property</h2>
      <p className="mb-4">
        All content, logos, design, and code on the platform are the property of our team and may not be copied or reused without permission.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">8. Disclaimer</h2>
      <p className="mb-4">
        The Service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee any specific earnings or uninterrupted access. Use the Service at your own risk.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">9. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for any indirect, incidental, or consequential damages resulting from your use or inability to use the Service, including data loss, earnings loss, or disputes with third parties.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">10. Changes to Terms</h2>
      <p className="mb-4">
        We may update these Terms at any time. Continued use of the platform after changes means you accept the updated Terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">11. Governing Law</h2>
      <p className="mb-4">
        These Terms are governed by the laws of [Your Country]. You agree to resolve any legal disputes in the jurisdiction of our registered location.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">12. Contact</h2>
      <p>
        For questions or issues related to these Terms, please contact us on our{' '}
        <Link href="/contact" className="underline text-blue-600">Contact Page</Link>.
      </p>
    </div>
  );
}
