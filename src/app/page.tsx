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
    <main className='relative overflow-hidden text-paper'>
      <HeroCarousel>
        <div className='mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center px-4 pt-8 pb-10 text-center sm:px-6 lg:max-w-none lg:items-start lg:px-12 lg:py-16 lg:text-left xl:px-16'>
          <p className='flex animate-fade-up items-center gap-3 font-semibold text-brass-light text-xs uppercase tracking-[0.2em] sm:text-sm sm:tracking-[0.3em]'>
            <span className='hidden h-px w-8 bg-brass-light/60 sm:block' />
            TP. Hồ Chí Minh · Di sản văn hoá
            <span className='hidden h-px w-8 bg-brass-light/60 sm:block lg:hidden' />
          </p>

          <h1
            className='mt-4 animate-fade-up font-display font-extrabold text-[2.6rem] leading-[1.02] tracking-tight sm:text-7xl lg:mt-6 lg:text-[min(5vw,6rem)]'
            style={{ animationDelay: '120ms' }}
          >
            <span className='block whitespace-nowrap'>HÀNH TRÌNH</span>
            <span className='block whitespace-nowrap text-pastel'>KHÁM PHÁ</span>
          </h1>

          <p
            className='mt-4 max-w-md animate-fade-up text-base text-paper/85 leading-relaxed sm:text-xl lg:mt-6'
            style={{ animationDelay: '240ms' }}
          >
            {JOURNEY.subtitle}
          </p>

          <div
            className='mt-7 flex w-full animate-fade-up flex-col items-center gap-3 sm:w-auto sm:flex-row lg:mt-10'
            style={{ animationDelay: '360ms' }}
          >
            <Link
              href={ROUTES.MAP}
              className={buttonClass('primary', 'lg', 'w-full bg-pastel text-navy hover:bg-white sm:w-auto')}
            >
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

        <footer className='flex items-center justify-center gap-3 px-4 pb-5 text-center font-semibold text-brass-light text-sm tracking-wide sm:text-base lg:justify-start lg:px-12 lg:pb-8 lg:text-left lg:text-lg xl:px-16'>
          <span className='hidden h-px w-8 shrink-0 bg-brass-light/60 sm:block' />
          {JOURNEY.project}
        </footer>
      </HeroCarousel>
    </main>
  );
}
