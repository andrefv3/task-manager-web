import type { Task } from "@/shared/types";

interface Props {
  task: Task;
}

export const TaskItem = ({ task }: Props) => {
  // Logic for dynamic icon color based on project type (example)
  const isOffice = task.title.toLowerCase().includes('office');
  
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Icon Container with dynamic color */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          isOffice ? 'bg-pink-50 text-pink-500' : 'bg-orange-50 text-orange-500'
        }`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="flex flex-col">
          <h4 className="font-bold text-slate-800 text-sm">{task.title}</h4>
          <span className="text-gray-400 text-xs">
            {task.description || 'No description'}
          </span>
        </div>
      </div>

      {/* Action Button or Arrow Indicator */}
      <button className="text-gray-300 hover:text-indigo-600 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};