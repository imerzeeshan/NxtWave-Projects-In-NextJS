"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Circle, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setAddresses } from "@/features/addressSlice";
import DefaultAddressSelector from "./DefaultAddressSelector";

export default function Address() {
  //   const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    houseDetails: "",
    areaDetails: "",
    landmark: "",
    city: "",
    state: "",
    addressType: "Home",
  });
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.addresses);

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    const res = await fetch("/api/addresses");
    const data = await res.json();
    dispatch(setAddresses(data));
  }

  async function setDefaultAddress(addressId) {
    setLoading(true);
    await fetch("/api/addresses/set-default", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addressId }),
    });
    await fetchAddresses();
    setLoading(false);
  }

  function openForm(address = null) {
    setEditingAddress(address);
    if (address) {
      setFormData(address);
    } else {
      setFormData({
        name: "",
        phone: "",
        pincode: "",
        houseDetails: "",
        areaDetails: "",
        landmark: "",
        city: "",
        state: "",
        addressType: "Home",
      });
    }
    setShowForm(true);
  }

  async function saveAddress(e) {
    e.preventDefault();
    const method = editingAddress ? "PUT" : "POST";
    const url = editingAddress
      ? `/api/addresses/${editingAddress._id}`
      : "/api/addresses";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setShowForm(false);
    setEditingAddress(null);
    await fetchAddresses();
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">My Addresses</h1>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-xl hover:bg-blue-700"
        >
          <Plus size={16} /> Add Address
        </button>
      </div>
      <DefaultAddressSelector fetchAddresses={fetchAddresses} />

      {addresses.map((addr) => {
        return (
          addr.isDefault && (
            <div
              key={addr._id}
              className="p-4 border rounded-2xl shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-medium">
                  {addr.name} ({addr.phone})
                </p>
                <p className="text-sm text-gray-600">
                  {addr.houseDetails}, {addr.areaDetails}, {addr.city},{" "}
                  {addr.state} - {addr.pincode}
                </p>
                <p className="text-xs text-gray-500">
                  Type: {addr.addressType}
                </p>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => setDefaultAddress(addr._id)}
                  disabled={loading}
                  className={`flex items-center gap-1 text-sm ${
                    addr.isDefault
                      ? "text-green-600 font-semibold"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {addr.isDefault ? (
                    <CheckCircle size={18} />
                  ) : (
                    <Circle size={18} />
                  )}
                  {addr.isDefault ? "Default" : "Set as Default"}
                </button>
                <button
                  onClick={() => openForm(addr)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          )
        );
      })}

      {/* Address Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editingAddress ? "Edit Address" : "Add New Address"}
            </h2>

            <form onSubmit={saveAddress} className="space-y-3">
              {[
                "name",
                "phone",
                "pincode",
                "houseDetails",
                "areaDetails",
                "landmark",
                "city",
                "state",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={field}
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="w-full border p-2 rounded-lg text-sm text-gray-600"
                  required={["landmark"].includes(field) ? false : true}
                />
              ))}

              <select
                value={formData.addressType}
                onChange={(e) =>
                  setFormData({ ...formData, addressType: e.target.value })
                }
                className="w-full border p-2 rounded-lg text-sm text-gray-500 mb-10"
              >
                <option>Home</option>
                <option>Work</option>
                <option>Other</option>
              </select>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
