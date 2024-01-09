import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

interface RouterElement {
  id: number;
  path: string;
  element: React.ReactNode;
  withAuth?: boolean; // 인증이 필요한 페이지 여부
}

const routerData: RouterElement[] = [
  { id: 1, path: '/', element: <div>Home</div>, withAuth: false },
  { id: 4, path: '/home', element: <Home />, withAuth: true },
];

const Router = createBrowserRouter(
  routerData.map((route) => {
    // TODO: withAuth가 true인 경우, 인증 여부를 체크하는 로직을 추가
    return {
      path: route.path,
      element: route.element,
    };
  }),
);

export default Router;
