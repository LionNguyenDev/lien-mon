'use client';

import { ToastProvider } from '@/components/ui/toast';
import { JourneyProvider } from '@/hooks/use-journey';
import { type ReactNode, useEffect, useState } from 'react';

export interface ProvidersProps {
  children: ReactNode;
}

// Tiến độ đọc từ localStorage nên chỉ render sau khi đã ở phía trình duyệt.
function Providers({ children }: ProvidersProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <JourneyProvider>
      <ToastProvider>{children}</ToastProvider>
    </JourneyProvider>
  );
}

export default Providers;
