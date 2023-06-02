import React, { useEffect, useRef, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import UserName from '../UserName';
import { authApi } from '../../services/api';
import { useLocation } from 'react-router';

export default function Attend() {

  // studyId
  const location = useLocation()
  const studyId = location.state?.studyId


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



  const [host, setHost] = useState('');
  const [attend, setAttend] = useState([]);
  const [attendLength, setAttendLength] = useState([]);
  const [attendInfo, setAttendInfo] = useState({});


  const [attendWeek, setAttendWeek] = useState([]);

  // 출석 정보 조회 api
  useEffect(() => {

    // authApi.get(`studies/${studyId}/attendances`)
    //   .then((response) => {
    //     //사용자 이름
    //     setAttendName(response.data.summaries["1"])

    //     //주차 길이 + 주차 정보
    //     let lengthtemp = []
    //     let infotemp = []
    //     for (let i = 1; i <= Object.keys(response.data.summaries).length; i++) {
    //       lengthtemp.push(i)
    //       infotemp.push(response.data.summaries[i])
    //     }
    //     setAttendLength(lengthtemp);
    //     setAttendInfo(infotemp);


    //     console.log(lengthtemp);
    //     console.log(infotemp);

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //참여자 이름 조회
    authApi.get(`studies/${studyId}/participants`)
      .then((response) => {
        setHost(response.data.host);
        setAttend(response.data.participant)
      })

    // 출석정보 조회
    authApi.get(`studies/${studyId}/attendances`)
      .then((response) => {
        console.log(response.data.summaries);
        console.log(response.data.summaries);
        // for (let i = 0; i < response.data.summaries.lenght; i++) {
        //   console.log(response.data.summaries[i]);
        // }

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
    authApi.patch(`studies/${studyId}/participants/${participantId}/delegation`)
      .then((response) => {
        alert("팀장을 위임하였습니다.")
      })
      .catch((err) => {
        alert(err.response.message)
      })
  }


  return (
    <div className={`${styles.right_container}`}>
      <div className={`${styles.attend_contianer}`}>

        {/* 우저 이름들 */}
        <div className={`${styles.attend_name_contianer}`}>
          <div className={`${styles.attend_name_field} ${styles.regular_24}`}>
            <p>이름</p>

          </div>
          <div className={`${styles.attend_names} ${styles.regular_16}`}>
            <div className={`${styles.attend_host_name_contianer}`}>
              <img width={24} height={24} className={styles.attend_cronwimg} src={process.env.PUBLIC_URL + "/img/crown_red.png"}
              />
              {host && <UserName userNickname={host.nickname} userId={host.id} />}
            </div>

            <div className={`${styles.attend_participant_name_container}`}>

              <img width={24} height={24} className={styles.attend_cronwimg} src={process.env.PUBLIC_URL + "/img/crown_gray.png"}
                onClick={() => delegation(2)}
              />
              <UserName userNickname={"천사"} userId={2} />
            </div>

            <div className={`${styles.attend_participant_name_container}`}>
              <img width={24} height={24} className={styles.attend_cronwimg} src={process.env.PUBLIC_URL + "/img/crown_gray.png"} />
              <UserName userNickname={"악마"} userId={2} />
            </div>

            <div className={`${styles.attend_participant_name_container}`}>
              <img width={24} height={24} className={styles.attend_cronwimg} src={process.env.PUBLIC_URL + "/img/crown_gray.png"} />
              <UserName userNickname={"민듀공쥬"} userId={2} />
            </div>
            {/* {
              attend && attend.map((item, index) => {
                return (
                  <div className={`${styles.attend_participant_name_container}`}>
                    <img width={24} height={24} className={styles.attend_cronwimg} src={process.env.PUBLIC_URL + "/img/crown_gray.png"} />
                    <UserName userNickname={item.participant.nickname} userId={item.participant.id} />
                  </div>
                )
              })
            } */}

          </div>
        </div>


        {/* 주차별 */}
        <div className={`${styles.attend_weeks_contianer}`}
          ref={scrollRef}
          onMouseDown={onDragStart}
          onMouseMove={isDrag ? onThrottleDragMove : null}
          onMouseUp={onDragEnd}
        >
          <div className={styles.attend_weeks_count_contianer}>
            {attendWeek && attendWeek.map((week) => {
              return (
                <>
                  <div className={`${styles.attend_each_weeks}`}>
                    <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                      <p>{week}주차</p>
                    </div>
                  </div>
                </>
              )
            })}
          </div>

          <div>
            <div className={styles.attend_each_user_status}>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p className={styles.attend_late_color}>지각</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p className={styles.attend_absent_color}>결석</p>
              </div>


            </div>
            <div className={styles.attend_each_user_status}>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p className={styles.attend_late_color}>지각</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>

            </div>
            <div className={styles.attend_each_user_status}>
              <div className={styles.atten_each_status}>
                <p className={styles.attend_late_color}>지각</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p className={styles.attend_absent_color}>결석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>

            </div>
            <div className={styles.attend_each_user_status}>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p className={styles.attend_not_color}>미출결</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>
              <div className={styles.atten_each_status}>
                <p>출석</p>
              </div>

            </div>

          </div>

          {/* {
            // attendLength && attendLength.map((week, index) => {
            //   return (
            //     <>
            //       <div className={`${styles.attend_each_weeks}`}>
            //         <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
            //           <p>{week}주차</p>

            //         </div>

            //         <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
            //           {
            //             attendInfo[index].map((attend, attendindex) => {
            //               return (
            //                 <>
            //                   <p>{attend.status}</p>
            //                 </>
            //               )

            //             })
            //           }

            //         </div>
            //       </div>
            //     </>
            //   )

          // })
          // */}




        </div>

      </div>
    </div >


  )
}
