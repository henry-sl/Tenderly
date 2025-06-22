// components/Sidebar.jsx
// Optimized responsive sidebar navigation with balanced width management
// Maintains logo visibility and prevents excessive content shifting

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  DocumentTextIcon,
  UserIcon,
  PencilSquareIcon,
  StarIcon,
  QuestionMarkCircleIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Navigation items configuration
  const navigationItems = [
    {
      name: 'Tenders',
      href: '/tenders',
      icon: DocumentTextIcon,
      description: 'Browse available tenders'
    },
    {
      name: 'Profile',
      href: '/company',
      icon: UserIcon,
      description: 'Manage company profile'
    },
    {
      name: 'Proposals',
      href: '/proposals',
      icon: PencilSquareIcon,
      description: 'View and edit proposals'
    },
    {
      name: 'Reputation',
      href: '/reputation',
      icon: StarIcon,
      description: 'Track reputation and proofs'
    },
    {
      name: 'Help',
      href: '/help',
      icon: QuestionMarkCircleIcon,
      description: 'Get help and support'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Cog6ToothIcon,
      description: 'Account settings'
    }
  ];

  // Check if a route is currently active
  const isActiveRoute = (href) => {
    return router.pathname === href || router.pathname.startsWith(href + '/');
  };

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Handle desktop sidebar collapse
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors focus-ring"
        aria-label="Toggle navigation menu"
      >
        {isMobileOpen ? (
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        ) : (
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 sidebar-transition
          ${isCollapsed ? 'w-16' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:relative lg:translate-x-0
        `}
        aria-label="Main navigation"
      >
        {/* Sidebar header with optimized spacing */}
        <div className={`flex items-center border-b border-gray-200 ${isCollapsed ? 'p-3 justify-center' : 'p-4 justify-between'}`}>
          {!isCollapsed && (
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 truncate">TenderHub</span>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base">T</span>
            </div>
          )}

          {/* Desktop collapse button */}
          {!isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-1.5 rounded-md hover:bg-gray-100 transition-colors focus-ring flex-shrink-0"
              aria-label="Collapse sidebar"
            >
              <Bars3Icon className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>

        {/* Expand button for collapsed state */}
        {isCollapsed && (
          <div className="p-2 border-b border-gray-100">
            <button
              onClick={toggleSidebar}
              className="hidden lg:block w-full p-2 rounded-md hover:bg-gray-100 transition-colors focus-ring"
              aria-label="Expand sidebar"
            >
              <Bars3Icon className="h-4 w-4 text-gray-500 mx-auto" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'}`} role="navigation">
          <ul className="space-y-1" role="list">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.href);

              return (
                <li key={item.name} role="listitem" className="relative group">
                  <Link
                    href={item.href}
                    className={`
                      flex items-center text-sm font-medium rounded-lg sidebar-transition focus-ring
                      ${isCollapsed ? 'p-3 justify-center' : 'px-3 py-2.5 justify-start'}
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    onClick={() => setIsMobileOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    title={isCollapsed ? item.name : undefined}
                  >
                    <Icon 
                      className={`
                        flex-shrink-0 sidebar-transition
                        ${isCollapsed ? 'h-5 w-5' : 'h-5 w-5 mr-3'}
                        ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}
                      `}
                      aria-hidden="true"
                    />
                    
                    {!isCollapsed && (
                      <span className="truncate flex-1">{item.name}</span>
                    )}

                    {/* Active indicator */}
                    {isActive && !isCollapsed && (
                      <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" aria-hidden="true" />
                    )}
                  </Link>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="sidebar-tooltip">
                      {item.name}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer with version info */}
        <div className={`border-t border-gray-200 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          {!isCollapsed ? (
            <div className="text-xs text-gray-500 text-center space-y-1">
              <div className="font-medium">TenderHub Pro</div>
              <div>Version 1.0.0</div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-xs font-medium text-gray-600">v1</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}