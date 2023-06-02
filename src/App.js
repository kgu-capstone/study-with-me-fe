import React, { Children } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Outlet,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import Root from "./pages/Root";
import Main from "./pages/Main";
import StudyWork from "./pages/StudyWork";
import Notices from "./components/StudyWork/Notices";
import Attendances from "./components/StudyWork/Attendances";
import Weeks from "./components/StudyWork/Weeks";
import StudyCreate from "./pages/StudyCreate";
import StudyDetail from "./pages/StudyDetail";

import StudyEdit from './pages/StudyEdit';
import StudyApplicants from './pages/StudyApplicants';
import MyPageEdit from './pages/MyPageEdit';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Main /> },
      { path: "login", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "mypage", element: <MyPage /> },
      { path: "mypage/edit", element: <MyPageEdit /> },

      { path: "study/create", element: <StudyCreate /> },
      { path: "study", element: <StudyDetail /> },
      { path: "study/edit", element: <StudyEdit /> },
      { path: "study/applicants", element: <StudyApplicants /> },
    ],
  },
  {
    path: "/study/work",
    element: <StudyWork />,
    children: [
      { index: true, element: <Notices /> },
      { path: "notices", element: <Notices /> },
      { path: "attendances", element: <Attendances /> },
      { path: "weeks", element: <Weeks /> },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
