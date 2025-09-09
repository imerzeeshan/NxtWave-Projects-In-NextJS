// components/orders/OrderDetails.jsx
"use client";

import React, { useState } from "react";
import OrderItemCard from "./OrderItemCard";
import { ChevronDown, ChevronUp } from "lucide-react";

const OrderDetails = ({ orderDetails }) => {
  const [expanded, setExpanded] = useState(false);

  // 🔹 Define the possible steps
  const steps = ["pending", "shipped", "out_for_delivery", "delivered"];

  // 🔹 Find the current step index
  const currentStepIndex = steps.indexOf(orderDetails.status);

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          Order #{orderDetails._id.slice(-6)}
        </h2>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            orderDetails.status === "delivered"
              ? "bg-green-500/20 text-green-400"
              : orderDetails.status === "pending"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
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

      {/* 🔹 Status Progress Bar */}
      <div className="flex items-center justify-between mt-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Circle */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                index <= currentStepIndex
                  ? "bg-amber-400 text-black"
                  : "bg-gray-600 text-gray-300"
              }`}
            >
              {index + 1}
            </div>
            {/* Label */}
            <span className="text-xs mt-1 text-gray-300 capitalize">
              {step.replaceAll("_", " ")}
            </span>
            {/* Line */}
            {index < steps.length - 1 && (
              <div
                className={`h-1 w-full ${
                  index < currentStepIndex ? "bg-amber-400" : "bg-gray-600"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Metadata */}
      <div className="space-y-1 text-sm text-gray-300">
        <p>
          <span className="font-semibold text-white">Payment Method:</span>{" "}
          {orderDetails.paymentMethod || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-white">Payment Status:</span>{" "}
          {orderDetails.paymentStatus || "N/A"}
        </p>
        <p>
          <span className="font-semibold text-white">Shipping Address:</span>{" "}
          {orderDetails.shippingAddress
            ? `${orderDetails.shippingAddress.street}, ${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`
            : "N/A"}
        </p>
      </div>

      {/* Expand / Collapse Toggle */}
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

      {/* Items (Collapsible) */}
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

        {/* Actions */}
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
            Track Order
          </button>
          <button className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 transition">
            Reorder
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition">
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
