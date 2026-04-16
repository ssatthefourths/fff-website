import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navigation } from './organisms/Navigation';
import { FooterSection } from './organisms/FooterSection';
import { ErrorBoundary } from './ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <div className="bg-[#fffdf3] relative w-full max-w-[100vw] overflow-x-hidden">
      <ScrollToTop />
      <Navigation />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <FooterSection />
    </div>
  );
}

export default Layout;
