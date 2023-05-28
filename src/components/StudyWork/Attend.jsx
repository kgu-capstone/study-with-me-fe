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




  const [attendName, setAttendName] = useState([]);
  const [attendLength, setAttendLength] = useState([]);
  const [attendInfo, setAttendInfo] = useState({});


  // 출석 정보 조회 api
  useEffect(() => {

    authApi.get(`studies/${studyId}/attendances`)
      .then((response) => {
        //사용자 이름
        setAttendName(response.data.summaries["1"])

        //주차 길이 + 주차 정보
        let lengthtemp = []
        let infotemp = []
        for (let i = 1; i <= Object.keys(response.data.summaries).length; i++) {
          lengthtemp.push(i)
          infotemp.push(response.data.summaries[i])
        }
        setAttendLength(lengthtemp);
        setAttendInfo(infotemp);


        console.log(lengthtemp);
        console.log(infotemp);

      })
      .catch((err) => {
        console.log(err);
      })

  }, [])




  return (
    <div className={`${styles.right_container}`}>
      <div className={`${styles.attend_contianer}`}>

        {/* 우저 이름들 */}
        <div className={`${styles.attend_name_contianer}`}>
          <div className={`${styles.attend_name_field} ${styles.regular_24}`}>
            <p>이름</p>

          </div>
          <div className={`${styles.attend_names} ${styles.regular_16}`}>

            {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ api 테스트 전 지워야 함 @@@@@@@@@@@@@@@@@@@@@@@*/}
            <UserName userNickname={"닉네임"} userId={10} />

            {
              attendName ? attendName.map((item, index) => {
                return (
                  <>
                    <UserName userNickname={item.participant.nickname} userId={item.participant.id} />
                  </>
                )
              })
                :
                <></>
            }

          </div>
        </div>


        {/* 주차별 */}
        <div className={`${styles.attend_weeks_contianer}`}
          ref={scrollRef}
          onMouseDown={onDragStart}
          onMouseMove={isDrag ? onThrottleDragMove : null}
          onMouseUp={onDragEnd}
        >

          {
            attendLength ? attendLength.map((week, index) => {
              return (
                <>
                  <div className={`${styles.attend_each_weeks}`}>
                    <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                      <p>{week}주차</p>

                    </div>

                    <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                      {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@ api 테스트 전 지워야 함 @@@@@@@@@@@@@@@@@@@@@@@*/}
                      <p>출석</p>


                      {
                        attendInfo[index].map((attend, attendindex) => {
                          return (
                            <>
                              <p>{attend.status}</p>
                            </>
                          )

                        })
                      }

                    </div>
                  </div>
                </>
              )

            })
              :
              <>
              </>
          }




        </div>

      </div>
    </div>


  )
}
