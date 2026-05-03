import { useAuthStore } from '@/features/auth/store/authStore';

export const WelcomeMessage = () => {
  const user = useAuthStore((s) => s.user);

  // Logic Pro: Dynamic greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Hello';
    return 'Good Evening';
  };

  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-sm font-medium tracking-wide leading-none mb-1">
        {getGreeting()}!
      </span>
      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
        {user?.name} {user?.lastName}
      </h1>
    </div>
  );
};