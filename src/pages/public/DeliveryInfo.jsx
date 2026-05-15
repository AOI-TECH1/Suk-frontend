const DeliveryInfo = () => (
  <div className="max-w-4xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-black mb-8">Delivery Information</h1>
    <div className="space-y-6 text-gray-700">
      <section>
        <h2 className="text-xl font-bold text-black mb-2">Shipping Coverage</h2>
        <p>SuK Marketplace currently delivers to all major cities across Nigeria. We partner with reliable logistics providers to ensure your items arrive safely.</p>
      </section>
      <section className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
        <h2 className="text-xl font-bold text-black mb-2">Standard Delivery Times</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li><strong>Lagos:</strong> 1-2 Business Days</li>
          <li><strong>Abuja & Port Harcourt:</strong> 3-4 Business Days</li>
          <li><strong>Other States:</strong> 5-7 Business Days</li>
        </ul>
      </section>
    </div>
  </div>
);
export default DeliveryInfo;