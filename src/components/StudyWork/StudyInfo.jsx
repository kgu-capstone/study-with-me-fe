import React, { Component } from 'react'
import styles from '../../css/StudyWork.module.css';

export default class StudyInfo extends Component {
  render() {
    return (
      <div className={styles.info_container}>
        <div className={styles.infoes}>
          <div className={styles.info_left}>
            <div className={styles.info_left_element}>
              <img src={process.env.PUBLIC_URL + '/img/study_profile.svg'}/>
            </div>
          </div>
          <div className={styles.info_right}>
            <div className={styles.info_right_element}>
              <p className={styles.info_category}>#분야</p>
              <p className={`${styles.bold_24} ${styles.info_studyname}`}>스터디 이름</p>
              <p className={styles.regular_18}>0 / 10</p>
            </div>
            <div className={`${styles.info_right_buttons}`}>
              <div>
                스터디정보수정
              </div>
              <div>
                신청한 사람 보기
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
