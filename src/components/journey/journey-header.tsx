'use client';

import { buttonClass } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';
import { useJourney } from '@/hooks/use-journey';
import { ROUTES } from '@/lib/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export function ProgressMeter({ className }: { className?: string }) {
  const { exploredCount, total } = useJourney();
  const percent = Math.round((exploredCount / total) * 100);

  return (
    <div className={cn('min-w-0 flex-1', className)}>
      <p className='flex items-baseline justify-between gap-2 text-sm'>
        <span className='font-medium text-muted'>
          Đã khám phá{' '}
          <strong className='font-bold font-display text-lg text-navy'>
            {exploredCount}/{total}
          </strong>{' '}
          địa điểm
        </span>
        <span className='font-semibold text-brass-dark text-xs tabular-nums'>{percent}%</span>
      </p>
      <div
        role='progressbar'
        aria-label='Tiến độ hành trình'
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={exploredCount}
        className='mt-1.5 h-2.5 overflow-hidden rounded-full bg-paper-dark ring-1 ring-paper-edge'
      >
        <div
          className='h-full rounded-full bg-gradient-to-r from-brass to-brick transition-[width] duration-500 ease-out'
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function ResetButton() {
  const { reset, exploredCount } = useJourney();
  const { showToast } = useToast();
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className='flex items-center gap-1 rounded-xl border border-brick/40 bg-white/70 p-1' role='group'>
        <span className='px-2 font-medium text-brick-dark text-xs'>Xóa toàn bộ tiến độ?</span>
        <button
          type='button'
          className={buttonClass('primary', 'sm', 'px-3 normal-case tracking-normal')}
          onClick={() => {
            reset();
            setConfirming(false);
            showToast('Đã làm lại hành trình từ đầu.');
          }}
        >
          Xóa
        </button>
        <button
          type='button'
          className={buttonClass('ghost', 'sm', 'normal-case tracking-normal')}
          onClick={() => setConfirming(false)}
        >
          Hủy
        </button>
      </div>
    );
  }

  return (
    <button
      type='button'
      onClick={() => setConfirming(true)}
      disabled={exploredCount === 0}
      className={buttonClass('ghost', 'sm', 'text-muted normal-case tracking-normal')}
    >
      <Icon.rotate size={16} />
      Làm lại từ đầu
    </button>
  );
}

export function JourneyHeader({ showReset = false }: { showReset?: boolean }) {
  return (
    <header className='sticky top-0 z-30 border-paper-edge border-b bg-paper/90 backdrop-blur-md'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6'>
        <Link
          href={ROUTES.HOME}
          className='flex min-h-11 cursor-pointer items-center gap-2 rounded-lg font-bold font-display text-navy'
        >
          <span className='grid size-9 place-items-center rounded-full bg-navy text-brass-light'>
            <Icon.compass size={20} />
          </span>
          <span className='leading-tight'>
            Hành trình
            <span className='block font-sans font-semibold text-[10px] text-brick uppercase tracking-[0.2em]'>
              khám phá TP.HCM
            </span>
          </span>
        </Link>
        <ProgressMeter className='order-last basis-full sm:order-none sm:basis-auto' />
        {showReset && (
          <div className='ml-auto sm:ml-0'>
            <ResetButton />
          </div>
        )}
      </div>
    </header>
  );
}
