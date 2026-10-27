'use client';

import { LandmarkArt } from '@/components/journey/landmark-art';
import { Icon } from '@/components/ui/icons';
import type { JourneyLocation } from '@/data/locations';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const INTERVAL = 2000;

/**
 * Ảnh địa điểm: khi có nhiều ảnh thì tự chuyển ảnh sau mỗi 2 giây, kèm dải ảnh nhỏ để chọn và nút tạm dừng.
 * Khi chưa có ảnh thật (`images` trống) thì hiện khung minh họa tạm cùng phong cách.
 */
export function LocationImage({
  location,
  index,
  className,
}: {
  location: JourneyLocation;
  index: number;
  className?: string;
}) {
  const images = location.images ?? [];
  const reducedMotion = usePrefersReducedMotion();
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const [interacting, setInteracting] = useState(false);
  const hasMany = images.length > 1;

  // Đặt lại hẹn giờ mỗi lần đổi ảnh, nên bấm chọn ảnh nhỏ cũng được xem đủ 2 giây.
  useEffect(() => {
    if (!hasMany || !playing || interacting) return;
    const timer = setTimeout(() => setSelected((i) => (i + 1) % images.length), INTERVAL);
    return () => clearTimeout(timer);
  }, [hasMany, playing, interacting, images.length, selected]);

  return (
    <div
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
    >
      <figure
        className={cn(
          'relative overflow-hidden rounded-2xl border-[6px] border-paper-light bg-paper-dark shadow-lift ring-1 ring-paper-edge',
          className
        )}
      >
        <div className='relative aspect-[4/3]'>
          {images.length > 0 ? (
            images.map((image, i) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                aria-hidden={i !== selected}
                className={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out',
                  i === selected ? 'opacity-100' : 'opacity-0'
                )}
              />
            ))
          ) : (
            <div
              role='img'
              aria-label={`${location.imageAlt} (ảnh minh họa tạm)`}
              className='absolute inset-0 bg-gradient-to-br from-navy to-navy-deep'
            >
              <LandmarkArt id={location.id} className='absolute inset-0 h-full w-full' />
              <span className='absolute top-3 left-4 font-display font-extrabold text-6xl text-paper/15'>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className='absolute right-3 bottom-3 rounded-full bg-paper/90 px-3 py-1 font-semibold text-[11px] text-navy uppercase tracking-[0.14em]'>
                Ảnh minh họa
              </span>
            </div>
          )}
          {hasMany && (
            <button
              type='button'
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? 'Tạm dừng tự chuyển ảnh' : 'Tiếp tục tự chuyển ảnh'}
              className='absolute right-2 bottom-2 grid size-11 cursor-pointer place-items-center rounded-full bg-navy-deep/60 text-paper backdrop-blur-sm transition-colors hover:bg-navy-deep/80'
            >
              {playing ? <Icon.pause size={18} /> : <Icon.play size={18} />}
            </button>
          )}
        </div>
      </figure>

      {hasMany && (
        <ul className='mt-3 grid grid-cols-4 gap-2' aria-label='Chọn ảnh'>
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type='button'
                onClick={() => setSelected(i)}
                aria-label={`Xem ảnh ${i + 1}: ${image.alt}`}
                aria-pressed={i === selected}
                className={cn(
                  'block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-lg ring-2 transition',
                  i === selected ? 'ring-brass' : 'opacity-70 ring-transparent hover:opacity-100'
                )}
              >
                <img src={image.src} alt='' className='h-full w-full object-cover' />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
