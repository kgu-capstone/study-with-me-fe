import React, { Children } from 'react'
import { createBrowserRouter, RouterProvider, BrowserRouter, Outlet } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Root from './pages/Root';
import Main from './pages/Main';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
          {index: true, element: <Main />},
          {path: '/SignIn', element: <SignIn />},
          {path: '/SignUp', element: <SignUp />},
          {path: '/MyPage', element: <MyPage />},
        ],
    },
])


export default function App() {
  return (
    <div>
        <RouterProvider router = {router} />
    </div>
  )
}
