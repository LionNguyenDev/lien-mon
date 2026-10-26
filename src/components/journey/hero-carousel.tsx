'use client';

import { HeroBackdrop } from '@/components/journey/hero-backdrop';
import { LandmarkArt } from '@/components/journey/landmark-art';
import { Icon } from '@/components/ui/icons';
import { LOCATIONS } from '@/data/locations';
import { cn } from '@/lib/utils';
import { type PointerEvent, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const INTERVAL = 5500;

type Slide = { key: string; title: string; label: string; image?: string; imageAlt: string };

const SLIDES: Slide[] = [
  { key: 'city', title: 'TP. Hồ Chí Minh', label: 'HÀNH TRÌNH DI SẢN', imageAlt: 'Đường chân trời TP. Hồ Chí Minh' },
  ...LOCATIONS.map((location) => ({
    key: location.id,
    title: location.name,
    label: location.label,
    image: location.image,
    imageAlt: location.imageAlt,
  })),
];

function SlideArt({ slide }: { slide: Slide }) {
  if (slide.image) {
    return <img src={slide.image} alt='' className='h-full w-full object-cover' />;
  }
  if (slide.key === 'city') return <HeroBackdrop />;
  return <LandmarkArt id={slide.key} className='h-full w-full' />;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Nền trang bắt đầu: ảnh các địa điểm tự chuyển, có nút trước/sau, chấm chọn ảnh và tạm dừng.
 * `children` là nội dung hiển thị phía trên ảnh; vuốt ngang ở bất kỳ đâu trên màn hình đều đổi ảnh.
 */
export function HeroCarousel({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const [interacting, setInteracting] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const go = useCallback((next: number) => setIndex((next + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (!playing || interacting) return;
    const timer = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(timer);
  }, [playing, interacting, index, go]);

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const delta = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(delta) > 40) go(index + (delta < 0 ? 1 : -1));
  };

  const current = SLIDES[index];

  return (
    <div
      className='relative flex min-h-[100svh] touch-pan-y flex-col'
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        swipeStart.current = null;
      }}
    >
      <section aria-roledescription='carousel' aria-label='Hình ảnh các địa điểm di sản' className='absolute inset-0'>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.key}
            role='group'
            aria-roledescription='slide'
            aria-label={`${i + 1} / ${SLIDES.length}: ${slide.title}`}
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-out',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            {/* key đổi theo index để hiệu ứng zoom chậm chạy lại mỗi lần ảnh xuất hiện */}
            <div
              key={i === index ? `active-${index}` : 'idle'}
              className={cn('h-full w-full', i === index && 'motion-safe:animate-ken-burns')}
            >
              <SlideArt slide={slide} />
            </div>
          </div>
        ))}

        <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/45 to-navy-deep/40' />

        {/* Thanh điều khiển */}
        <div
          className='absolute inset-x-0 bottom-20 z-20 px-4 sm:bottom-14 sm:px-6'
          onMouseEnter={() => setInteracting(true)}
          onMouseLeave={() => setInteracting(false)}
          onFocus={() => setInteracting(true)}
          onBlur={() => setInteracting(false)}
        >
          <div className='mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between'>
            <p aria-live={playing ? 'off' : 'polite'} className='text-center sm:text-left'>
              <span className='block font-semibold text-[11px] text-brass-light uppercase tracking-[0.2em]'>
                {String(index + 1).padStart(2, '0')}/{String(SLIDES.length).padStart(2, '0')} · {current.label}
              </span>
              <span className='font-bold font-display text-lg text-paper'>{current.title}</span>
            </p>

            <div className='flex items-center gap-1'>
              <button
                type='button'
                onClick={() => go(index - 1)}
                aria-label='Ảnh trước'
                className='grid size-11 cursor-pointer place-items-center rounded-full text-paper transition-colors hover:bg-paper/15'
              >
                <Icon.arrowLeft size={20} />
              </button>
              <div className='flex items-center'>
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.key}
                    type='button'
                    onClick={() => go(i)}
                    aria-label={`Xem ảnh ${i + 1}: ${slide.title}`}
                    aria-current={i === index}
                    className='group grid h-11 w-6 cursor-pointer place-items-center'
                  >
                    <span
                      className={cn(
                        'block h-2 rounded-full transition-all duration-300',
                        i === index ? 'w-5 bg-brass-light' : 'w-2 bg-paper/50 group-hover:bg-paper'
                      )}
                    />
                  </button>
                ))}
              </div>
              <button
                type='button'
                onClick={() => go(index + 1)}
                aria-label='Ảnh tiếp theo'
                className='grid size-11 cursor-pointer place-items-center rounded-full text-paper transition-colors hover:bg-paper/15'
              >
                <Icon.arrowRight size={20} />
              </button>
              <button
                type='button'
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? 'Tạm dừng tự chuyển ảnh' : 'Tiếp tục tự chuyển ảnh'}
                className='ml-1 grid size-11 cursor-pointer place-items-center rounded-full border border-paper/40 text-paper transition-colors hover:bg-paper/15'
              >
                {playing ? <Icon.pause size={18} /> : <Icon.play size={18} />}
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='relative z-10 flex flex-1 flex-col'>{children}</div>
    </div>
  );
}
