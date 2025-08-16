import React from "react";

export default function Footer() {
  return (
<footer className="bg-white border-t border-gray-200 py-8 mt-12">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
    <div></div>

    <p className="text-sm md:text-base text-gray-600 text-center">
      © {new Date().getFullYear()} Your Company. All rights reserved.
    </p>

    <div className="flex justify-end space-x-8">
      <a
        href="#"
        className="text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors"
      >
        Privacy Policy
      </a>
      <a
        href="#"
        className="text-sm md:text-base text-gray-600 hover:text-blue-600 transition-colors"
      >
        Terms of Service
      </a>
    </div>
  </div>
</footer>

  );
}
