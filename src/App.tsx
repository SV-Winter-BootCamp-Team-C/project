import { RouterProvider } from 'react-router-dom';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import Loading from '@/components/common/Loading';
import { getClient } from './queryClient';
import Router from './Router';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={getClient}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={Router} />
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
