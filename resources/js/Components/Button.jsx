// resources/js/Components/Button.jsx

import React from "react";

export function Button({ children, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-md font-semibold text-white bg-primary-600 hover:bg-primary-700 transition disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
