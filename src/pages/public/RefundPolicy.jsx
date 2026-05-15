const RefundPolicy = () => (
  <div className="max-w-4xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-black mb-8">Refund & Returns</h1>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="p-6 border rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-orange-600">7-Day Return Policy</h2>
        <p className="text-gray-600">You have 7 days after receiving your item to request a return. The item must be in its original packaging with all tags attached.</p>
      </div>
      <div className="p-6 border rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-orange-600">Non-Returnable Items</h2>
        <ul className="text-gray-600 list-disc ml-4">
          <li>Underwear and Lingerie</li>
          <li>Beauty products (if seal is broken)</li>
          <li>Used electronics</li>
        </ul>
      </div>
    </div>
  </div>
);
export default RefundPolicy;