import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Type safety for request body
interface WithdrawalRequest {
  user_id: string;
  amount: number;
  payment_method: 'momo' | 'bank' | 'bitcoin';
  network?: string;
  mobile_number?: string;
  account_name?: string;
  bank_name?: string;
  account_number?: string;
  bitcoin_address?: string;
}

export async function POST(req: Request) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials not configured');
    }

    const withdrawal: WithdrawalRequest = await req.json();

    // Validate required fields
    if (!withdrawal.user_id || !withdrawal.amount || !withdrawal.payment_method) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generate payment details HTML
    const paymentDetailsHtml = generatePaymentDetails(withdrawal);

    // Send email
    await transporter.sendMail({
      from: `"Withdrawal System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `💰 New Withdrawal Request - GHS ${withdrawal.amount.toFixed(2)}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #4f46e5;">New Withdrawal Request</h2>
          
          <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>📌 User ID:</strong> ${withdrawal.user_id}</p>
            <p><strong>💵 Amount:</strong> GHS ${withdrawal.amount.toFixed(2)}</p>
            <p><strong>🔧 Payment Method:</strong> ${formatPaymentMethod(withdrawal.payment_method)}</p>
          </div>
          
          ${paymentDetailsHtml}
          
          <p style="margin-top: 20px; color: #6b7280; font-size: 0.9em;">
            This is an automated message. Please process this request within 24 hours.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Withdrawal request submitted successfully'
    });

  } catch (error) {
    console.error('Withdrawal processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process withdrawal. Please try again later.' },
      { status: 500 }
    );
  }
}

// Helper functions
function formatPaymentMethod(method: string): string {
  const methods: Record<string, string> = {
    momo: 'Mobile Money',
    bank: 'Bank Transfer',
    bitcoin: 'Bitcoin'
  };
  return methods[method] || method;
}

function generatePaymentDetails(withdrawal: WithdrawalRequest): string {
  switch (withdrawal.payment_method) {
    case 'momo':
      return `
        <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #059669; margin-top: 0;">Mobile Money Details</h3>
          <p><strong>📱 Network:</strong> ${withdrawal.network || 'Not provided'}</p>
          <p><strong>🔢 Mobile Number:</strong> ${withdrawal.mobile_number || 'Not provided'}</p>
          <p><strong>👤 Account Name:</strong> ${withdrawal.account_name || 'Not provided'}</p>
        </div>
      `;
    case 'bank':
      return `
        <div style="background: #eff6ff; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #2563eb; margin-top: 0;">Bank Transfer Details</h3>
          <p><strong>🏦 Bank Name:</strong> ${withdrawal.bank_name || 'Not provided'}</p>
          <p><strong>👤 Account Name:</strong> ${withdrawal.account_name || 'Not provided'}</p>
          <p><strong>🔢 Account Number:</strong> ${withdrawal.account_number || 'Not provided'}</p>
        </div>
      `;
    case 'bitcoin':
      return `
        <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #d97706; margin-top: 0;">Bitcoin Details</h3>
          <p><strong>🪙 Wallet Address:</strong> ${withdrawal.bitcoin_address || 'Not provided'}</p>
          <p style="color: #92400e; font-size: 0.9em;">
            ⚠️ Please verify the address carefully before sending BTC
          </p>
        </div>
      `;
    default:
      return '';
  }
}