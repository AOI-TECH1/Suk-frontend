import React from 'react';

const Terms = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
            Terms of <span className="text-orange-500">Use</span>
          </h1>
          <p className="text-gray-500 font-medium">Last updated: May 15, 2026</p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 text-gray-700 leading-relaxed space-y-10">
          
          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">01</span>
              Acceptance of Terms
            </h2>
            <p>
              Welcome to SuK Marketplace. By accessing or using our platform, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use the platform. We reserve the right to change these terms at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">02</span>
              User Accounts & Security
            </h2>
            <p className="mb-4">
              To use certain features of SuK, you must register for an account (Buyer or Seller). You are responsible for:
            </p>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              <li>Maintaining the confidentiality of your login credentials.</li>
              <li>All activities that occur under your account.</li>
              <li>Ensuring your contact information is accurate and up-to-date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">03</span>
              Seller Obligations
            </h2>
            <p className="mb-4">
              Sellers on SuK Marketplace agree to:
            </p>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
               <ul className="space-y-3 font-medium text-black">
                 <li>🚫 Not list illegal, counterfeit, or stolen items.</li>
                 <li>📦 Honor the delivery times promised on product pages.</li>
                 <li>📸 Use real images of the products (No misleading photos).</li>
                 <li>💰 Pay the applicable platform commission fees on successful sales.</li>
               </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">04</span>
              Payments & Transactions
            </h2>
            <p>
              SuK Marketplace uses <span className="font-bold text-blue-600">Paystack</span> as our secure payment gateway. By making a purchase, you agree to their terms as well. We do not store your credit card information. Payments are released to sellers only after confirmation of delivery in accordance with our payout schedule.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">05</span>
              Prohibited Conduct
            </h2>
            <p>
              Users are strictly prohibited from engaging in fraudulent activities, harassing other users, or attempting to bypass the SuK payment system to conduct private transactions. Any violation will result in permanent account suspension.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
              <span className="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center text-sm">06</span>
              Limitation of Liability
            </h2>
            <p className="italic bg-gray-50 p-6 rounded-2xl border border-gray-200">
              "SuK Marketplace acts as a bridge between buyers and sellers. We are not responsible for the quality, safety, or legality of the items advertised, nor the truth or accuracy of the listings."
            </p>
          </section>

        </div>

        {/* Support Call-to-action */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">Questions about our Terms?</p>
          <a href="/contact" className="text-orange-500 font-bold hover:underline">Contact SuK Support Team</a>
        </div>
      </div>
    </div>
  );
};

export default Terms;