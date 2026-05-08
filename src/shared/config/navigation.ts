import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  Settings 
} from 'lucide-react';

export const MAIN_NAVIGATION = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'My Tasks', icon: CheckSquare, path: '/tasks' },
  { label: 'Calendar', icon: Calendar, path: '/calendar' },
];

export const SECONDARY_NAVIGATION = [
  { label: 'Settings', icon: Settings, path: '/settings' },
];