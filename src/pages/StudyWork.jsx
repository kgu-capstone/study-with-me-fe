import React from 'react'
import {Outlet} from 'react-router-dom';
import Nav from '../components/Nav';
import StudySidebar from '../components/StudyWork/StudySidebar';
import StudyInfo from '../components/StudyWork/StudyInfo';
import styles from '../css/StudyWork.module.css';

export default function StudyWork() {
  return (
    <div>
        <Nav />
        <StudyInfo />
        <StudySidebar />
        <Outlet />
    </div>
  )
}
