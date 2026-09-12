'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { useCloudSync } from '@/hooks/useCloudSync';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useCloudSync();
  
  // Define routes that should NOT have the sidebar and standard padding
  const isNoLayoutRoute = pathname === '/login' || pathname === '/landing' || pathname === '/onboarding';

  if (isNoLayoutRoute) {
    return <main>{children}</main>;
  }

  return (
    <>
      <main className="page-container animate-fade-in">
        {children}
      </main>
      <Navbar />
    </>
  );
}
