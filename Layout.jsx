// components/Layout.jsx
// Optimized layout component with balanced content distribution
// Prevents excessive rightward shifting and maintains proper spacing

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ToastContainer from './ToastContainer';

export default function Layout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      {/* Main Content Area with optimized spacing */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Main content with responsive padding and max-width constraints */}
        <main className={`
          flex-1 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
          px-4 py-6 lg:px-8 lg:py-8
          max-w-none
        `}>
          {/* Content wrapper with balanced margins */}
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
        
        {/* Footer with consistent spacing */}
        <footer className={`
          bg-white border-t border-gray-200 mt-auto transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
        `}>
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition focus-ring rounded-md px-2 py-1"
              >
                <span className="text-sm">Built on</span>
                <div className="bg-black text-white px-2 py-1 rounded text-xs font-bold">
                  BOLT
                </div>
              </a>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Toast notification container */}
      <ToastContainer />
    </div>
  );
}