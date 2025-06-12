import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FileText, 
  User, 
  Edit3, 
  Star, 
  HelpCircle, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

/**
 * Collapsible sidebar navigation with main menu items
 */
const Sidebar: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const menuItems = [
    { icon: FileText, label: 'Tenders', path: '/tenders' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Edit3, label: 'Proposals', path: '/proposals/edit/1' },
    { icon: Star, label: 'Reputation', path: '/reputation' },
    { icon: HelpCircle, label: 'Help', path: '/help' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 transform transition-all duration-300 bg-white border-r border-gray-200 ${
        state.sidebarCollapsed ? 'w-16' : 'w-64'
      } lg:translate-x-0 ${
        state.sidebarCollapsed ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
      role="complementary"
      aria-label="Sidebar navigation"
    >
      <div className="flex flex-col h-full">
        {/* Toggle button */}
        <div className="flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={state.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {state.sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 px-4 py-6 space-y-2" role="navigation" aria-label="Sidebar menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }
                ${state.sidebarCollapsed ? 'justify-center' : ''}
              `}
              title={state.sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className={`h-5 w-5 ${state.sidebarCollapsed ? '' : 'mr-3'}`} />
              {!state.sidebarCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer info */}
        {!state.sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              <p>TenderHub Pro</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;