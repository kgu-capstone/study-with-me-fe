import React, { useEffect, useRef, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import UserName from '../UserName';
import { authApi } from '../../services/api';
import { useLocation } from 'react-router';
import { DriveEta, ResetTvOutlined } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import AttendRevice from '../AttendRevice';


export default function Attend() {

  // studyId
  const location = useLocation()
  const studyId = location.state?.studyId
  const [studyName, setStudyName] = useState('');


  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  }

  const onDragEnd = () => {
    setIsDrag(false);
  }

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      }
      else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  }

  const throttle = (func, ms) => {
    let throttle = false;
    return (...args) => {
      if (!throttle) {
        throttle = true;
        setTimeout(() => {
          func(...args);
          throttle = false;
        }, ms);
      }
    }
  }

  const delay = 10;
  const onThrottleDragMove = throttle(onDragMove, delay);



  const [host, setHost] = useState({});
  const [attend, setAttend] = useState([]);
  const [attendInfo, setAttendInfo] = useState([]);


  const [attendWeek, setAttendWeek] = useState([]);

  // 출석 정보 조회 api
  useEffect(() => {
    //스터디 이름
    authApi.get(`studies/${studyId}`)
      .then((response) => {
        setStudyName(response.data.name)
      })
      .catch((err) => console.log(err.data.message))
    //참여자 이름 조회
    authApi.get(`studies/${studyId}/participants`)
      .then((response) => {
        setHost(response.data.host);
        setAttend(response.data.participant)
      })

    // 출석정보 조회
    authApi.get(`studies/${studyId}/attendances`)
      .then((response) => {
        console.log(response.data.result);

        setAttendInfo(response.data.result)

      }).catch((err) => {
        console.log(err.data.message);

      })

    // 주차 개수 조회
    authApi.get(`studies/${studyId}/weeks`)
      .then((response) => {
        let tempCount = []
        for (let count = 0; count < response.data.weeks.length; count++) {
          tempCount[count] = response.data.weeks[count].week
        }
        setAttendWeek(tempCount);
      })

  }, [])



  // 팀장위임
  const delegation = (participantId) => {
    if (window.confirm('팀장을 위임하시겠습니까?')) {
      authApi.patch(`studies/${studyId}/participants/${participantId}/delegation`)
        .then((response) => {
          alert("팀장을 위임하였습니다.")
          window.location.reload();
        })
        .catch((err) => {
          alert(err.response.message)
        })
    }
  }



  return (
    <div className={`${styles.right_container}`}>
      <div className={`${styles.attend_contianer}`}>
        <div className={`${styles.attend_name_contianer}`}>
          <div className={`${styles.attend_name_field} ${styles.regular_24}`}>
            <p>이름</p>
          </div>
          {
            attendInfo.length > 0 && attendInfo.map((result) => (
              result.member.id == host.id && result.member.participantStatus == "APPROVE" ?
                <>
                  <div className={`${styles.attend_participant_name_container}`}>
                    <img width={24} height={24} className={styles.attend_cronwimg} src={process.env.PUBLIC_URL + "/img/crown_red.png"}
                    />
                    <UserName userNickname={result.member.nickname} userId={result.member.id} />
                  </div>
                </>
                :
                result.member.participantStatus == "APPROVE" &&
                <div className={`${styles.attend_participant_name_container}`}><img width={24} height={24} className={styles.attend_cronwimg} src={process.env.PUBLIC_URL + "/img/crown_gray.png"}
                  onClick={() => delegation(result.member.id)}
                />
                  <UserName userNickname={result.member.nickname} userId={result.member.id} />
                </div>
            ))
          }
        </div>



        <div className={`${styles.attend_weeks_contianer}`}
          ref={scrollRef}
          onMouseDown={onDragStart}
          onMouseMove={isDrag ? onThrottleDragMove : null}
          onMouseUp={onDragEnd}
        >
          <div className={styles.attend_weeks_count_contianer}>
            {attendWeek && attendWeek.map((week) => {
              return (
                <div>
                  <div className={`${styles.attend_each_weeks}`}>
                    <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                      <p>{week}주차</p>
                    </div>
                  </div>
                  {
                    attendInfo.length > 0 && attendInfo.map((result) => (
                      result.member.participantStatus == "APPROVE" && result.summaries.map((status) => (
                        status.week == week ?
                          <div className={styles.attend_each_user_status}>
                            <div>
                              <AttendRevice status={status} memberId={result.member.id} studyId={studyId} hostId={host.id} />
                            </div>
                          </div>
                          :
                          <div className={styles.attend_each_user_status}>
                          </div>
                      ))
                    ))
                  }
                </div>
              )
            })}
          </div>
        </div>





      </div>
      <div className={styles.attend_legend_contianer}>
        <div className={styles.attend_each_legend}>
          <div className={styles.attend_attendance}></div><p className={styles.attend_text}>출석</p>
        </div>
        <div className={styles.attend_each_legend}>
          <div className={styles.attend_late}></div><p className={styles.attend_text}>지각</p>
        </div>
        <div className={styles.attend_each_legend}>
          <div className={styles.attend_absent}></div><p className={styles.attend_text}>결석</p>
        </div>



      </div>
    </div>


  )
}
