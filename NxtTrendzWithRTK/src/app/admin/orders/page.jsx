"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Check, Clock, Circle } from "lucide-react"; // ✅ Icons
import Loading from "@/app/loading";

const Orders = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getOrders = async () => {
    try {
      const res = await fetch("/api/seller/orders", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) setOrders(data.myProductOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  async function updateStatus(orderId, itemId, status) {
    try {
      const res = await fetch(`/api/seller/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, status }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  items: order.items.map((item) =>
                    item._id === itemId ? { ...item, status } : item
                  ),
                }
              : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  }

  const steps = [
    "pending",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  const statusClasses = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const paymentStatusClasses = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-blue-100 text-blue-700",
  };

  // 🔹 Styled Progress Bar with Icons
  const renderProgressBar = (status) => {
    const currentStep = steps.indexOf(status);

    return (
      <div className="relative flex items-center justify-between mt-4">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>

        {/* Active Line */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div
              key={step}
              className="flex flex-col items-center relative z-10 w-full"
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold shadow-md transition-all duration-300
                  ${isCompleted ? "bg-green-500 text-white" : ""}
                  ${
                    isActive
                      ? "bg-yellow-400 text-black ring-4 ring-yellow-200 animate-pulse"
                      : ""
                  }
                  ${
                    !isCompleted && !isActive ? "bg-gray-200 text-gray-500" : ""
                  }
                `}
              >
                {isCompleted && <Check size={16} />}
                {isActive && <Clock size={16} />}
                {!isCompleted && !isActive && <Circle size={14} />}
              </div>
              <span
                className={`text-[11px] mt-1 capitalize transition-colors duration-300
                  ${isCompleted ? "text-green-600" : ""}
                  ${
                    isActive ? "text-yellow-600 font-semibold" : "text-gray-400"
                  }
                `}
              >
                {step.replaceAll("_", " ")}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // Filter + Search logic
  const filteredOrders = orders.filter((order) => {
    let matchesStatus =
      statusFilter === "all" ||
      order.items.some((item) => item.status === statusFilter);

    let matchesPayment =
      paymentFilter === "all" ||
      (order.payment?.status &&
        order.payment.status.toLowerCase() === paymentFilter);

    let matchesDate = true;
    if (fromDate) {
      matchesDate =
        matchesDate &&
        new Date(order.createdAt) >= new Date(fromDate + "T00:00:00");
    }
    if (toDate) {
      matchesDate =
        matchesDate &&
        new Date(order.createdAt) <= new Date(toDate + "T23:59:59");
    }

    let matchesSearch = true;
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      matchesSearch =
        order._id.toLowerCase().includes(search) ||
        (order.buyerEmail && order.buyerEmail.toLowerCase().includes(search)) ||
        order.items.some(
          (item) =>
            item.product?.name &&
            item.product.name.toLowerCase().includes(search)
        );
    }

    return matchesStatus && matchesPayment && matchesDate && matchesSearch;
  });

  const resetFilters = () => {
    setStatusFilter("all");
    setPaymentFilter("all");
    setFromDate("");
    setToDate("");
    setSearchTerm("");
  };

  if (loading) return <Loading />;

  return (
    <div className="mt-10 p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {/* Filter + Search Bar */}
      <div className="mb-6 flex flex-wrap gap-4 items-end bg-gray-50 p-4 rounded-lg shadow-sm">
        <div>
          <label className="text-sm font-medium text-gray-600 mr-2">
            Item Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">Out For Delivery</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mr-2">
            Payment:
          </label>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mr-2">
            From:
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mr-2">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Order ID, Product, Buyer Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded px-3 py-1 text-sm"
          />
        </div>
        <button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <p>No matching orders found.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow-md bg-white space-y-4"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                  Order ID:{" "}
                  <span className="text-gray-600 font-normal">{order._id}</span>
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Order Items */}
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item._id} className="border-b pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Buyer: {item.buyerEmail || "Unknown"}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                            statusClasses[item.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            updateStatus(order._id, item._id, e.target.value)
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">
                            Out For Delivery
                          </option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                    {/* Progress bar */}
                    {renderProgressBar(item.status)}
                  </div>
                ))}
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-semibold mb-1">Shipping Address</h3>
                <p className="flex">
                  Contact No. - {"  "}
                  <span className="text-xl font-semibold pl-5 text-gray-700">
                    {order.address?.phone}
                  </span>{" "}
                </p>
                <p className="text-sm text-gray-600">
                  {order.address?.houseDetails}, {order.address?.areaDetails},
                  {order.address?.city}, {order.address?.state}{" "}
                  {order.address?.pincode}, {order.address?.country}
                </p>
              </div>

              {/* Payment Info */}
              <div className="bg-gray-50 p-3 rounded-md">
                <h3 className="text-sm font-semibold mb-1">Payment</h3>
                <p className="text-sm text-gray-600">
                  Method: {order.payment?.method || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  Transaction ID: {order.payment?.transactionId || "N/A"}
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                      paymentStatusClasses[
                        order.payment?.status?.toLowerCase()
                      ] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.payment?.status || "Unknown"}
                  </span>
                </p>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <p className="font-semibold">
                  Total: ${order.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
