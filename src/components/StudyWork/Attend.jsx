import React, { Component } from 'react'
import styles from '../../css/StudyWork.module.css';

export default class Attend extends Component {
  render() {
    return (
          <div className={`${styles.right_container}`}>
            <div className={`${styles.attend_contianer}`}>  
              <div className={`${styles.attend_name_contianer}`}>
                <div className={`${styles.attend_name_field} ${styles.regular_24}`}>
                  <p>이름</p>
                  
                </div>
                <div className={`${styles.attend_names} ${styles.regular_16}`}>
                  <p>닉네임</p>
                  <p>닉네임</p>
                  <p>닉네임</p>
                  <p>닉네임</p>
                  <p>닉네임</p>
                  <p>닉네임</p>
                </div>                
              </div>          

              {/* 주차별 */}
              <div className={`${styles.attend_weeks_contianer}`}>
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
                
              </div>
              
            </div>
          </div>


    )
  }
}
