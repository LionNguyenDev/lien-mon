'use client';

import { HeroBackdrop } from '@/components/journey/hero-backdrop';
import { LandmarkArt } from '@/components/journey/landmark-art';
import { Icon } from '@/components/ui/icons';
import { LOCATIONS } from '@/data/locations';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { type PointerEvent, type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

const INTERVAL = 5500;
// Chiều cao dải giấy dưới ảnh (ghi tên địa điểm) và viền khung, dùng để tính cỡ ảnh vừa khung.
const CAPTION_HEIGHT = 64;
const FRAME_PADDING = 10;

type Slide = { key: string; title: string; label: string; image?: { src: string; alt: string } };

const SLIDES: Slide[] = [
  {
    key: 'city',
    title: 'TP. Hồ Chí Minh',
    label: 'HÀNH TRÌNH DI SẢN',
    image: {
      src: '/images/dinh-doc-lap/toan-canh.jpg',
      alt: 'Toàn cảnh trung tâm TP. Hồ Chí Minh nhìn từ trên cao, Dinh Độc Lập giữa mảng cây xanh',
    },
  },
  ...LOCATIONS.map((location) => ({
    key: location.id,
    title: location.name,
    label: location.label,
    image: location.images?.[0],
  })),
];

/**
 * Ảnh đặt trong khung bưu thiếp, giữ nguyên tỉ lệ nên không bị cắt mất chữ hay biển hiệu trong ảnh.
 * Khung co theo tỉ lệ thật của ảnh (đọc khi ảnh tải xong) và vừa vùng chứa nhờ đơn vị container query.
 */
function PostcardFrame({ slide, index, active }: { slide: Slide; index: number; active: boolean }) {
  const [ratio, setRatio] = useState(4 / 3);
  const readRatio = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth) setRatio(img.naturalWidth / img.naturalHeight);
  };
  const width = `min(100cqw, calc((100cqh - ${CAPTION_HEIGHT + FRAME_PADDING}px) * ${ratio} + ${FRAME_PADDING * 2}px))`;

  return (
    <div
      className={cn(
        'rounded-sm bg-paper-light shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-black/10',
        index % 2 === 0 ? '-rotate-1' : 'rotate-1',
        active && 'motion-safe:animate-postcard-in'
      )}
      style={{ width, padding: `${FRAME_PADDING}px ${FRAME_PADDING}px 0` }}
    >
      <div className='relative overflow-hidden bg-navy-dark' style={{ aspectRatio: ratio }}>
        {slide.image ? (
          <img
            ref={readRatio}
            src={slide.image.src}
            alt={slide.image.alt}
            onLoad={(e) => readRatio(e.currentTarget)}
            className='absolute inset-0 h-full w-full object-cover'
          />
        ) : (
          <LandmarkArt id={slide.key} className='absolute inset-0 h-full w-full' />
        )}
      </div>
      <div className='flex flex-col justify-center px-1' style={{ height: CAPTION_HEIGHT }}>
        <span className='font-semibold text-[10px] text-brick uppercase tracking-[0.22em] sm:text-[11px]'>
          {String(index + 1).padStart(2, '0')}/{String(SLIDES.length).padStart(2, '0')} · {slide.label}
        </span>
        <span className='truncate font-bold font-display text-base text-navy sm:text-lg'>{slide.title}</span>
      </div>
    </div>
  );
}

/**
 * Trang bắt đầu dạng chia đôi: `children` (tiêu đề, nút bắt đầu) nằm trên nền riêng,
 * ảnh các địa điểm tự chuyển ở phần còn lại nên chữ không bao giờ che ảnh.
 * Có nút trước/sau, chấm chọn ảnh, tạm dừng; vuốt ngang trên vùng ảnh để đổi ảnh.
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
    <div className='flex min-h-[100svh] flex-col bg-navy-deep lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]'>
      <section
        aria-roledescription='carousel'
        aria-label='Hình ảnh các địa điểm di sản'
        className='relative flex h-[50svh] min-h-[340px] touch-pan-y flex-col overflow-hidden sm:h-[56svh] lg:order-last lg:h-auto lg:min-h-[100svh]'
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
        onMouseEnter={() => setInteracting(true)}
        onMouseLeave={() => setInteracting(false)}
        onFocus={() => setInteracting(true)}
        onBlur={() => setInteracting(false)}
      >
        {/* Nền: chính ảnh đang hiện, làm mờ và tối đi */}
        {SLIDES.map((slide, i) => (
          <div
            key={`bg-${slide.key}`}
            aria-hidden='true'
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-out',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          >
            {slide.image ? (
              <img src={slide.image.src} alt='' className='h-full w-full scale-110 object-cover blur-2xl' />
            ) : (
              <HeroBackdrop />
            )}
          </div>
        ))}
        <div className='absolute inset-0 bg-navy-deep/55' />

        <div className='relative flex-1'>
          {SLIDES.map((slide, i) => (
            <div
              key={slide.key}
              role='group'
              aria-roledescription='slide'
              aria-label={`${i + 1} / ${SLIDES.length}: ${slide.title}`}
              aria-hidden={i !== index}
              className={cn(
                'absolute inset-0 grid place-items-center px-6 pt-8 pb-2 transition-opacity duration-700 ease-out [container-type:size] sm:px-10 lg:px-14 lg:pt-14',
                i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
              )}
            >
              <PostcardFrame slide={slide} index={i} active={i === index} />
            </div>
          ))}
        </div>

        {/* Thanh điều khiển */}
        <div className='relative flex items-center justify-center gap-1 pt-1 pb-3 lg:pb-8'>
          <p className='sr-only' aria-live={playing ? 'off' : 'polite'}>
            Ảnh {index + 1}/{SLIDES.length}: {current.title}
          </p>
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
      </section>

      <div className='relative isolate flex flex-1 flex-col'>
        <div className='-z-10 absolute inset-0 opacity-70'>
          <HeroBackdrop />
        </div>
        {children}
      </div>
    </div>
  );
}
