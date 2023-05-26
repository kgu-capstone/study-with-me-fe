import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from '../../css/StudyWork.module.css';
import { authApi } from '../../services/api';

export default function StudySidebar() {

  // 넘어올 정보
  const location = useLocation()
  const studyId = 3
  // const studyId = location.state?.studyId


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

  // 스터디 이름 불러오기
  const [weekInfo, setWeekInfo] = useState([]);
  useEffect(() => {
    authApi.get(`studies/${studyId}/weeks`)
      .then((response) => {
        setWeekInfo(response.data.weeks);
      })

  }, [])

  // 클릭시 스터디 스크롤 이동
  const move_week_study = (index) => {
    document.getElementsByClassName(`${styles.byweek_each_contianer}`)[index].scrollIntoView();
  }

  return (
    <div>
      <div className={`${styles.left_container}`}>
        <div className={`${styles.left_container_element}`}>
          <NavLink to='/StudyWork/Announce' className={`${styles.sidebar} ${announceText} ${styles.isRed} ${styles.side_announce}`} onClick={() => handleAnnounce()}><img className={styles.side_icons} src={process.env.PUBLIC_URL + announceIcon} />공지사항</NavLink>
          <NavLink to='/StudyWork/Attend' className={`${styles.sidebar} ${attendText} ${styles.isRed} ${styles.side_attend}`} onClick={() => handleAttend()}><img className={styles.side_icons} src={process.env.PUBLIC_URL + attendIcon} />출석부</NavLink>
          <NavLink to='/StudyWork/ByWeek' className={`${styles.sidebar} ${byweekText} ${styles.isRed} ${styles.side_byweek}`} onClick={() => handleByweek()}><img className={styles.side_icons} src={process.env.PUBLIC_URL + byweekIcon} />스터디</NavLink>

          {window.location.href == `${process.env.REACT_APP_BASE_URL}StudyWork/ByWeek`
            ?
            /* 스터디 목록 부분*/
            <div className={styles.study_list_container}>
              <img height={0 && weekInfo.length > 0 && 13 + (weekInfo.length - 1) * 40} src={process.env.PUBLIC_URL + '/img/study_total_line.png'}
                className={styles.study_total_list_line}
              />
              <div className={styles.study_list_line_contianer}>
                {weekInfo.map((item, index) => {
                  return (
                    <div className={styles.study_list_line_each_contianer}>
                      <img height={1} src={process.env.PUBLIC_URL + '/img/study_list_line.png'}
                        className={styles.study_list_line}
                      />
                      <p onClick={() => move_week_study(index)}
                        className={styles.sidebar_each_study}
                      >{item.title}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            :
            <></>

          }

        </div>
      </div>

    </div>
  )
}
