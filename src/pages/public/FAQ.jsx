import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronRight, ChevronDown, MessageCircle, PhoneCall } from 'lucide-react';

const FAQ = () => {
  const faqData = [
    { 
        q: "How do I track my SuK order?", 
        a: "Once your order is processed, a tracking ID will be generated in your Buyer Dashboard. You will also receive real-time updates via email and SMS as your package moves through our logistics network." 
    },
    { 
        q: "What payment methods do you accept?", 
        a: "We currently process all payments securely through Paystack. You can pay using your Debit/Credit cards (Mastercard, Visa, Verve), Bank Transfer, or USSD." 
    },
    { 
        q: "Is my money safe with SuK?", 
        a: "Yes. We use a secure Escrow system. When you pay, the money is held by SuK and only released to the seller after you confirm that you have received the item in good condition." 
    },
    { 
        q: "How do I register as a SuK Merchant?", 
        a: "Simply click on the 'Sign Up' icon in the navbar and choose 'I want to sell'. You will be guided through our onboarding process to set up your store and bank details." 
    },
    { 
        q: "Can I return an item if I don't like it?", 
        a: "We offer a 7-day return policy for most items. The product must be unused and in its original packaging. Please check our Refund Policy page for specific category exclusions." 
    },
    { 
        q: "How long does delivery take?", 
        a: "Lagos deliveries typically arrive within 24-48 hours. Orders to Abuja and Port Harcourt take 3-4 days. Other states across Nigeria may take up to 5-7 business days." 
    },
    { 
        q: "Are there any registration fees for sellers?", 
        a: "Registering and listing your products on SuK is completely free. We only charge a small percentage commission on successful sales made through the platform." 
    },
    { 
        q: "Can I chat directly with a seller?", 
        a: "Currently, you can communicate with sellers through our support ticket system. A direct live-chat feature is coming in our next major update!" 
    },
    { 
        q: "What do I do if I receive a fake product?", 
        a: "SuK has a zero-tolerance policy for counterfeits. Immediately report the item through your dashboard, and we will pause the payment to the seller and initiate a full refund." 
    },
    { 
        q: "How do I reset my password?", 
        a: "Click on the 'Forgot Password' link on the Login page. Enter your email, and we will send you a secure link to create a new password." 
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-32 pb-20 font-sans">
      
      {/* --- 1. HERO IMAGE BANNER --- */}
      <div className="relative w-full h-48 md:h-64 bg-zinc-900 overflow-hidden flex items-center z-10">
        <img 
          src="https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop" 
          alt="Support Banner" 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-20 w-full text-white">
            <nav className="flex items-center text-[10px] text-gray-300 font-black mb-3 uppercase tracking-[0.2em]">
                <Link to="/" className="hover:text-[#fbb03b] transition-colors">Home</Link>
                <ChevronRight size={10} className="mx-2 text-gray-500" />
                <span className="text-[#fbb03b]">Help Center</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
                Common <span className="text-[#fbb03b]">Questions</span>
            </h1>
        </div>
      </div>

      {/* --- 2. CONTENT AREA --- */}
      <div className="flex flex-col items-center justify-center px-4 -mt-16 relative z-30">
        <div className="max-w-4xl w-full bg-white p-8 md:p-16 rounded-[40px] shadow-2xl border border-gray-100">
          
          <div className="mb-12 text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#fbb03b] mx-auto mb-6">
                <HelpCircle size={32} />
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight text-zinc-900 mb-4">How can we help?</h2>
            <p className="text-gray-400 font-medium text-sm">Find quick answers to the most frequently asked questions below.</p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-2xl border border-gray-100 transition-all duration-300 open:bg-white open:shadow-xl open:border-orange-100">
                <summary className="flex justify-between items-center p-6 cursor-pointer list-none outline-none">
                  <span className="text-sm md:text-base font-black uppercase tracking-tight text-zinc-800 group-open:text-[#fbb03b] transition-colors">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                    <ChevronDown size={18} className="text-gray-400 group-open:text-[#fbb03b]" />
                  </div>
                </summary>
                <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-gray-500 font-medium leading-loose border-t border-gray-100 pt-4 italic">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Direct Support Section */}
          <div className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="bg-zinc-900 p-6 rounded-3xl flex items-center gap-4 group cursor-pointer hover:bg-black transition-all">
                <div className="w-10 h-10 bg-[#fbb03b] rounded-xl flex items-center justify-center text-black">
                    <MessageCircle size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Chat with us</p>
                    <p className="text-white font-bold text-sm">WhatsApp Support</p>
                </div>
             </div>

             <div className="bg-orange-50 p-6 rounded-3xl flex items-center gap-4 border border-orange-100 group cursor-pointer hover:bg-white transition-all">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-[#fbb03b]">
                    <PhoneCall size={20} />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase text-orange-400 tracking-widest">Call SuK Hub</p>
                    <p className="text-orange-900 font-bold text-sm">+234 812 000 0000</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;