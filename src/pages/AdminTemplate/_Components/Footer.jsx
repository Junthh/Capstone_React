import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a
            href="#"
            className="hover:text-white transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors text-sm"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
