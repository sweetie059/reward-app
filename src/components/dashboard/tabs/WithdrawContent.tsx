'use client';

import { useState } from 'react';

interface User {
  id: string;
  balance: number;
  // Add other user properties as needed
}

interface WithdrawContentProps {
  user: User | null;
}

const MOBILE_NETWORKS = ['MTN', 'Vodafone', 'AirtelTigo', 'Telecel'];
const GHANA_BANKS = [
  'Ghana Commercial Bank',
  'Absa Bank Ghana',
  'Standard Chartered Bank Ghana',
  'Ecobank Ghana',
  'CalBank',
  'Fidelity Bank Ghana',
  'Zenith Bank Ghana',
  'Access Bank Ghana'
];

export default function WithdrawContent({ user }: WithdrawContentProps) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'bank' | 'bitcoin' | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileName, setMobileName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bitcoinAddress, setBitcoinAddress] = useState('');

  const userBalance = user?.balance || 0;
  const maxWithdrawal = 100;

  const handleWithdraw = async () => {
    if (!amount || isNaN(Number(amount))) {
      return setMessage({text: 'Please enter a valid amount', type: 'error'});
    }

    if (Number(amount) > maxWithdrawal) {
      return setMessage({text: `Maximum withdrawal amount is GHS ${maxWithdrawal}`, type: 'error'});
    }

    if (Number(amount) > userBalance) {
      return setMessage({text: 'Insufficient balance for this withdrawal', type: 'error'});
    }

    if (!paymentMethod) {
      return setMessage({text: 'Please select a payment method', type: 'error'});
    }

    if (paymentMethod === 'momo' && (!selectedNetwork || !mobileNumber || !mobileName)) {
      return setMessage({text: 'Please fill all mobile money details', type: 'error'});
    }

    if (paymentMethod === 'bank' && (!selectedBank || !accountName || !accountNumber)) {
      return setMessage({text: 'Please fill all bank details', type: 'error'});
    }

    if (paymentMethod === 'bitcoin' && !bitcoinAddress) {
      return setMessage({text: 'Please enter your Bitcoin address', type: 'error'});
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id,
          amount: Number(amount),
          payment_method: paymentMethod,
          ...(paymentMethod === 'momo' && {
            network: selectedNetwork,
            mobile_number: mobileNumber,
            account_name: mobileName
          }),
          ...(paymentMethod === 'bank' && {
            bank_name: selectedBank,
            account_name: accountName,
            account_number: accountNumber
          }),
          ...(paymentMethod === 'bitcoin' && {
            bitcoin_address: bitcoinAddress
          })
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({text: 'Withdrawal request submitted successfully!', type: 'success'});
        // Reset form
        setAmount('');
        setPaymentMethod(null);
        setSelectedNetwork('');
        setMobileNumber('');
        setMobileName('');
        setSelectedBank('');
        setAccountName('');
        setAccountNumber('');
        setBitcoinAddress('');
      } else {
        setMessage({text: data.error || 'Failed to process withdrawal', type: 'error'});
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      setMessage({text: 'Network error. Please try again later.', type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-violet-100 rounded-lg text-violet-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Withdraw Funds</h2>
          <p className="text-sm text-gray-500">Transfer your earnings to your account</p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-violet-50 rounded-xl p-4 mb-6 border border-violet-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-violet-600 font-medium">Available Balance</p>
            <p className="text-2xl font-bold">GHS {userBalance.toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-violet-500">Max withdrawal</p>
            <p className="font-medium">GHS {maxWithdrawal}</p>
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount (GHS)</label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 pl-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            placeholder="0.00"
            max={maxWithdrawal}
            step="0.01"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            GHS
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      {!paymentMethod ? (
        <div className="mb-6">
          <p className="block text-sm font-medium text-gray-700 mb-3">Payment Method</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('momo')}
              className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-violet-400 transition flex flex-col items-center"
            >
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="font-medium">Mobile Money</span>
            </button>
            <button
              onClick={() => setPaymentMethod('bank')}
              className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-violet-400 transition flex flex-col items-center"
            >
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <span className="font-medium">Bank Transfer</span>
            </button>
            <button
              onClick={() => setPaymentMethod('bitcoin')}
              className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-violet-400 transition flex flex-col items-center"
            >
              <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm-1-14v4h-1v-4h1zm-1.768 4l-1.767-1.768 1.768-1.768 1.768 1.768-1.768 1.768zm3.536 0l-1.768-1.768 1.768-1.768 1.768 1.768-1.768 1.768zm1.232-4h1v4h-1v-4zm-1.768 4l1.768 1.768-1.768 1.768-1.768-1.768 1.768-1.768zm-3.536 0l1.768 1.768-1.768 1.768-1.768-1.768 1.768-1.768z" />
                </svg>
              </div>
              <span className="font-medium">Bitcoin</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="block text-sm font-medium text-gray-700">
              {paymentMethod === 'momo' ? 'Mobile Money Details' : 
               paymentMethod === 'bank' ? 'Bank Details' : 'Bitcoin Details'}
            </p>
            <button
              onClick={() => setPaymentMethod(null)}
              className="text-sm text-violet-600 hover:text-violet-800 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Change method
            </button>
          </div>

          {paymentMethod === 'momo' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Network</label>
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                >
                  <option value="">Select your network</option>
                  {MOBILE_NETWORKS.map(network => (
                    <option key={network} value={network}>{network}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="e.g. 0244123456"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Account Name</label>
                <input
                  type="text"
                  value={mobileName}
                  onChange={(e) => setMobileName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Name as registered with network"
                />
              </div>
            </div>
          ) : paymentMethod === 'bank' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bank Name</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                >
                  <option value="">Select your bank</option>
                  {GHANA_BANKS.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Account Name</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Account holder name"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Account number"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Bitcoin Address</label>
                <input
                  type="text"
                  value={bitcoinAddress}
                  onChange={(e) => setBitcoinAddress(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Your Bitcoin wallet address"
                />
              </div>
              <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg text-sm text-yellow-800">
                <p className="font-medium">Note:</p>
                <p>• Bitcoin withdrawals may take longer to process (up to 72 hours)</p>
                <p>• The amount will be converted to BTC at current market rates</p>
                <p>• Ensure you provide a valid Bitcoin address</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      {paymentMethod && (
        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full p-4 bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Withdraw Funds'
          )}
        </button>
      )}

      {/* Status Message */}
      {message && (
        <div className={`mt-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="h-5 w-5 mr-2 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{message.text}</span>
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 text-xs text-gray-500">
        <p>• Withdrawals are processed within 24-48 hours (except Bitcoin)</p>
        <p>• A small fee may apply depending on payment method</p>
        <p>• Bitcoin withdrawals may take up to 72 hours</p>
      </div>
    </div>
  );
}