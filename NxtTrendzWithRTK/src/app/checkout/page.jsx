// pages/checkout.jsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetAllCartItemsMutation } from "@/features/cartApiSlice";
import CartItems from "./CartItems";

export default function CheckoutPage({ cartItemsFromContext = null }) {
  const router = useRouter();
  const [getAllCartItems] = useGetAllCartItemsMutation();
  const [cartItems, setCartItems] = useState(cartItemsFromContext || []);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    houseDetails: "",
    areaDetails: "",
    landmark: "",
    city: "",
    country: "India",
    state: "",
    addressType: "Home",
    isDefault: false,
  });
  console.log(selectedAddressId);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  // const userId = user.id; // replace with real user id (from auth)

  const getAddresses = async () => {
    const addressesRes = await fetch(`/api/addresses`, { method: "GET" });
    // console.log(await addressesRes.json());
    if (addressesRes.ok) {
      const data = await addressesRes.json();
      console.log(data);

      setAddresses(data.addresses);
    }
  };

  const getCartItems = async () => {
    const { data } = await getAllCartItems();
    console.log(data);
    if (data.products.length > 0) {
      setCartItems(data.products);
    } else {
      router.push("/cart");
      alert("Your Cart is Empty");
    }
  };

  useEffect(() => {
    // Load saved addresses
    getAddresses();

    // If cart not passed via prop, fetch from your cart endpoint
    getCartItems();
  }, []);

  useEffect(() => {
    addresses?.forEach((add) => {
      if (add.isDefault === true) setSelectedAddressId(add._id);
    });
  }, [addresses]);

  const totalAmount = cartItems.reduce(
    (s, it) => s + (it.productDetails?.price || 0) * (it.productCount || 1),
    0
  );


  const handleAddAddress = async () => {
    if (addressFormOpen) {
      const res = await fetch(`/api/addresses/${selectedAddressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressForm),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setAddressFormOpen(false);
      }
    } else {
      // simple validation
      if (!addressForm.name || !addressForm.areaDetails)
        return alert("Fill required fields");
      const res = await fetch(`/api/addresses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressForm),
      });
      const data = await res.json();
      console.log(data);

      if (data.success) {
        setAddresses((s) => [d.address, ...s]);
        setSelectedAddressId(d.address.id);
        setAddressForm({
          name: "",
          phone: "",
          pincode: "",
          houseDetails: "",
          areaDetails: "",
          landmark: "",
          city: "",
          state: "",
          country: "India",
          addressType: "Home",
          isDefault: false,
        });
        setAddressFormOpen(false);
      } else {
        alert("Failed to save address");
      }
    }
  };

  const handleConfirm = async () => {
    if (!selectedAddressId) return alert("Please select an address");
    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

    if (paymentMethod === "cod") {
      setLoading(true);
      try {
        const res = await fetch("/api/user/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            selectedAddressId,
            paymentMod:'cod',
          }),
        });
        const d = await res.json();
        console.log(d);
        
        if (d.success) {
          // optionally clear cart in your DB
          router.push("/order");
        } else {
          alert("Error creating order");
        }
      } catch (err) {
        console.error(err);
        alert("Error placing order");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Online payment flow
    setLoading(true);
    try {
      // Create Razorpay order on server
      const createRes = await fetch("/api/razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      const createData = await createRes.json();
      if (!createData.success) {
        alert("Failed to create payment order");
        setLoading(false);
        return;
      }
      const order = createData.order;
      const ok = await openRazorpayScript();
      if (!ok) {
        alert("Razorpay SDK failed to load");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your Shop",
        description: "Order Payment",
        order_id: order.id,
        prefill: {
          name: selectedAddress.name || "",
          contact: selectedAddress.phone || "",
        },
        notes: {
          address: selectedAddress.line1 || "",
        },
        theme: { color: "#3399cc" },
        handler: async function (response) {
          // response: {razorpay_payment_id, razorpay_order_id, razorpay_signature}
          // Verify payment on server
          const verifyRes = await fetch("/api/razorpay-verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              cartItems,
              address: selectedAddress,
              userId: user.id,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            // clear cart as needed
            router.push("/order/success?method=online");
          } else {
            alert("Payment verification failed");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("payment error", err);
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-20">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      {/* Addresses */}
      <section className="mb-6">
        <h2 className="text-lg font-medium mb-3">Select Address</h2>
        <div className="space-y-2">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => setSelectedAddressId(addr._id)}
              className={`p-2 border rounded cursor-pointer ${
                selectedAddressId === addr._id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">
                    {addr.name} • {addr.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.houseDetails}, {addr.areaDetails}, {addr.city},{" "}
                    {addr.state} {addr.postalCode}, {addr.country}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-sm text-blue-600"
                    onClick={async (e) => {
                      e.stopPropagation();
                      // Simple inline edit support: fill form and open
                      setAddressForm(addr);
                      setAddressFormOpen(true);
                      setSelectedAddressId(addr._id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div>
            <button
              className="text-blue-600"
              onClick={() => {
                setAddressFormOpen((s) => !s);
                setAddressForm({
                  name: "",
                  phone: "",
                  pincode: "",
                  houseDetails: "",
                  areaDetails: "",
                  landmark: "",
                  city: "",
                  state: "",
                  country: "India",
                  addressType: "Home",
                  isDefault: false,
                });
              }}
            >
              + Add New Address
            </button>

            {addressFormOpen && (
              <div className="mt-2 space-y-2 p-4 border rounded bg-white">
                <input
                  className="w-full border px-2 py-1"
                  placeholder="Full Name"
                  value={addressForm.name}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, name: e.target.value })
                  }
                />
                <input
                  className="w-full border px-2 py-1"
                  placeholder="Phone"
                  value={addressForm.phone}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, phone: e.target.value })
                  }
                />
                <input
                  className="w-full border px-2 py-1"
                  placeholder="Pincode"
                  value={addressForm.pincode}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, pincode: e.target.value })
                  }
                />
                <input
                  className="w-full border px-2 py-1"
                  placeholder="House / Flat / Building"
                  value={addressForm.houseDetails}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      houseDetails: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full border px-2 py-1"
                  placeholder="Area / Colony / Street"
                  value={addressForm.areaDetails}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      areaDetails: e.target.value,
                    })
                  }
                />
                <input
                  className="w-full border px-2 py-1"
                  placeholder="Landmark (optional)"
                  value={addressForm.landmark}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, landmark: e.target.value })
                  }
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    className="border px-2 py-1"
                    placeholder="City"
                    value={addressForm.city}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, city: e.target.value })
                    }
                  />
                  <input
                    className="border px-2 py-1"
                    placeholder="State"
                    value={addressForm.state}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, state: e.target.value })
                    }
                  />
                  <input
                    className="border px-2 py-1"
                    placeholder="Country"
                    value={addressForm.country}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        country: e.target.value,
                      })
                    }
                  />
                </div>

                <select
                  className="w-full border px-2 py-1"
                  value={addressForm.addressType}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      addressType: e.target.value,
                    })
                  }
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addressForm.isDefault}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        isDefault: e.target.checked,
                      })
                    }
                  />
                  Set as default
                </label>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={handleAddAddress}
                  >
                    Save
                  </button>
                  <button
                    className="px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500"
                    onClick={() => setAddressFormOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/*Cart Items */}
      <section>
        <CartItems cartItems={cartItems} />
      </section>

      {/* Payment */}
      <section className="mb-6">
        <h2 className="text-lg font-medium mb-2">Payment Method</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pm"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Cash on Delivery</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="pm"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
            />
            <span>Pay Online (UPI / Card)</span>
          </label>
        </div>
      </section>

      {/* Order summary */}
      <section className="mb-6 border-t pt-4">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>Rs {totalAmount}/-</span>
        </div>
        <div className="flex justify-between font-semibold mb-4">
          <span>Total</span>
          <span>Rs {totalAmount}/-</span>
        </div>
        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
          disabled={loading}
        >
          {paymentMethod === "cod"
            ? loading
              ? "Placing..."
              : "Place Order (COD)"
            : loading
            ? "Processing..."
            : "Pay with Razorpay"}
        </button>
      </section>
    </div>
  );
}
