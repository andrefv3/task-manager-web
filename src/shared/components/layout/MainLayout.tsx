import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full bg-[#ffffff]">
      {/* SIDEBAR (Desktop: Visible | Mobile: Hidden) */}
      <aside className="hidden md:flex md:w-72 flex-col  shrink-0">
        <Sidebar />
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 h-full overflow-y-auto bg-[#ffffff]">
        <div className="w-full h-full bg-[#ECF1F7] border-transparent border md:rounded-tl-[3.5rem] md:rounded-bl-[3.5rem] mx-auto p-4 md:p-10 lg:p-16 pb-32 md:pb-16">
          {children}
        </div>

        {/* NAV INFERIOR (Mobile: Visible | Desktop: Hidden) */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-slate-100 z-50">
          <MobileNav />
        </nav>
      </main>
    </div>
  );
};