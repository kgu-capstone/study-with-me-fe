import React, { useRef, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import UserName from '../UserName';

export default function Attend() {

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
    if(isDrag) {
      const {scrollWidth, clientWidth, scrollLeft} = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if(scrollLeft === 0){
        setStartX(e.pageX);
      }
      else if(scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  }

  const throttle = (func, ms) => {
    let throttle = false;
    return (...args) => {
      if( !throttle){
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

    return (
          <div className={`${styles.right_container}`}>
            <div className={`${styles.attend_contianer}`}>  
              <div className={`${styles.attend_name_contianer}`}>
                <div className={`${styles.attend_name_field} ${styles.regular_24}`}>
                  <p>이름</p>
                  
                </div>
                <div className={`${styles.attend_names} ${styles.regular_16}`}>
                  <UserName userNickname={"닉네임"}/>
                  <UserName userNickname={"닉네임"}/>
                  <UserName userNickname={"닉네임"}/>
                  <UserName userNickname={"닉네임"}/>
                  <UserName userNickname={"닉네임"}/>
                  <UserName userNickname={"닉네임"}/>
                </div>                
              </div>          

              {/* 주차별 */}
              <div className={`${styles.attend_weeks_contianer}`} 
                ref={scrollRef}
                onMouseDown={onDragStart}
                onMouseMove={isDrag ? onThrottleDragMove : null}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
                >
                
                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>2주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>


                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>2주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>

                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>1주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>

                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>1주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>
                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>1주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>
                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>1주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>

                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>1주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>


                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>1주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>

                <div className={`${styles.attend_each_weeks}`}>
                  <div className={`${styles.attend_weeks_field} ${styles.regular_24}`}>
                    <p>1주차</p>
                    
                  </div>

                  <div className={`${styles.attend_weeks} ${styles.regular_16}`}>
                    <p>출석</p>
                    <p>미출결</p>
                    <p>출석</p>
                    <p>결석</p>
                    <p>지각</p>
                    <p>-</p>
                  </div>
                </div>
                
              </div>
              
            </div>
          </div>


    )
}
