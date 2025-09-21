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
} from "lucide-react";

const OrderDetails = ({ orderDetails }) => {
  const [expanded, setExpanded] = useState(false);

  const steps = [
    "pending",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
  ];

  const stepIcons = {
    pending: <Clock size={16} />,
    processing: <Check size={16} />,
    shipped: <Truck size={16} />,
    out_for_delivery: <MapPin size={16} />,
    delivered: <Check size={16} />,
    cancelled: <XCircle size={18} />,
  };

  // Determine the current step index
  const currentStepIndex = steps.indexOf(
    orderDetails.status === "cancelled"
      ? orderDetails.cancelledAtStep || "shipped"
      : orderDetails.status
  );

  const isCancelled = orderDetails.status === "cancelled";

  const renderProgressBar = () => {
    return (
      <div className="flex items-center justify-between mt-6 relative">
        {steps.map((step, index) => {
          const completedBeforeCancel = isCancelled && index < currentStepIndex;
          const isCompleted =
            (!isCancelled && index < currentStepIndex) || completedBeforeCancel;
          const isActive = index === currentStepIndex && !isCancelled;
          const isCancelStep = isCancelled && index === currentStepIndex;

          return (
            <div
              key={step}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Horizontal Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 left-1/2 w-full h-2 -z-10 transform -translate-x-1/2">
                  <div
                    className={`h-2 w-full rounded-full transition-all duration-500`}
                    style={{
                      background: isCancelled
                        ? index < currentStepIndex
                          ? "linear-gradient(to right, #facc15, #f59e0b)" // previous steps amber gradient
                          : "linear-gradient(to right, red, red)" // cancelled steps red
                        : index < currentStepIndex
                        ? "linear-gradient(to right, #facc15, #f59e0b)" // regular completed
                        : "linear-gradient(to right, #4b5563, #4b5563)", // gray
                    }}
                  />
                </div>
              )}

              {/* Circle with icon */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-500
                  ${isCompleted ? "bg-amber-400 text-black" : ""}
                  ${
                    isActive
                      ? "bg-yellow-400 text-black ring-4 ring-yellow-200 animate-pulse"
                      : ""
                  }
                  ${isCancelStep ? "bg-red-500 text-white" : ""}
                  ${
                    !isCompleted && !isActive && !isCancelStep
                      ? "bg-gray-600 text-gray-300"
                      : ""
                  }
                `}
              >
                {isCancelStep ? stepIcons.cancelled : stepIcons[step]}
              </div>

              {/* Label */}
              <span className="text-xs mt-2 text-gray-300 text-center">
                {step.replaceAll("_", " ")}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

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

      {/* Progress Bar */}
      {renderProgressBar()}

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
