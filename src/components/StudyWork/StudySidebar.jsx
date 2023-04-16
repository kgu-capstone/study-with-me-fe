import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from '../../css/StudyWork.module.css';

export default class StudySidebar extends Component {
  render() {
    return (
          <div className={`${styles.left_container}`}>
            <div className={`${styles.left_container_element}`}>
              <NavLink to = '/StudyWork/Announce' className={`${styles.regular_24} ${styles.side_announce}`}><img className={styles.side_icons} src={process.env.PUBLIC_URL + '/img/announce_icon_black.svg'}/>공지사항</NavLink>
              <NavLink to = '/StudyWork/Attend' className={`${styles.regular_24} ${styles.side_attend}`}><img className={styles.side_icons} src={process.env.PUBLIC_URL + '/img/attend_icon_black.svg'}/>출석부</NavLink>
              <NavLink to = '/StudyWork/ByWeek' className={`${styles.regular_24} ${styles.side_byweek}`}><img className={styles.side_icons} src={process.env.PUBLIC_URL + '/img/byweek_icon_black.svg'}/>스터디</NavLink>
            </div>
          </div>
    )
  }
}
