import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAppContext } from '../../context/AppContext';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that provides the overall structure for the application
 * Includes navigation, sidebar, main content area, and footer
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { state } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>
      
      <Navigation />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main 
          id="main-content"
          className={`flex-1 transition-all duration-300 ${
            state.sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          }`}
          role="main"
          aria-label="Main content"
        >
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;