export const MobileNav = () => {
  return (
    <div className="flex items-center justify-around h-full w-full relative">
      {/* Home Button */}
      <button className="flex flex-col items-center gap-1 text-indigo-600">
        <div className="p-2 bg-indigo-50 rounded-xl">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </div>
      </button>

      {/* Calendar Button */}
      <button className="flex flex-col items-center gap-1 text-slate-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Add Button */}
      <div className="relative">
        <button className="absolute -top-14 left-1/2 -translate-x-1/2 w-16 h-16 bg-indigo-600 rounded-full shadow-xl shadow-indigo-300 border-4 border-white flex items-center justify-center text-white text-3xl font-light">
          +
        </button>
      </div>

      {/* Document Button */}
      <button className="flex flex-col items-center gap-1 text-slate-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </button>

      {/* Profile Button */}
      <button className="flex flex-col items-center gap-1 text-slate-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </button>
    </div>
  );
};