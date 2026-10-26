import { LandmarkArt } from '@/components/journey/landmark-art';
import type { JourneyLocation } from '@/data/locations';
import { cn } from '@/lib/utils';

/** Ảnh địa điểm. Khi chưa có ảnh thật (`image` trống) thì hiện khung minh họa tạm cùng phong cách. */
export function LocationImage({
  location,
  index,
  className,
}: {
  location: JourneyLocation;
  index: number;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-2xl border-[6px] border-paper-light bg-paper-dark shadow-lift ring-1 ring-paper-edge',
        className
      )}
    >
      <div className='relative aspect-[4/3]'>
        {location.image ? (
          <img src={location.image} alt={location.imageAlt} className='h-full w-full object-cover' />
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
      </div>
    </figure>
  );
}
