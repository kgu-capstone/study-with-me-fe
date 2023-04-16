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
        <div className={styles.study_container}>
          <StudySidebar /><Outlet />
        </div>
        
    </div>
  )
}
