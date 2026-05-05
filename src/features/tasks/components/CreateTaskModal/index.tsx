import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Slider } from '@/shared/components/ui';
import { Modal } from '@/shared/components/ui';
import type { Priority } from '@/shared/types';

export const CreateTaskModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const addTask = useTaskStore((state) => state.addTask);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    impact: 5,
    effort: 5,
    priority: 'MEDIUM' as Priority
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTask({
      ...formData,
      status: 'PENDING',
      dueDate: null,
    });
    onClose(); // Close after saving
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
            <input 
              required
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* Sliders of Impact vs Effort */}
          <div className="space-y-8 py-4">
            <Slider 
              label="Impact (How much value does it provide?)" 
              min={1} max={10} 
              value={formData.impact}
              onChange={(val) => setFormData({...formData, impact: val})}
            />
            <Slider 
              label="Effort (How difficult is it?)" 
              min={1} max={10} 
              value={formData.effort}
              onChange={(val) => setFormData({...formData, effort: val})}
            />
          </div>

          {/* Score Visual (Staff level detail) */}
          <div className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-xl flex justify-between items-center">
            <span className="text-purple-300 text-sm font-medium">Calculated Priority:</span>
            <span className="text-2xl font-bold text-purple-400">
              {(formData.impact / formData.effort).toFixed(2)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg transition-all transform active:scale-95"
            >
              Create Task
            </button>
          </div>
        </form>
    </Modal>
  );
};