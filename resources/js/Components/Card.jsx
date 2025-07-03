// resources/js/Components/Card.jsx

import React from "react";

export default function Card({ title, children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md space-y-4 ${className}`}>
      {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>}
      {children}
    </div>
  );
}
