import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import All from './pages/AllForm';
import MyForm from './pages/MyForm';
import MainLayout from './layout/MainLayout';

interface RouterElement {
  id: number;
  path: string;
  element?: React.ReactNode;
  withAuth?: boolean; // 인증이 필요한 페이지 여부
  isNavbar?: boolean; // Navbar가 포함된 페이지
}

const routerData: RouterElement[] = [
  { id: 1, path: '/', element: <div>Home</div>, withAuth: false },
  { id: 4, path: '/all', element: <All />, withAuth: false, isNavbar: true },
  { id: 5, path: '/myform', element: <MyForm />, withAuth: false, isNavbar: true },
  { id: 6, path: '/myresponses', element: <MyForm />, withAuth: false, isNavbar: true },
  { id: 7, path: '/analysis', element: <MyForm />, withAuth: false, isNavbar: true },
];

const Router = createBrowserRouter(
  routerData.map((route) => {
    // TODO: withAuth가 true인 경우, 인증 여부를 체크하는 로직을 추가
    if (route.isNavbar) {
      return {
        path: route.path,
        element: <MainLayout>{route.element}</MainLayout>,
      };
    }
    return {
      path: route.path,
      element: route.element,
    };
  }),
);

export default Router;
