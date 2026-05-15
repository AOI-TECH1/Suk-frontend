import React from 'react';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
            Privacy <span className="text-orange-500">Policy</span>
          </h1>
          <p className="text-gray-500 font-medium">Protecting your data at SuK Marketplace. Last updated: May 15, 2026</p>
        </div>

        {/* Introduction */}
        <div className="prose prose-orange max-w-none mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            At SuK Marketplace, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website to buy or sell goods.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="grid gap-8">
          
          {/* Section 1: Data Collection */}
          <div className="group border border-gray-100 p-8 rounded-[32px] bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-black text-white rounded-xl group-hover:bg-orange-500 transition-colors">
                <Database size={20} />
              </div>
              <h2 className="text-xl font-bold text-black">Information We Collect</h2>
            </div>
            <p className="text-gray-600 mb-4">We collect information to provide better services to our users. This includes:</p>
            <ul className="grid md:grid-cols-2 gap-3 text-sm font-semibold text-gray-700">
              <li className="flex items-center gap-2"><span>•</span> Name & Email</li>
              <li className="flex items-center gap-2"><span>•</span> Delivery Address</li>
              <li className="flex items-center gap-2"><span>•</span> Phone Number</li>
              <li className="flex items-center gap-2"><span>•</span> Business Details (for Sellers)</li>
            </ul>
          </div>

          {/* Section 2: Payments */}
          <div className="group border border-gray-100 p-8 rounded-[32px] bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-black text-white rounded-xl group-hover:bg-orange-500 transition-colors">
                <Lock size={20} />
              </div>
              <h2 className="text-xl font-bold text-black">Payment Security</h2>
            </div>
            <p className="text-gray-600">
              Your financial security is our priority. All payments on SuK are processed through <span className="text-blue-600 font-bold">Paystack</span>. We **never** store your credit card or bank details on our servers. Paystack handles everything using industry-standard encryption.
            </p>
          </div>

          {/* Section 3: Usage */}
          <div className="group border border-gray-100 p-8 rounded-[32px] bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-black text-white rounded-xl group-hover:bg-orange-500 transition-colors">
                <Eye size={20} />
              </div>
              <h2 className="text-xl font-bold text-black">How We Use Your Data</h2>
            </div>
            <p className="text-gray-600">We use your information to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-2 text-gray-600 italic">
              <li>Process and ship your orders correctly.</li>
              <li>Verify seller identities to prevent fraud.</li>
              <li>Communicate updates regarding your delivery or support tickets.</li>
              <li>Improve the SuK platform based on user behavior.</li>
            </ul>
          </div>

          {/* Section 4: Data Sharing */}
          <div className="border-l-4 border-orange-500 p-8 bg-white shadow-sm">
            <h2 className="text-xl font-bold text-black mb-3">Third-Party Sharing</h2>
            <p className="text-gray-600">
              We do not sell your data. We only share necessary information with trusted partners like **logistics companies** (to deliver your goods) and **payment processors** (to handle your money).
            </p>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            By using SuK Marketplace, you agree to the collection and use of information in accordance with this policy. If you have questions about your privacy, please contact <a href="mailto:privacy@suk.com.ng" className="text-orange-500 font-bold hover:underline">privacy@suk.com.ng</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;