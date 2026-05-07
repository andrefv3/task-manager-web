import { useAuthStore } from '@/features/auth';

export const WelcomeMessage = () => {
  const user = useAuthStore((s) => s.user);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Hello';
    return 'Good Evening';
  };

  // Logic Pro: Build the full name by removing extra spaces if the last name is missing
  const fullName = `${user?.name || ''} ${user?.lastName || ''}`.trim();

  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-sm font-medium tracking-wide leading-none mb-1">
        {getGreeting()},
      </span>
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
        {fullName || 'User'}
      </h1>
    </div>
  );
};