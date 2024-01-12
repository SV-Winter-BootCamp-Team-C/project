import { RouterProvider } from 'react-router-dom';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { getClient } from './queryClient';
import Router from './Router';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={getClient}>
      {/* TODO: 로딩중 컴포넌트 추가 */}
      <Suspense fallback={<div>Loding</div>}>
        <RouterProvider router={Router} />
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
