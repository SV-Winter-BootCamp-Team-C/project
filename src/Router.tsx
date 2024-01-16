import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Start from './pages/Start';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainLayout from './layout/MainLayout';
import All from './pages/AllForm';
import MyForm from './pages/MyForm';
import MyResponse from './pages/MyResponse';
import Create from './pages/Create';
import ResultPage from './pages/ResultPage';
import MyAnswer from './pages/MyAnswer';
import ResponseForm from './pages/ResponseForm';

interface RouterElement {
  id: number;
  path: string;
  element?: React.ReactNode;
  withAuth?: boolean; // 인증이 필요한 페이지 여부
  isNavbar?: boolean; // Navbar가 포함된 페이지
}

const routerData: RouterElement[] = [
  { id: 1, path: '/', element: <Start />, withAuth: false },
  { id: 2, path: '/login', element: <Login />, withAuth: false },
  { id: 3, path: '/signup', element: <Signup />, withAuth: false },
  { id: 4, path: '/all', element: <All />, withAuth: false, isNavbar: true },
  { id: 5, path: '/myform', element: <MyForm />, withAuth: false, isNavbar: true },
  { id: 6, path: '/myresponses', element: <MyResponse />, withAuth: false, isNavbar: true },
  { id: 7, path: '/create', element: <Create />, withAuth: false, isNavbar: true },
  { id: 8, path: '/result/:id', element: <ResultPage />, withAuth: true, isNavbar: true }, // 설문 id
  { id: 9, path: '/responseform/:surveyId', element: <ResponseForm />, withAuth: false, isNavbar: true }, // 설문 id
  { id: 10, path: '/:userId/myanswer/:surveyId', element: <MyAnswer />, withAuth: false, isNavbar: true },
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
