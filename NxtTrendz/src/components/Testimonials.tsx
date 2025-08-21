export default function Testimonials() {
  return (
    <section className="max-w-[90%] md:max-w[85%] lg:max-w-[80%] mx-auto mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">What Our Customers Say</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <p>"Amazing quality clothes! I got compliments everywhere I went."</p>
          <span className="block mt-3 font-semibold">– Sarah K.</span>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <p>"Fast delivery and trendy fashion at great prices!"</p>
          <span className="block mt-3 font-semibold">– Mike T.</span>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow">
          <p>"This store has become my go-to for new outfits."</p>
          <span className="block mt-3 font-semibold">– Anna R.</span>
        </div>
      </div>
    </section>
  );
}
