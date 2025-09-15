"use client";
import { useSelector } from "react-redux";

export default function DefaultAddressSelector({ fetchAddresses }) {
  const { addresses } = useSelector((state) => state.addresses);

  async function handleChange(e) {
    const addressId = e.target.value;

    await fetch("/api/addresses/set-default", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId }),
    });
    fetchAddresses();

    // ideally: dispatch action here to update Redux addresses state
  }

  // find default address id
  const defaultAddress = addresses.find((add) => add.isDefault === true);
  const selectedId = defaultAddress ? defaultAddress._id : "";

  return (
    <div className="flex gap-5 items-center">
      <h2 className="font-semibold text-lg min-w-fit">Default Address</h2>

      <select
        value={selectedId}
        onChange={handleChange}
        className="border rounded-lg p-2 w-full text-white bg-gray-500/40"
      >
        {addresses.map((addr) => (
          <option key={addr._id} value={addr._id} className="bg-black">
            {addr.houseDetails}, {addr.city}
          </option>
        ))}
      </select>
    </div>
  );
}
