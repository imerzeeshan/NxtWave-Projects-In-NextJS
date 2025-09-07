export default function Newsletter() {
  return (
    <section className="bg-blue-50 py-20 px-8 text-center">
      <h2 className="text-xl font-semibold mb-3">Stay Updated</h2>
      <p className="text-gray-600 mb-4">
        Get the latest deals & fashion trends directly in your inbox.
      </p>
      <div className="flex justify-center max-w-md mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 border rounded-l-lg focus:outline-none w-full"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
          Subscribe
        </button>
      </div>
    </section>
  );
}
