'use client';

import {
  CERT_HEIGHT,
  CERT_WIDTH,
  drawCertificate,
  loadCertificateFonts,
} from '@/components/journey/certificate-canvas';
import { JourneyHeader } from '@/components/journey/journey-header';
import { buttonClass } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { useToast } from '@/components/ui/toast';
import { JOURNEY } from '@/data/locations';
import { useJourney } from '@/hooks/use-journey';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Khóa cũ từng dùng để nhớ tên, giờ chỉ dọn đi khi kết thúc hành trình.
const LEGACY_NAME_KEY = 'hanh-trinh-kham-pha:name';

function fileName(name: string) {
  const slug = name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
  return `chung-nhan-hanh-trinh${slug ? `-${slug}` : ''}.png`;
}

export default function CertificatePage() {
  const { isComplete, reset } = useJourney();
  const router = useRouter();
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setName] = useState('');
  // editing: đang nhập tên · confirming: chờ xác nhận tên cuối cùng · done: đã tải, đang làm mới hành trình
  const [phase, setPhase] = useState<'editing' | 'confirming' | 'done'>('editing');
  const finishing = useRef(false);
  const [fonts, setFonts] = useState<Awaited<ReturnType<typeof loadCertificateFonts>> | null>(null);
  const [date] = useState(() => new Date());

  // Chưa khám phá đủ thì không cho vào trang chứng nhận (trừ lúc vừa tải xong và đang tự làm mới).
  useEffect(() => {
    if (!isComplete && !finishing.current) {
      showToast('Hãy khám phá đủ tất cả địa điểm để nhận chứng nhận.');
      router.replace(ROUTES.MAP);
    }
  }, [isComplete, router, showToast]);

  useEffect(() => {
    loadCertificateFonts().then(setFonts);
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && fonts) drawCertificate(ctx, { name, date, fonts });
  }, [name, date, fonts]);

  const trimmedName = name.trim();

  // Mỗi hành trình chỉ được tải chứng nhận một lần: tải xong thì xóa toàn bộ tiến độ và quay về trang bắt đầu.
  const finishJourney = () => {
    finishing.current = true;
    reset();
    try {
      window.localStorage.removeItem(LEGACY_NAME_KEY);
    } catch {
      // Bỏ qua nếu không truy cập được bộ nhớ.
    }
    showToast('Đã tải chứng nhận! Hành trình đã được làm mới.');
    router.replace(ROUTES.HOME);
  };

  const download = () => {
    setPhase('done');
    canvasRef.current?.toBlob((blob) => {
      if (!blob) {
        setPhase('confirming');
        showToast('Không tạo được ảnh, vui lòng thử lại.');
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName(name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      finishJourney();
    }, 'image/png');
  };

  if (!isComplete && !finishing.current) return null;

  return (
    <div className='paper-texture min-h-screen'>
      <JourneyHeader />

      <main className='mx-auto max-w-5xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12'>
        <div className='animate-fade-up text-center'>
          <p className='inline-flex items-center gap-2 font-semibold text-azure-dark text-xs uppercase tracking-[0.3em]'>
            <Icon.award size={18} /> Chứng nhận hoàn thành
          </p>
          <h1 className='mt-2 font-display font-extrabold text-5xl text-navy sm:text-6xl'>CHÚC MỪNG BẠN!</h1>
          <p className='mt-3 font-bold font-display text-azure-dark text-lg sm:text-2xl'>
            ĐÃ HOÀN THÀNH HÀNH TRÌNH KHÁM PHÁ TP.HCM
          </p>
        </div>

        <form
          className='mx-auto mt-8 max-w-md animate-fade-up'
          style={{ animationDelay: '120ms' }}
          onSubmit={(e) => {
            e.preventDefault();
            if (trimmedName && phase === 'editing') setPhase('confirming');
          }}
        >
          <label htmlFor='cert-name' className='font-semibold text-navy text-sm'>
            Tên của bạn
          </label>
          <input
            id='cert-name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly={phase !== 'editing'}
            aria-describedby='cert-name-hint'
            maxLength={40}
            autoComplete='name'
            placeholder='Ví dụ: Nguyễn Văn An'
            className='mt-1.5 block min-h-12 w-full rounded-xl border-2 border-paper-edge bg-white px-4 text-base text-navy shadow-inner outline-none transition-colors placeholder:text-muted/60 read-only:cursor-not-allowed read-only:bg-paper-light read-only:text-muted focus:border-azure'
          />
          <p id='cert-name-hint' className='mt-1.5 text-muted text-xs'>
            Tên hiển thị ngay trên chứng nhận bên dưới. Mỗi hành trình chỉ được nhập tên và tải chứng nhận một lần.
          </p>
        </form>

        <div className='mt-8 animate-fade-up' style={{ animationDelay: '220ms' }}>
          <canvas
            ref={canvasRef}
            width={CERT_WIDTH}
            height={CERT_HEIGHT}
            role='img'
            aria-label={`Giấy chứng nhận hoàn thành hành trình khám phá TP.HCM${name.trim() ? ` của ${name.trim()}` : ''}`}
            className='block h-auto w-full rounded-lg bg-paper-light shadow-lift'
          />
        </div>

        {phase === 'editing' ? (
          <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center'>
            <button
              type='button'
              onClick={() => setPhase('confirming')}
              disabled={!fonts || !trimmedName}
              className={buttonClass('primary', 'lg')}
            >
              <Icon.download size={20} /> Tải chứng nhận
            </button>
            <Link href={ROUTES.MAP} className={buttonClass('secondary', 'lg')}>
              <Icon.map size={20} /> Quay lại bản đồ
            </Link>
          </div>
        ) : (
          <div
            role='alertdialog'
            aria-labelledby='confirm-title'
            aria-describedby='confirm-desc'
            className='mx-auto mt-8 max-w-xl animate-fade-up rounded-2xl border-2 border-azure bg-white/80 p-5 shadow-card'
          >
            <p id='confirm-title' className='flex items-center gap-2 font-bold text-navy'>
              <Icon.alert size={20} className='text-azure-dark' /> Xác nhận tên trên chứng nhận
            </p>
            <p id='confirm-desc' className='mt-2 text-muted text-sm leading-relaxed'>
              Chứng nhận sẽ được cấp cho <strong className='text-navy'>{trimmedName}</strong>. Sau khi tải, bạn không
              thể đổi tên và toàn bộ hành trình sẽ được làm mới từ đầu.
            </p>
            <div className='mt-4 flex flex-col gap-3 sm:flex-row'>
              <button
                type='button'
                onClick={download}
                disabled={phase === 'done'}
                className={buttonClass('primary', 'md', 'sm:flex-1')}
              >
                <Icon.download size={18} /> {phase === 'done' ? 'Đang tải…' : 'Xác nhận & tải'}
              </button>
              <button
                type='button'
                onClick={() => setPhase('editing')}
                disabled={phase === 'done'}
                className={buttonClass('secondary', 'md')}
              >
                Sửa tên
              </button>
            </div>
          </div>
        )}

        <section className='mt-16 rounded-3xl border border-paper-edge bg-paper-light/70 p-6 shadow-card sm:p-10'>
          <blockquote className='text-center'>
            <p className='mx-auto max-w-2xl font-display text-2xl text-navy italic leading-snug sm:text-3xl'>
              “{JOURNEY.message}”
            </p>
          </blockquote>
          <p className='mx-auto mt-6 max-w-3xl text-center text-muted leading-relaxed'>{JOURNEY.conclusion}</p>
          <h2 className='mt-10 text-center font-bold text-azure-dark text-xs uppercase tracking-[0.25em]'>
            Giải pháp chung
          </h2>
          <dl className='mt-4 grid gap-4 sm:grid-cols-2'>
            {JOURNEY.generalSolutions.map((item) => (
              <div key={item.title} className='rounded-2xl border border-paper-edge bg-white/60 p-4'>
                <dt className='font-bold font-display text-lg text-navy'>{item.title}</dt>
                <dd className='mt-1 text-muted text-sm leading-relaxed'>{item.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
