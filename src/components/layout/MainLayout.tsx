import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar, MobileSidebar } from './Sidebar';
import { Footer } from './Footer';
import { useUIStore } from '@/store';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';

interface MainLayoutProps {
  showSidebar?: boolean;
  showFooter?: boolean;
  fullWidth?: boolean;
}

export function MainLayout({
  showSidebar = true,
  showFooter = true,
  fullWidth = false,
}: MainLayoutProps) {
  const { crisisMode } = useUIStore();

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col',
        crisisMode && 'crisis-mode'
      )}
    >
      <Header />

      <div className="flex flex-1">
        {showSidebar && (
          <>
            <Sidebar />
            <MobileSidebar />
          </>
        )}

        <main
          className={cn(
            'flex-1 flex flex-col',
            !fullWidth && 'container mx-auto px-4 py-6'
          )}
        >
          <Outlet />
        </main>
      </div>

      {showFooter && <Footer />}

      <Toaster />
    </div>
  );
}

// Layout variant without sidebar (for public pages)
export function PublicLayout() {
  return <MainLayout showSidebar={false} />;
}

// Layout variant for full-width pages (like map)
export function FullWidthLayout() {
  return <MainLayout showSidebar={true} showFooter={false} fullWidth={true} />;
}

// Layout variant for map page (no sidebar, no footer, full screen)
export function MapLayout() {
  return <MainLayout showSidebar={false} showFooter={false} fullWidth={true} />;
}
