"use client";
import { useAppContext } from "@/app/context/AppContext";
import { upload } from "@imagekit/next";
// import ImageKit from "@imagekit/next";

type FormInput = {
  title: string;
  brand: string;
  price: number;
  image_url: string;
  rating: string;
  imageFile: File;
};

const ProductFormDetails = () => {
  const { user } = useAppContext();
  const handleFormAction = async (formData: FormData) => {
    try {
      const title = formData.get("title") as string;
      const price = formData.get("price") as string;
      const rating = Number(formData.get("rating"));
      const brand = formData.get("brand") as string;
      const category = formData.get("category") as string;
      const style = formData.get("style") as string;
      const description = formData.get("description") as string;
      const totalReviews = formData.get("totalReviews") as string;
      const availability = formData.get("availability") as string;
      const file = formData.get("imageFile") as File;

      const imgkitAuthRes = await fetch("/api/auth/imagekit-auth");
      const imgkitResData = await imgkitAuthRes.json();
      if (!imgkitResData) {
        throw new Error("Please Select a Valid Image");
      }
      const uploadImgRes = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        signature: imgkitResData.signature,
        expire: imgkitResData.expire,
        token: imgkitResData.token,
      });

      const { url, thumbnailUrl, fileId } = uploadImgRes;

      const res = await fetch("/api/auth/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
          seller: user?._id,
        }),
      });

      if (!res.ok) {
        console.log(await res.json());
        const deleteImgRes = await fetch("/api/auth/imagekit-auth", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId }),
        });
        console.log(await deleteImgRes.json());
      }
      console.log(uploadImgRes);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="p-10">
      <form action={handleFormAction} className="flex flex-wrap gap-10">
        <input
          type="text"
          name="title"
          placeholder="title"
          className="border"
        />
        <input
          type="text"
          name="brand"
          placeholder="brand"
          className="border"
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          className="border"
        />
        <input
          type="text"
          name="rating"
          placeholder="rating"
          className="border"
        />
        <input
          type="text"
          name="style"
          placeholder="style"
          className="border"
        />

        <input
          type="number"
          name="totalReviews"
          placeholder="Total Reviews"
          className="border"
        />
        <input
          type="text"
          name="availability"
          placeholder="availability"
          className="border"
        />
        <input
          type="text"
          name="category"
          placeholder="category"
          className="border"
        />
        <textarea
          rows={5}
          cols={30}
          name="description"
          placeholder="description"
          className="border"
        />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          className="border"
        />
        <button type="submit" className="bg-blue-500 px-3 py-2 text-white">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductFormDetails;
