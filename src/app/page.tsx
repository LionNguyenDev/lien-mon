'use client';

import { HeroCarousel } from '@/components/journey/hero-carousel';
import { buttonClass } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { JOURNEY, TOTAL_LOCATIONS } from '@/data/locations';
import { useJourney } from '@/hooks/use-journey';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

export default function StartPage() {
  const { exploredCount } = useJourney();

  return (
    <main className='relative isolate overflow-hidden text-paper'>
      <HeroCarousel>
        <div className='mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 pt-16 pb-[34vh] text-center sm:px-6 sm:pb-[28vh]'>
          <p className='flex animate-fade-up items-center gap-3 font-semibold text-brass-light text-xs uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.3em]'>
            <span className='hidden h-px w-8 bg-brass-light/60 sm:block' />
            TP. Hồ Chí Minh · {TOTAL_LOCATIONS} điểm di sản
            <span className='hidden h-px w-8 bg-brass-light/60 sm:block' />
          </p>

          <h1
            className='mt-5 animate-fade-up font-display font-extrabold text-[2.75rem] leading-[1.02] tracking-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:text-7xl md:text-8xl'
            style={{ animationDelay: '120ms' }}
          >
            HÀNH TRÌNH
            <span className='block text-brass-light'>KHÁM PHÁ</span>
          </h1>

          <p
            className='mt-5 max-w-xl animate-fade-up text-base text-paper/90 leading-relaxed sm:text-xl'
            style={{ animationDelay: '240ms' }}
          >
            {JOURNEY.subtitle}
          </p>

          <div
            className='mt-9 flex w-full animate-fade-up flex-col items-center gap-3 sm:w-auto sm:flex-row'
            style={{ animationDelay: '360ms' }}
          >
            <Link href={ROUTES.MAP} className={buttonClass('primary', 'lg', 'w-full sm:w-auto')}>
              <Icon.compass size={22} />
              {exploredCount > 0 ? 'Tiếp tục hành trình' : 'Bắt đầu hành trình'}
              <Icon.arrowRight size={20} />
            </Link>
            {exploredCount > 0 && (
              <p className='text-paper/80 text-sm'>
                Bạn đã khám phá {exploredCount}/{TOTAL_LOCATIONS} địa điểm
              </p>
            )}
          </div>
        </div>

        <footer className='relative px-4 pb-5 text-center text-paper/70 text-xs sm:text-sm'>
          Dự án liên môn · {JOURNEY.project}
        </footer>
      </HeroCarousel>
    </main>
  );
}
