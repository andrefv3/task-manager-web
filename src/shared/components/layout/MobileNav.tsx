import { useState } from 'react';
import { CreateTaskModal } from '@/features/tasks/components/CreateTaskModal';
import { LayoutGrid, CalendarDays, ClipboardCheck, UserCircle2, Plus } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export const MobileNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    { id: 'dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 'tasks', icon: ClipboardCheck, path: '/tasks' },
    { id: 'calendar', icon: CalendarDays, path: '/calendar' },
    { id: 'profile', icon: UserCircle2, path: '/profile' },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-6 pb-8">
        <div className="relative bg-white/95 backdrop-blur-xl border border-slate-200/60 rounded-4xl h-20 shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-between px-2">
          
          {/* Lado Izquierdo */}
          <div className="flex flex-1 justify-around items-center h-full">
            {navItems.slice(0, 2).map((item) => {
              const Icon = item.icon;
              // Si estamos en la raíz o /dashboard, marcamos Dashboard como activo
              const isActive = pathname === item.path || (item.id === 'dashboard' && pathname === '/');
              
              return (
                <button 
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-300 active:scale-90"
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? 'text-indigo-600 stroke-[2.5]' : 'text-slate-400 stroke-2'
                    }`} 
                  />
                  
                  {/* Indicador de Selección Animado */}
                  <div className={`absolute bottom-3 w-1.5 h-1.5 rounded-full transition-all duration-300 transform ${
                    isActive ? 'bg-indigo-600 scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Espacio Central (FAB) */}
          <div className="relative w-20 flex justify-center h-full">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute -top-7 w-16 h-16 bg-indigo-600 rounded-full shadow-[0_12px_24px_rgba(79,70,229,0.4)] border-[6px] border-white flex items-center justify-center text-white transition-all active:scale-95 hover:bg-indigo-500"
            >
              <Plus className="w-8 h-8 stroke-3" />
            </button>
          </div>

          {/* Lado Derecho */}
          <div className="flex flex-1 justify-around items-center h-full">
            {navItems.slice(2).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <button 
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center justify-center w-full h-full transition-all duration-300 active:scale-90"
                >
                  <Icon 
                    className={`w-6 h-6 transition-colors duration-300 ${
                      isActive ? 'text-indigo-600 stroke-[2.5]' : 'text-slate-400 stroke-2'
                    }`} 
                  />
                  
                  {/* Indicador de Selección Animado */}
                  <div className={`absolute bottom-3 w-1.5 h-1.5 rounded-full transition-all duration-300 transform ${
                    isActive ? 'bg-indigo-600 scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
                  }`} />
                </button>
              );
            })}
          </div>

        </div>
      </nav>

      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};