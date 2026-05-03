import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Plus
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { useAuthStore } from '@/features/auth/store/authStore'; 
import { useNavigate, useLocation } from 'react-router-dom';

const mainNavigation = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Tasks', icon: CheckSquare, path: '/tasks' },
  { label: 'Calendar', icon: Calendar, path: '/calendar' },
];

const secondaryNavigation = [
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.actions.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="flex flex-col h-full bg-white px-6 pb-6 ">
      {/* Logo Area */}
      <div className="flex h-20 shrink-0 items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-sm">
          <CheckSquare size={18} strokeWidth={3} />
        </div>
        <span className="text-xl font-black tracking-tight text-slate-900">Task Manager</span>
      </div>
      
      <div className="mb-8">
        <button 
          onClick={() => console.log('Open Modal')} // Modal
          className="group w-full flex items-center justify-center gap-x-2 cursor-pointer rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all active:scale-95"
        >
          <Plus className="h-5 w-5" />
          <span>New Task</span>
        </button>
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-8">
          {/* Principal Navigation */}
          <li>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
              Management
            </div>
            <ul role="list" className="-mx-2 space-y-1">
              {mainNavigation.map((item) => (
                <li key={item.label}>
                  <SidebarItem 
                    {...item} 
                    active={pathname === item.path} 
                    onClick={() => navigate(item.path)}
                  />
                </li>
              ))}
            </ul>
          </li>

          {/* Configuration */}
          <li>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">
              System
            </div>
            <ul role="list" className="-mx-2 space-y-1">
              {secondaryNavigation.map((item) => (
                <li key={item.label}>
                  <SidebarItem 
                    {...item} 
                    active={pathname === item.path} 
                    onClick={() => navigate(item.path)}
                  />
                </li>
              ))}
            </ul>
          </li>

          {/* User & Logout Section */}
          <li className="mt-auto -mx-2 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-x-3 px-2 py-3 mb-2">
              <img
                className="h-9 w-9 rounded-full bg-gray-50 border border-gray-200"
                src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=6366f1&color=fff`}
                alt="Profile"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name || 'Andres Vega'}
                </span>
                <span className="text-xs text-gray-500 truncate">Free Plan</span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="group w-full flex cursor-pointer gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-6 w-6 shrink-0 text-red-400 group-hover:text-red-600" />
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};