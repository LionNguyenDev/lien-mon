'use client';

import { buttonClass } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className='paper-texture flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <h1 className='font-bold font-display text-3xl text-navy'>Đã có lỗi xảy ra</h1>
      <p className='mt-2 text-muted'>Vui lòng thử lại.</p>
      <button type='button' onClick={() => reset()} className={buttonClass('primary', 'md', 'mt-6')}>
        Thử lại
      </button>
    </main>
  );
}
