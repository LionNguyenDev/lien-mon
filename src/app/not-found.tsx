import { buttonClass } from '@/components/ui/button';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className='paper-texture flex min-h-screen flex-col items-center justify-center px-4 text-center'>
      <p className='font-display font-extrabold text-7xl text-azure-dark'>404</p>
      <h1 className='mt-2 font-bold font-display text-3xl text-navy'>Lạc đường rồi!</h1>
      <p className='mt-2 max-w-sm text-muted'>Địa điểm này không có trên bản đồ hành trình.</p>
      <Link href={ROUTES.MAP} className={buttonClass('primary', 'md', 'mt-6')}>
        Quay lại bản đồ
      </Link>
    </main>
  );
}
