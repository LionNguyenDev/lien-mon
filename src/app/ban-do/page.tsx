'use client';

import { JourneyHeader } from '@/components/journey/journey-header';
import { JourneyMap } from '@/components/journey/journey-map';
import { buttonClass } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { LOCATIONS } from '@/data/locations';
import { useJourney } from '@/hooks/use-journey';
import { ROUTES, locationPath } from '@/lib/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function MapPage() {
  const { isExplored, isComplete } = useJourney();

  return (
    <div className='paper-texture min-h-screen'>
      <JourneyHeader showReset />

      <main className='mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-6 sm:pt-10'>
        <div className='flex animate-fade-up flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <p className='font-semibold text-brick text-xs uppercase tracking-[0.25em]'>Bản đồ hành trình</p>
            <h1 className='mt-1 font-bold font-display text-3xl text-navy sm:text-4xl'>Sài Gòn – Gia Định</h1>
          </div>
          <p className='max-w-sm text-muted text-sm'>
            Chọn bất kỳ ghim nào để bắt đầu. Bạn không cần đi theo thứ tự — hãy khám phá theo cách của mình.
          </p>
        </div>

        {isComplete && (
          <div className='mt-6 flex animate-fade-up flex-col items-start gap-3 rounded-2xl border-2 border-brass bg-white/70 p-4 shadow-card sm:flex-row sm:items-center sm:justify-between'>
            <p className='flex items-center gap-3 font-semibold text-navy'>
              <span className='grid size-10 place-items-center rounded-full bg-brass text-navy-deep'>
                <Icon.award size={22} />
              </span>
              Bạn đã khám phá trọn vẹn hành trình!
            </p>
            <Link href={ROUTES.CERTIFICATE} className={buttonClass('primary', 'md')}>
              Nhận chứng nhận <Icon.arrowRight size={18} />
            </Link>
          </div>
        )}

        <section aria-label='Bản đồ các địa điểm' className='mt-6'>
          <div className='-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0'>
            <JourneyMap className='min-w-[680px]' />
          </div>
          <p className='mt-2 flex items-center justify-center gap-2 text-muted text-xs sm:hidden'>
            <Icon.arrowLeft size={14} /> Kéo ngang để xem toàn bộ bản đồ <Icon.arrowRight size={14} />
          </p>
          <ul className='mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted text-xs'>
            <li className='flex items-center gap-2'>
              <span className='size-3.5 rounded-full border-2 border-navy bg-paper-light' /> Chưa khám phá
            </li>
            <li className='flex items-center gap-2'>
              <span className='size-3.5 rounded-full bg-brick' /> Đã khám phá
            </li>
            <li className='flex items-center gap-2'>
              <span className='h-0 w-8 border-brick border-t-[3px] border-dotted' /> Lộ trình gợi ý
            </li>
          </ul>
        </section>

        <section aria-labelledby='location-list' className='mt-10'>
          <h2 id='location-list' className='font-bold font-display text-2xl text-navy'>
            Các điểm dừng
          </h2>
          <ol className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {LOCATIONS.map((location, index) => {
              const explored = isExplored(location.id);
              return (
                <li
                  key={location.id}
                  className='flex animate-fade-up flex-col rounded-2xl border border-paper-edge bg-paper-light/80 p-4 shadow-card'
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className='flex items-start gap-3'>
                    <span
                      className={cn(
                        'grid size-11 shrink-0 place-items-center rounded-full font-bold font-display text-lg',
                        explored ? 'bg-brick text-white' : 'border-2 border-navy text-navy'
                      )}
                    >
                      {explored ? <Icon.check size={20} strokeWidth={3} /> : index + 1}
                    </span>
                    <div className='min-w-0'>
                      <p className='font-semibold text-[11px] text-brick uppercase tracking-[0.16em]'>
                        {location.label}
                      </p>
                      <h3 className='font-bold font-display text-lg text-navy leading-snug'>{location.name}</h3>
                      <p className={cn('mt-0.5 text-xs', explored ? 'text-brick-dark' : 'text-muted')}>
                        {explored ? 'Đã khám phá' : 'Chưa khám phá'}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={locationPath(location.slug)}
                    className={buttonClass('secondary', 'sm', 'mt-4 self-stretch')}
                    aria-label={`Chi tiết: ${location.name}`}
                  >
                    Chi tiết <Icon.arrowRight size={16} />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
    </div>
  );
}
