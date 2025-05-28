'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDollarSign, FiUser, FiClipboard, FiSmartphone, FiFileText, FiLock, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handlePrivacyPolicy = () => {
    router.push('/privacy-policy');
  };

  const handleTermsConditions = () => {
    router.push('/terms-conditions');
  };

  const handleContact = () => {
    router.push('/contact');
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 py-32 text-center z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎉 Exclusive for the world!
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            Complete Tasks. <span className="text-yellow-300">Earn GHS.</span> Get Paid.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto mb-8 text-indigo-100"
          >
            Join thousands of people earning money by completing simple tasks. Cash out to Mobile Money instantly.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={handleGetStarted}
              className="group bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-indigo-100 transition flex items-center mx-auto gap-2"
            >
              Start Earning Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Hero Illustrations */}
        <motion.img
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 0.8, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          src="https://illustrations.popsy.co/gray/work-from-home.svg"
          alt="Person earning money"
          className="absolute bottom-0 right-0 w-[280px] sm:w-[500px] opacity-80 pointer-events-none"
          style={{ marginBottom: '-1rem' }}
        />
        <motion.img
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.6, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          src="https://illustrations.popsy.co/gray/digital-nomad.svg"
          alt="Person using phone"
          className="absolute bottom-0 left-0 w-[220px] sm:w-[400px] opacity-60 pointer-events-none"
          style={{ marginBottom: '-1rem' }}
        />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-4"
          >
            <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
            <div className="text-gray-600">Users</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-4"
          >
            <div className="text-4xl font-bold text-indigo-600 mb-2">GHS 1M+</div>
            <div className="text-gray-600">Paid Out</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-4"
          >
            <div className="text-4xl font-bold text-indigo-600 mb-2">100+</div>
            <div className="text-gray-600">Local Offers</div>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-center p-4"
          >
            <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Start earning in just 3 simple steps
          </motion.p>
        </div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-3"
        >
          <motion.div variants={item}>
            <FeatureCard
              icon={<FiUser className="w-8 h-8 mb-4 text-indigo-600" />}
              title="Sign Up Free"
              description="Create your free account in seconds. No fees, no commitments."
              color="bg-indigo-100"
            />
          </motion.div>
          <motion.div variants={item}>
            <FeatureCard
              icon={<FiClipboard className="w-8 h-8 mb-4 text-purple-600" />}
              title="Complete Tasks"
              description="Choose from surveys, app trials, and local business offers."
              color="bg-purple-100"
            />
          </motion.div>
          <motion.div variants={item}>
            <FeatureCard
              icon={<FiDollarSign className="w-8 h-8 mb-4 text-green-600" />}
              title="Get Paid in GHS"
              description="Instant Mobile Money payments straight to your phone."
              color="bg-green-100"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4 text-white"
          >
            Ready to start earning?
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-indigo-100 mb-8 text-lg"
          >
            Join thousands of the world making money from their phones.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button
              onClick={handleGetStarted}
              className="bg-white hover:bg-gray-100 text-indigo-700 font-semibold px-10 py-3 rounded-full transition shadow-md flex items-center mx-auto gap-2"
            >
              Sign Up Free
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* New Contact Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re here to help! Get in touch with our support team for any questions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FiMail className="text-indigo-600" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <FiMapPin className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Our Location</h4>
                    <p className="text-gray-600">Accra, Ghana</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <FiPhone className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone Number</h4>
                    <p className="text-gray-600">+233 205 311 417</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <FiSmartphone className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-gray-600">Monday - Friday: 8am - 5pm</p>
                    <p className="text-gray-600">Saturday: 9am - 1pm</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FiSend className="text-purple-600" />
                Send Us a Message
              </h3>
              
              <p className="text-gray-600 mb-6">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
              
              <button
                onClick={handleContact}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition flex items-center justify-center gap-2 shadow-md"
              >
                Contact Support
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="font-semibold mb-3">Prefer other methods?</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition">
                    
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition">
                    WhatsApp
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition">
                    Phone Call
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">EarnGh</h4>
            <p className="text-gray-400">The easiest way for you to earn money online.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition">Payment Methods</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Contact</h5>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4" />
                Accra, Ghana
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4" />
                +233 205 311 417
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Legal</h5>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={handlePrivacyPolicy}
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <FiLock className="w-4 h-4" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={handleTermsConditions}
                  className="hover:text-white transition flex items-center gap-2"
                >
                  <FiFileText className="w-4 h-4" />
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} EarnGh. All rights reserved.
        </div>
      </footer>
    </main>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
};

function FeatureCard({ icon, title, description, color = 'bg-indigo-100' }: FeatureCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`${color} rounded-xl shadow-md p-8 text-center hover:shadow-xl transition border border-gray-100 h-full flex flex-col items-center`}
    >
      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}