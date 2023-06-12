import React, { useEffect, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import { authApi } from '../../services/api';
import { Link, NavLink, useLocation } from 'react-router-dom';

export default function StudyInfo() {

  //##-- 만약 id가 없는 비로그인상태라면 --##
  //로그인 후 redirect href 미리 저장 -> 활동페이지는 마이페이지로
  localStorage.setItem("loginRedirectpath", `${process.env.REACT_APP_BASE_URL}mypage`)

  // 사용자 id get
  let memberId;
  if (localStorage.getItem("id")) {
    memberId = localStorage.getItem("id")
  } else {
    window.location.href = `${process.env.REACT_APP_BASE_URL}login`;
  }
  //##-----------------------------------##


  // studyId
  const location = useLocation()
  const studyId = location.state?.studyId


  // 서버에서 스터디 info 받아오기
  const [studyThumbnail, setStudyThumbnail] = useState('');
  const [studyCategory, setStudyCategory] = useState('');
  const [studyName, setStudyName] = useState('');
  const [studyCurrentMembers, setStudyCurrentMembers] = useState(0);
  const [studyMaxMembers, setStudyMaxMembers] = useState(0);
  const [minimumAttendanceForGraduation, setminimumAttendanceForGraduation] = useState(0);

  const [isHost, setIsHost] = useState(false)
  const [isRecruit, setIsRecruit] = useState(false);

  const [attendInfo, setAttendInfo] = useState();
  useEffect(() => {
    authApi.get(`studies/${studyId}`)
      .then((response) => {

        setStudyThumbnail(response.data.thumbnail);
        setStudyCategory(response.data.category);
        setStudyName(response.data.name);
        setStudyCurrentMembers(response.data.currentMembers);
        setStudyMaxMembers(response.data.maxMembers);
        setminimumAttendanceForGraduation(response.data.minimumAttendanceForGraduation)
        document.getElementsByClassName(`${styles.info_container}`)[0].style.backgroundColor = `${response.data.thumbnailBackground}`;

        //팀장인가
        if (memberId == response.data.host.id) {
          setIsHost(true)
        }

        //모집중인가
        if ("모집중" == response.data.recruitmentStatus) {
          setIsRecruit(true);
        }


      })
      .catch((e) => {
        console.log(e)
      })


    //사용자의 출석 수 구하기

    authApi.get(`studies/${studyId}/attendances`)
      .then((response) => {
        setAttendInfo(response.data.result)
      })
  }, [])

  // 졸업하기
  const goGraduate = () => {
    authApi.patch(`studies/${studyId}/graduate`)
      .then((response) => {
        alert(`${studyName}스터디를 졸업하였습니다. 축하합니다.`)
        window.location.reload();
      })
      .catch((err) => {
        console.log('왜안돼');
        alert('gkgk')
      })

  }

  //출석 카운트
  let attendCount = 0
  let noGraduate = 1

  return (
    <div>
      <div className={styles.info_container}>
        <div className={styles.infoes}>
          <div className={styles.info_left}>
            <div className={styles.info_left_element}>

              {/* 졸업버튼 */}
              {attendInfo && attendInfo.map((item) => {
                {/* 최소 졸업 수 만족 */ }
                item.member.id == memberId && item.summaries && item.summaries.map((attendStatus) => {
                  attendStatus.status == "출석" && (attendCount = attendCount + 1)
                })
              })}
              {attendInfo && attendInfo.map((item) => {
                item.member.id == memberId && item.member.participantStatus == "GRADUATED" && (noGraduate = 0)
              })}
              {minimumAttendanceForGraduation <= attendCount && noGraduate ?
                <div className={styles.info_left_graduate_button} onClick={() => goGraduate()}><img className={styles.left_info_gradute_img} width={24} height={24} src={process.env.PUBLIC_URL + `/img/graduate.png`} /><p>졸업하기</p></div>
                :
                <></>
              }
              <img width={132} height={132} src={process.env.PUBLIC_URL + `/img/studyprofiles/${studyThumbnail}`} />
            </div>
          </div>
          <div className={styles.info_right}>
            <div className={styles.info_right_element}>
              <p className={styles.info_category}>#{studyCategory}</p>
              <NavLink to={`/study/work/notices?name=${studyName}`} state={{ studyId: studyId }} className={styles.info_studyname_navlink}>
                <p className={`${styles.bold_24} ${styles.info_studyname}`}>{studyName}</p>
              </NavLink>
              <p className={styles.regular_18}>{studyCurrentMembers} / {studyMaxMembers}</p>
            </div>
            <div className={`${styles.info_right_buttons}`}>
              {isHost && isRecruit ?
                <NavLink to={`/study/applicants?name=${studyName}`} state={{ studyId: studyId }} className={styles.applicantList_button}>
                  <div>
                    <img src={process.env.PUBLIC_URL + '/img/participate_button.png'}
                      className={styles.info_button} />신청한 사람 보기
                  </div>
                </NavLink>
                :
                <></>}
              {isHost ?
                <NavLink to={`/study/edit?name=${studyName}`} state={{ studyId: studyId, studyName: studyName }} className={styles.studyRevice_button}>
                  <div>
                    <img src={process.env.PUBLIC_URL + '/img/setting_button.png'}
                      className={styles.info_button} />스터디정보수정
                  </div>
                </NavLink>
                :
                <></>
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
