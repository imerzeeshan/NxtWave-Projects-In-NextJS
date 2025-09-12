"use client";
import { upload } from "@imagekit/next";
import { useState } from "react";

const categoryOptions = [
  { name: "Clothes", categoryId: "1" },
  { name: "Electronics", categoryId: "2" },
  { name: "Appliances", categoryId: "3" },
  { name: "Grocery", categoryId: "4" },
  { name: "Toys", categoryId: "5" },
];

const ProductFormDetails = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleFormAction = async (formData) => {
    const data = Object.fromEntries(formData);
    console.log({ data });

    setLoading(true);
    try {
      const title = formData.get("title");
      const price = formData.get("price");
      const rating = Number(formData.get("rating"));
      const brand = formData.get("brand");
      const category = formData.get("category");
      const style = formData.get("style");
      const description = formData.get("description");
      const totalReviews = formData.get("totalReviews");
      const availability = formData.get("availability");
      const file = formData.get("imageFile");

      const imgkitAuthRes = await fetch("/api/auth/imagekit-auth");
      const imgkitResData = await imgkitAuthRes.json();
      if (!imgkitResData) {
        throw new Error("Please Select a Valid Image");
      }

      const uploadImgRes = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        signature: imgkitResData.signature,
        expire: imgkitResData.expire,
        token: imgkitResData.token,
      });

      const { url, thumbnailUrl, fileId } = uploadImgRes;

      const res = await fetch("/api/auth/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          thumbnailUrl,
          fileId,
          title,
          price,
          rating,
          brand,
          category,
          style,
          description,
          totalReviews,
          availability,
          seller: user?.id,
        }),
      });

      if (!res.ok) {
        console.log(await res.json());
        await fetch("/api/auth/imagekit-auth", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId }),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add a New Product
      </h2>

      <form
        action={handleFormAction}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Inputs */}
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 "
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 "
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 "
        />
        <input
          type="text"
          name="style"
          placeholder="Style"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 "
        />
        <input
          type="number"
          name="totalReviews"
          placeholder="Total Reviews"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 "
        />
        <input
          type="text"
          name="availability"
          placeholder="Availability"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 "
        />

        {/* Category Select */}
        <select
          name="category"
          required
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 cursor-pointer"
        >
          <option value="">Select Category</option>
          {categoryOptions.map((cat) => (
            <option key={cat.categoryId} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Description */}
        <textarea
          rows={4}
          name="description"
          placeholder="Description"
          className="input border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500  col-span-1 md:col-span-2"
        />

        {/* File Upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-600 mb-2 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="file-input w-full border-2 border-gray-400 rounded px-2 py-1.5 text-lg text-gray-700 focus:outline-2
           focus:outline-fuchsia-500 cursor-pointer"
          />
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition cursor-pointer"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormDetails;

// Tailwind reusable styles
const styles = `
.input {
  @apply w-full border border-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none;
}
.file-input {
  @apply block w-full border border-gray-400 rounded-lg cursor-pointer bg-gray-50 px-4 py-2 text-gray-600;
}
`;
