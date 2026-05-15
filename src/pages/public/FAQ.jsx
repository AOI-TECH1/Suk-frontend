const FAQ = () => (
  <div className="max-w-4xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-black text-center mb-12">Frequently Asked Questions</h1>
    <div className="space-y-4">
      {[
        { q: "How do I track my order?", a: "Once your order is shipped, you will receive a tracking ID via email and SMS." },
        { q: "Can I pay on delivery?", a: "Currently, we support secure online payments via Paystack. Pay on delivery is available for select items in Lagos." },
        { q: "How do I become a seller?", a: "Click on 'Sign Up', choose the 'Seller' role, and complete your store profile." }
      ].map((faq, i) => (
        <details key={i} className="group border rounded-xl p-6 bg-white transition-all">
          <summary className="font-bold cursor-pointer list-none flex justify-between items-center text-lg">
            {faq.q}
            <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
        </details>
      ))}
    </div>
  </div>
);
export default FAQ;