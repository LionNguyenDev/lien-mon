'use client';

import { Icon } from '@/components/ui/icons';
import { type ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

type ToastContextValue = { showToast: (message: string) => void };

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const showToast = useCallback((message: string) => {
    clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live='polite'
        role='status'
        className='pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6'
      >
        {toast && (
          <div
            key={toast.id}
            className='pointer-events-auto flex max-w-md animate-fade-up items-center gap-3 rounded-2xl border border-brass/50 bg-navy px-4 py-3 text-paper-light shadow-lift'
          >
            <span className='grid size-8 shrink-0 place-items-center rounded-full bg-brass text-navy-deep'>
              <Icon.check size={18} strokeWidth={3} />
            </span>
            <p className='font-medium text-sm'>{toast.message}</p>
            <button
              type='button'
              onClick={() => setToast(null)}
              className='-mr-1 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-paper/80 hover:bg-white/10 hover:text-paper'
              aria-label='Đóng thông báo'
            >
              <Icon.close size={18} />
            </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
