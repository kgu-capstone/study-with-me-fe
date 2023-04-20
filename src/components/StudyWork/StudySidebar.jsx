import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from '../../css/StudyWork.module.css';

export default function StudySidebar() {

  let [announceIcon, setAnnounceIcon] = useState('/img/announce_icon_red.svg');
  let [attendIcon, setAttendIcon] = useState('/img/attend_icon_black.svg');
  let [byweekIcon, setByweekIcon] = useState('/img/byweek_icon_black.svg');

  let [announceText, setAnnounceText] = useState(styles.bold_24_red);
  let [attendText, setAttendText] = useState(styles.regular_24);
  let [byweekText, setByweekText] = useState(styles.regular_24);

  const handleAnnounce = () => {
    setAnnounceIcon('/img/announce_icon_red.svg')
    setAttendIcon('/img/attend_icon_black.svg')
    setByweekIcon('/img/byweek_icon_black.svg')

    setAnnounceText(styles.bold_24_red)
    setAttendText(styles.regular_24)
    setByweekText(styles.regular_24)
  }

  const handleAttend = () => {
    setAnnounceIcon('/img/announce_icon_black.svg')
    setAttendIcon('/img/attend_icon_red.svg')
    setByweekIcon('/img/byweek_icon_black.svg')

    setAnnounceText(styles.regular_24)
    setAttendText(styles.bold_24_red)
    setByweekText(styles.regular_24)
  }

  const handleByweek = () => {
    setAnnounceIcon('/img/announce_icon_black.svg')
    setAttendIcon('/img/attend_icon_black.svg')
    setByweekIcon('/img/byweek_icon_red.svg')

    setAnnounceText(styles.regular_24)
    setAttendText(styles.regular_24)
    setByweekText(styles.bold_24_red)
  }

  return (
    <div>
      <div className={`${styles.left_container}`}>
        <div className={`${styles.left_container_element}`}>
          <NavLink to = '/StudyWork/Announce' className={`${styles.sidebar} ${announceText} ${styles.isRed} ${styles.side_announce}`} onClick={() => handleAnnounce()}><img className={styles.side_icons} src={process.env.PUBLIC_URL + announceIcon}/>공지사항</NavLink>
          <NavLink to = '/StudyWork/Attend' className={`${styles.sidebar} ${attendText} ${styles.isRed} ${styles.side_attend}`} onClick={() => handleAttend()}><img className={styles.side_icons} src={process.env.PUBLIC_URL + attendIcon}/>출석부</NavLink>
          <NavLink to = '/StudyWork/ByWeek' className={`${styles.sidebar} ${byweekText} ${styles.isRed} ${styles.side_byweek}`} onClick={() => handleByweek()}><img className={styles.side_icons} src={process.env.PUBLIC_URL + byweekIcon}/>스터디</NavLink>
        </div>
      </div>
      
    </div>
  )
}
