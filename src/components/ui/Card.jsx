import React from "react";

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white shadow rounded p-4 border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
