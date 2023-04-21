import React, { Children } from 'react'
import { createBrowserRouter, RouterProvider, BrowserRouter, Outlet } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Root from './pages/Root';
import Main from './pages/Main';
import StudyWork from './pages/StudyWork';
import Announce from './components/StudyWork/Announce';
import Attend from './components/StudyWork/Attend';
import ByWeek from './components/StudyWork/ByWeek';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
          {index: true, element: <Main />},
          {path: 'SignIn', element: <SignIn />},
          {path: 'SignUp', element: <SignUp />},
          {path: 'MyPage', element: <MyPage />},
        ],
    },
    {
        path: '/StudyWork',
        element: <StudyWork />,
        children: [
          {index: true, element: <Announce />},
          {path: 'Announce', element: <Announce />},
          {path: 'Attend', element: <Attend />},
          {path: 'ByWeek', element: <ByWeek />},
        ]

    },
])


export default function App() {
  return (
    <div>
        <RouterProvider router = {router} />
    </div>
  )
}
