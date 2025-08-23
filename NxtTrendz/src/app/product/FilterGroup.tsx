import { Search } from "lucide-react";
import RatingStars from "./RatingStars";
import { Product } from "../../types/types";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const categoryOptions = [
  {
    name: "Clothing",
    categoryId: "1",
  },
  {
    name: "Electronics",
    categoryId: "2",
  },
  {
    name: "Appliances",
    categoryId: "3",
  },
  {
    name: "Grocery",
    categoryId: "4",
  },
  {
    name: "Toys",
    categoryId: "5",
  },
];

const sortbyOptions = [
  {
    optionId: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },
  {
    optionId: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const ratingsList = [
  {
    ratingId: 4,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png",
  },
  {
    ratingId: 3,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png",
  },
  {
    ratingId: 2,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png",
  },
  {
    ratingId: 1,
    imageUrl:
      "https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png",
  },
];

export default function FilterGroup({ products }: { products: Product[] }) {
  const { mainProducts, setFilteredProducts, sortBy, setSortBy } =
    useAppContext();
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [selectedCatogory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(0);

  const clearFilter = () => {
    setSearch("");
    setAppliedSearch("");
    setSelectedCategory(null);
    setSelectedRating(0);
    // setSelectedSort(null);
    setFilteredProducts(mainProducts);
    setSortBy(null);
  };

  const handleSearch = () => {
    setAppliedSearch(search);
  };

  useEffect(() => {
    let filtered = [...mainProducts];

    if (appliedSearch.trim()) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(appliedSearch.trim().toLowerCase())
      );
    }

    if (selectedRating > 0) {
      filtered = filtered.filter(
        (product) => Number(product.rating) >= selectedRating
      );
      filtered.sort((a, b) => Number(a.rating) - Number(b.rating));
    }

    if (sortBy === "PRICE_HIGH") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "PRICE_LOW") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [appliedSearch, selectedRating, sortBy]);

  return (
    <div className="w-fit flex flex-col gap-5 mx-auto">
      <div className="md:h-19 bg-white pt-8">
        <div className="flex items-center bg-gray-100 border rounded h-10 w-full max-w-md">
          <input
            type="search"
            className="md:w-[200px] lg:w-[300px] outline-0 px-3 text-sm sm:text-base md:text-lg text-gray-600 
               bg-transparent placeholder:text-gray-400"
            placeholder="Search"
            value={search}
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search
            onClick={handleSearch}
            className="bg-gray-500 h-full p-2 w-12 sm:w-14 text-white cursor-pointer 
               hover:bg-gray-500/80 transition-all duration-300 rounded-r"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-700">Category</h1>
        {categoryOptions.map((category) => (
          <div
            className={`cursor-pointer py-1.5 px-1 w-45 text-xl text-gray-500 hover:bg-gray-100`}
            key={category.categoryId}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-700">Rating</h1>
        {ratingsList.map((rating) => (
          <div
            className={`cursor-pointer`}
            onClick={() => setSelectedRating(rating.ratingId)}
            key={rating.ratingId}
          >
            <RatingStars
              selectedRating={selectedRating}
              rating={rating.ratingId}
            />
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={clearFilter}
          className="border-1 border-blue-500 text-blue-500 px-5 py-3"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
