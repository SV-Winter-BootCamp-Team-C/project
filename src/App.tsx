import { RouterProvider } from 'react-router-dom';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getClient } from './queryClient';
import Router from './Router';

function App(): JSX.Element {
  return (
    <QueryClientProvider client={getClient}>
      <RouterProvider router={Router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
