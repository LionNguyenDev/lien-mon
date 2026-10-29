'use client';

import { JourneyHeader } from '@/components/journey/journey-header';
import { JourneyMap } from '@/components/journey/journey-map';
import { LocationImage } from '@/components/journey/location-image';
import { buttonClass } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';
import { type ContentBlock, LOCATIONS, type LocationSection, formatOrder } from '@/data/locations';
import { useJourney } from '@/hooks/use-journey';
import { ROUTES, locationPath } from '@/lib/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';

function SectionContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className='space-y-4'>
      {blocks.map((block, i) =>
        block.type === 'paragraph' ? (
          <p key={i} className='text-[15px] text-navy/90 leading-relaxed sm:text-base'>
            {block.text}
          </p>
        ) : (
          <div key={i}>
            {block.heading && (
              <h4 className='mb-2 font-bold text-azure-dark text-xs uppercase tracking-[0.16em]'>{block.heading}</h4>
            )}
            <ul className='space-y-2'>
              {block.items.map((item) => (
                <li key={item} className='flex gap-3 text-[15px] text-navy/90 leading-relaxed sm:text-base'>
                  <span className='mt-2.5 size-1.5 shrink-0 rotate-45 bg-azure' aria-hidden='true' />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
}

function AccordionItem({
  section,
  open,
  seen,
  onToggle,
}: {
  section: LocationSection;
  open: boolean;
  seen: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border bg-paper-light/90 shadow-card transition-colors',
        open ? 'border-azure' : 'border-paper-edge'
      )}
    >
      <h3>
        <button
          type='button'
          id={`${id}-trigger`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className='flex min-h-16 w-full cursor-pointer items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-white/60 sm:px-5'
        >
          <span
            className={cn(
              'grid size-10 shrink-0 place-items-center rounded-full font-bold font-display text-lg transition-colors',
              open ? 'bg-navy text-paper-light' : 'border-2 border-navy text-navy'
            )}
          >
            {section.key}
          </span>
          <span className='flex-1 font-bold font-display text-lg text-navy leading-snug sm:text-xl'>
            {section.title}
          </span>
          {seen && (
            <span className='hidden items-center gap-1 rounded-full bg-pastel px-2 py-0.5 font-semibold text-[11px] text-navy ring-1 ring-pastel-dark sm:flex'>
              <Icon.check size={12} strokeWidth={3} /> Đã xem
            </span>
          )}
          <Icon.chevronDown
            size={22}
            className={cn('shrink-0 text-azure-dark transition-transform duration-300', open && 'rotate-180')}
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role='region'
        aria-labelledby={`${id}-trigger`}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className='overflow-hidden' inert={!open}>
          <div className='border-paper-edge border-t border-dashed px-4 py-5 sm:px-5 sm:pl-[4.75rem]'>
            <SectionContent blocks={section.content} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LocationDetail({ index }: { index: number }) {
  const location = LOCATIONS[index];
  const nextLocation = LOCATIONS[index + 1];
  const isLast = !nextLocation;
  const router = useRouter();
  const { showToast } = useToast();
  const { isExplored, openedSections, openSection, markExplored, exploredCount, total, isComplete } = useJourney();
  const explored = isExplored(location.id);
  const seen = openedSections(location.id);

  const [showMore, setShowMore] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [showMissing, setShowMissing] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Next.js giữ lại component khi chuyển giữa các địa điểm: đặt lại trạng thái cho trang mới.
  useEffect(() => {
    setShowMore(false);
    setOpenKeys([]);
    setShowMissing(false);
  }, [location.id]);

  const celebrate = () => showToast(`Đã khám phá "${location.name}" (${exploredCount + 1}/${total})`);

  const toggleSection = (section: LocationSection) => {
    const isOpen = openKeys.includes(section.key);
    setOpenKeys((keys) => (isOpen ? keys.filter((k) => k !== section.key) : [...keys, section.key]));
    if (!isOpen && openSection(location.id, section.key)) celebrate();
  };

  const toggleMore = () => {
    setShowMore((value) => !value);
    if (!showMore) requestAnimationFrame(() => moreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const finishJourney = () => {
    if (isComplete) router.push(ROUTES.CERTIFICATE);
    else setShowMissing(true);
  };

  const missing = LOCATIONS.filter((l) => !isExplored(l.id));

  return (
    <div className='paper-texture min-h-screen'>
      <JourneyHeader />

      <main className='mx-auto max-w-6xl px-4 pt-5 pb-16 sm:px-6 sm:pt-8'>
        <Link
          href={ROUTES.MAP}
          className='inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg font-semibold text-muted text-sm hover:text-navy'
        >
          <Icon.arrowLeft size={16} /> Bản đồ hành trình
        </Link>

        {/* Phần đầu trang */}
        <article key={location.id} className='mt-3 grid animate-fade-up gap-8 md:grid-cols-2 md:items-center md:gap-12'>
          <div>
            <div className='flex items-center gap-3'>
              <span className='font-bold font-display text-4xl text-brass-dark lining-nums tabular-nums sm:text-5xl'>
                {formatOrder(index)}
              </span>
              <span className='h-px flex-1 bg-gradient-to-r from-brass/70 to-transparent' />
            </div>
            <p className='mt-4 inline-flex rounded-full bg-azure-dark px-3 py-1 font-bold text-white text-xs uppercase tracking-[0.2em]'>
              {location.label}
            </p>
            <h1 className='mt-3 font-display font-extrabold text-4xl text-navy leading-[1.08] sm:text-5xl lg:text-6xl'>
              {location.name}
            </h1>
            <p className='mt-4 max-w-lg text-lg text-muted leading-relaxed'>{location.subtitle}</p>

            <dl className='mt-6 flex flex-wrap gap-3'>
              {location.facts.map((fact) => (
                <div key={fact.label} className='rounded-xl border border-paper-edge bg-paper-light/80 px-4 py-2'>
                  <dt className='font-semibold text-[11px] text-muted uppercase tracking-[0.14em]'>{fact.label}</dt>
                  <dd className='font-bold font-display text-lg text-navy'>{fact.value}</dd>
                </div>
              ))}
            </dl>

            {explored && (
              <p className='mt-5 inline-flex items-center gap-2 rounded-full bg-pastel px-3 py-1.5 font-semibold text-navy text-sm ring-1 ring-pastel-dark'>
                <Icon.check size={16} strokeWidth={3} /> Bạn đã khám phá địa điểm này
              </p>
            )}
          </div>

          <div className='flex flex-col gap-5'>
            <LocationImage location={location} index={index} className='rotate-[0.6deg]' />
            <button
              type='button'
              onClick={toggleMore}
              aria-expanded={showMore}
              aria-controls='tim-hieu-them'
              className={buttonClass('primary', 'lg', 'w-full')}
            >
              <Icon.book size={20} />
              {showMore ? 'Thu gọn' : 'Tìm hiểu thêm'}
              <Icon.chevronDown size={20} className={cn('transition-transform', showMore && 'rotate-180')} />
            </button>
          </div>
        </article>

        {/* Phần tìm hiểu thêm */}
        <div id='tim-hieu-them' ref={moreRef} className='scroll-mt-28'>
          {showMore && (
            <section aria-label='Tìm hiểu thêm' className='mt-10 animate-fade-up'>
              <div className='flex flex-wrap items-end justify-between gap-3'>
                <h2 className='font-bold font-display text-2xl text-navy sm:text-3xl'>Tìm hiểu thêm</h2>
                <p className='text-muted text-sm'>
                  Đã mở <strong className='text-navy'>{seen.length}/3</strong> đề mục
                  {!explored && ' · mở đủ cả 3 để ghi nhận đã khám phá'}
                </p>
              </div>
              <div className='mt-4 space-y-3'>
                {location.sections.map((section) => (
                  <AccordionItem
                    key={section.key}
                    section={section}
                    open={openKeys.includes(section.key)}
                    seen={seen.includes(section.key)}
                    onToggle={() => toggleSection(section)}
                  />
                ))}
              </div>
              {!explored && (
                <button
                  type='button'
                  onClick={() => markExplored(location.id) && celebrate()}
                  className={buttonClass('secondary', 'md', 'mt-5 w-full sm:w-auto')}
                >
                  <Icon.check size={18} strokeWidth={3} /> Đánh dấu đã khám phá
                </button>
              )}
            </section>
          )}
        </div>

        {/* Khu điều hướng */}
        <section
          aria-label='Điều hướng hành trình'
          className='mt-14 grid gap-6 rounded-3xl border border-paper-edge bg-paper-light/70 p-4 shadow-card sm:p-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center'
        >
          <div className='mx-auto w-full max-w-xl'>
            <JourneyMap variant='mini' currentSlug={location.slug} />
            <ul className='mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm'>
              <li className='flex items-center gap-2'>
                <span className='size-3.5 shrink-0 rounded-full bg-navy ring-4 ring-navy/20' />
                <span className='text-muted'>
                  Vị trí hiện tại: <strong className='text-navy'>{location.name}</strong>
                </span>
              </li>
              {nextLocation && (
                <li className='flex items-center gap-2'>
                  <span className='size-3.5 shrink-0 rounded-full border-[3px] border-brass bg-paper-light' />
                  <span className='text-muted'>
                    Điểm tiếp theo: <strong className='text-navy'>{nextLocation.name}</strong>
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div className='flex flex-col gap-3'>
            <p className='font-semibold text-azure-dark text-xs uppercase tracking-[0.25em]'>Chặng tiếp theo</p>
            <p className='font-bold font-display text-2xl text-navy leading-snug'>
              {nextLocation ? nextLocation.name : 'Bạn đã tới điểm dừng cuối cùng'}
            </p>

            {isLast ? (
              <button type='button' onClick={finishJourney} className={buttonClass('primary', 'lg', 'mt-2 w-full')}>
                <Icon.flag size={20} /> Hoàn thành hành trình
              </button>
            ) : (
              <Link href={locationPath(nextLocation.slug)} className={buttonClass('primary', 'lg', 'mt-2 w-full')}>
                Địa điểm tiếp theo <Icon.arrowRight size={20} />
              </Link>
            )}
            <Link href={ROUTES.MAP} className={buttonClass('secondary', 'md', 'w-full')}>
              <Icon.map size={18} /> Quay lại bản đồ
            </Link>

            {isLast && showMissing && missing.length > 0 && (
              <div role='alert' className='mt-2 animate-fade-up rounded-2xl border-2 border-azure/50 bg-white/80 p-4'>
                <p className='flex items-center gap-2 font-bold text-azure-deep'>
                  <Icon.alert size={20} /> Bạn còn {missing.length} địa điểm chưa khám phá
                </p>
                <ul className='mt-2 space-y-1'>
                  {missing.map((l) => (
                    <li key={l.id}>
                      <Link
                        href={locationPath(l.slug)}
                        className='inline-flex min-h-11 cursor-pointer items-center gap-2 font-medium text-navy text-sm underline-offset-4 hover:underline'
                      >
                        <Icon.arrowRight size={14} /> {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={ROUTES.MAP} className={buttonClass('secondary', 'sm', 'mt-2 w-full')}>
                  <Icon.map size={16} /> Về bản đồ
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
