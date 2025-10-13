"use client";

import React, { useState } from "react";
import OrderItemCard from "./OrderItemCard";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  XCircle,
  Truck,
  MapPin,
  Package,
  Cross,
} from "lucide-react";
import {
  CancelOrderAction,
  RemoveOrderFromOrderList,
} from "./cancellOrderAction";

const OrderDetails = ({ orderDetails, handleGetAllOrders }) => {
  const [expanded, setExpanded] = useState(false);

  // 🔹 Define steps with icons
  const steps = [
    { key: "pending", label: "Pending", icon: <Clock size={16} /> },
    { key: "processing", label: "Processing", icon: <Package size={16} /> },
    { key: "shipped", label: "Shipped", icon: <Truck size={16} /> },
    {
      key: "out_for_delivery",
      label: "Out For Delivery",
      icon: <MapPin size={16} />,
    },
    { key: "delivered", label: "Delivered", icon: <Check size={16} /> },
  ];

  const cancelledStep = {
    key: "cancelled",
    label: "Cancelled",
    icon: <XCircle size={18} />,
  };

  const isCancelled = orderDetails.status === "cancelled";

  // Find the current step index
  const currentStepIndex = steps.findIndex(
    (s) =>
      s.key ===
      (isCancelled
        ? orderDetails.cancelledAtStep || "shipped"
        : orderDetails.status)
  );

  const handleCancelButton = async (orderId) => {
    // const res = await fetch("/api/user/orders", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ orderId }),
    // });
    // const data = await res.json();

    const data = await CancelOrderAction(orderId);
    console.log(data);
    handleGetAllOrders();
  };
  const handleRemoveOrderButton = async (orderId) => {
    const data = await RemoveOrderFromOrderList(orderId);
    console.log(data);
    alert(data.message);
    handleGetAllOrders();
  };

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order #{orderDetails._id}</h2>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            orderDetails.status === "delivered"
              ? "bg-green-500/20 text-green-400"
              : orderDetails.status === "pending"
              ? "bg-yellow-500/20 text-yellow-400"
              : orderDetails.status === "out_for_delivery"
              ? "bg-blue-500/20 text-blue-400"
              : orderDetails.status === "cancelled"
              ? "bg-red-500/20 text-red-400"
              : "bg-amber-500/20 text-amber-400"
          }`}
        >
          {orderDetails.status.replaceAll("_", " ")}
        </span>
      </div>

      {/* Date */}
      <p className="text-gray-300">
        Placed On:{" "}
        {new Date(orderDetails.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* 🔹 Progress Bar */}
      <div className="flex items-center justify-between mt-3">
        {steps.map((step, index) => {
          const completedBeforeCancel = isCancelled && index < currentStepIndex;
          const isCompleted =
            (!isCancelled && index <= currentStepIndex) ||
            completedBeforeCancel;
          const isCancelStep = isCancelled && index === currentStepIndex;

          return (
            <div
              key={step.key}
              className="flex-1 flex flex-col items-center relative min-h-20 md:min-h-15"
            >
              {/* Circle with icon */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all duration-300
                  ${isCompleted ? "bg-amber-400 text-black" : ""}
                  ${isCancelStep ? "bg-red-500 text-white" : ""}
                  ${
                    !isCompleted && !isCancelStep
                      ? "bg-gray-600 text-gray-300"
                      : ""
                  }
                `}
              >
                {isCancelStep ? cancelledStep.icon : step.icon}
              </div>

              {/* Label */}
              <span className="text-xs mt-1 text-gray-300 text-center">
                {step.label}
              </span>

              {/* Horizontal Line */}
              {index <= steps.length - 1 && (
                <div
                  className={`h-1 w-full absolute bottom-0 ${
                    isCancelled
                      ? index < currentStepIndex
                        ? "bg-amber-400"
                        : "bg-red-500"
                      : index <= currentStepIndex
                      ? "bg-amber-400"
                      : "bg-gray-600"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Metadata */}
      <div className="space-y-1 text-sm text-gray-300">
        <p>
          <span className="font-semibold text-white">Payment Method:</span>{" "}
          {orderDetails.payment.method || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-white">Payment Status:</span>{" "}
          {orderDetails.payment.status || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-white">Shipping Address:</span>{" "}
          {orderDetails.address
            ? `${orderDetails.address.houseDetails}, ${
                orderDetails.address.areaDetails
              }, 
             ${orderDetails.address.city}, ${orderDetails.address.state}, ${
                orderDetails.address.country
              }, 
             ${orderDetails.address.pincode}`
            : "N/A"}
        </p>
      </div>

      {/* Expand / Collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-amber-400 hover:underline"
      >
        {expanded ? (
          <div className="flex items-center">
            <p> Hide Details </p> <ChevronUp />
          </div>
        ) : (
          <div className="flex items-center">
            <p> Show Details </p> <ChevronDown />
          </div>
        )}
      </button>

      {/* Items */}
      {expanded && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orderDetails.items.map((item) => (
            <OrderItemCard key={item._id} itemDetails={item} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <p className="text-lg font-semibold">
          Total:{" "}
          <span className="text-amber-400">${orderDetails.totalAmount}</span>
        </p>

        <div className="flex gap-3">
          {(orderDetails.status === "delivered" ||
            orderDetails.status === "cancelled") && (
            <button
              onClick={() => handleRemoveOrderButton(orderDetails._id)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              Delete Order
            </button>
          )}
          {(orderDetails.status === "delivered" ||
            orderDetails.status === "cancelled") && (
            <button className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 transition">
              Reorder
            </button>
          )}
          <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
            Download Invoice
          </button>

          <button
            disabled={
              orderDetails.status === "delivered" ||
              orderDetails.status === "cancelled"
            }
            onClick={() => handleCancelButton(orderDetails._id)}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition disabled:bg-gray-500 
            disabled:cursor-not-allowed"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
