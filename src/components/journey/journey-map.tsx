'use client';

import { MAP_HEIGHT, MAP_WIDTH, MapArtwork } from '@/components/journey/map-artwork';
import { Icon } from '@/components/ui/icons';
import { type JourneyLocation, LOCATIONS } from '@/data/locations';
import { useJourney } from '@/hooks/use-journey';
import { locationPath } from '@/lib/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type PinRole = 'current' | 'next' | null;

function MapPin({
  location,
  index,
  explored,
  role,
  showLabel,
  compact,
}: {
  location: JourneyLocation;
  index: number;
  explored: boolean;
  role: PinRole;
  showLabel: boolean;
  compact: boolean;
}) {
  const href = locationPath(location.slug);
  const status = explored ? 'đã khám phá' : 'chưa khám phá';
  const roleText = role === 'current' ? 'Vị trí hiện tại' : role === 'next' ? 'Điểm tiếp theo' : null;
  const fill = role === 'current' ? '#1F3A5F' : explored ? '#B5432F' : '#FBF5E9';
  const numberColor = role === 'current' || explored ? '#FBF5E9' : '#1F3A5F';
  // Bản đồ thu nhỏ hẹp hơn nhiều: đặt nhãn về phía giữa bản đồ để không bị cắt ở mép.
  const left = compact ? location.map.x > 500 : location.map.labelSide === 'left';

  return (
    <div
      className='absolute'
      style={{ left: `${(location.map.x / MAP_WIDTH) * 100}%`, top: `${(location.map.y / MAP_HEIGHT) * 100}%` }}
    >
      {role && (
        <span
          aria-hidden='true'
          className={cn(
            '-left-5 absolute top-[-53px] size-10 rounded-full motion-safe:animate-pulse-ring',
            role === 'current' ? 'bg-navy/50' : 'bg-brass/60'
          )}
        />
      )}
      <Link
        href={href}
        aria-label={`${index + 1}. ${location.name} – ${status}${roleText ? ` (${roleText.toLowerCase()})` : ''}`}
        className='group -translate-x-1/2 -translate-y-full absolute z-10 grid h-14 w-11 cursor-pointer place-items-start justify-center rounded-lg motion-safe:animate-pin-drop'
        style={{ animationDelay: `${index * 90}ms` }}
      >
        <svg
          viewBox='0 0 40 52'
          className='group-hover:-translate-y-1 h-[52px] w-10 drop-shadow-[0_6px_6px_rgba(14,29,49,0.35)] transition-transform duration-200'
          aria-hidden='true'
        >
          <path
            d='M20 51C20 51 3 31.5 3 19.5a17 17 0 0 1 34 0C37 31.5 20 51 20 51Z'
            fill={fill}
            stroke={role === 'next' ? '#C8963E' : '#1F3A5F'}
            strokeWidth={role === 'next' ? 3.5 : 2}
          />
          <circle cx='20' cy='19.5' r='11.5' fill='none' stroke={numberColor} strokeOpacity='0.35' />
          <text
            x='20'
            y='25'
            textAnchor='middle'
            fontSize='15'
            fontWeight='700'
            fill={numberColor}
            fontFamily='var(--font-display)'
          >
            {index + 1}
          </text>
        </svg>
        {explored && (
          <span className='-right-1.5 absolute top-0 grid size-5 place-items-center rounded-full border-2 border-paper-light bg-brass text-navy-deep shadow-pin'>
            <Icon.check size={11} strokeWidth={4} />
          </span>
        )}
      </Link>

      {showLabel && (
        <Link
          href={href}
          tabIndex={-1}
          className={cn(
            '-translate-y-1/2 absolute top-[-34px] z-0 flex cursor-pointer flex-col rounded-lg border bg-paper-light/95 px-2.5 py-1 shadow-card transition-colors hover:border-brick hover:bg-white',
            left ? 'right-6 items-end text-right' : 'left-6 items-start',
            compact ? 'hidden w-max max-w-[9rem] leading-tight sm:flex' : 'whitespace-nowrap',
            role === 'current' ? 'border-navy' : role === 'next' ? 'border-brass' : 'border-paper-edge'
          )}
        >
          {roleText && (
            <span
              className={cn(
                'font-bold text-[10px] uppercase tracking-[0.14em]',
                role === 'current' ? 'text-navy' : 'text-brass-dark'
              )}
            >
              {roleText}
            </span>
          )}
          <span className={cn('font-semibold text-navy', compact ? 'text-xs' : 'text-[13px]')}>{location.name}</span>
          {!compact && (
            <span className='flex items-center gap-1 font-semibold text-[10px] text-brick uppercase tracking-[0.12em]'>
              Chi tiết <Icon.arrowRight size={11} strokeWidth={3} />
            </span>
          )}
        </Link>
      )}
    </div>
  );
}

type JourneyMapProps = {
  variant?: 'full' | 'mini';
  /** Địa điểm đang xem (chỉ dùng ở bản đồ thu nhỏ). */
  currentSlug?: string;
  className?: string;
};

export function JourneyMap({ variant = 'full', currentSlug, className }: JourneyMapProps) {
  const { isExplored } = useJourney();
  const currentIndex = currentSlug ? LOCATIONS.findIndex((location) => location.slug === currentSlug) : -1;
  const nextIndex = currentIndex >= 0 && currentIndex < LOCATIONS.length - 1 ? currentIndex + 1 : -1;
  const isMini = variant === 'mini';

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border-2 border-paper-edge bg-paper shadow-card',
        className
      )}
      style={{ aspectRatio: `${MAP_WIDTH} / ${MAP_HEIGHT}` }}
    >
      <MapArtwork animateRoute={!isMini} />
      {LOCATIONS.map((location, index) => {
        const role: PinRole = index === currentIndex ? 'current' : index === nextIndex ? 'next' : null;
        return (
          <MapPin
            key={location.id}
            location={location}
            index={index}
            explored={isExplored(location.id)}
            role={role}
            showLabel={!isMini || role !== null}
            compact={isMini}
          />
        );
      })}
    </div>
  );
}
