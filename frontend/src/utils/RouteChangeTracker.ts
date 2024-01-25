import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router-dom';

// URL 변경을 감지하는 컴포넌트
const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (import.meta.env.PROD) {
      ReactGA.initialize(import.meta.env.VITE_APP_GOOGLE_ANALYTICS);
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      const pagePath = location.pathname + location.search;
      ReactGA.set({ page: pagePath });
      ReactGA.send('pageview');
    }
  }, [initialized, location]);
};
export default RouteChangeTracker;
