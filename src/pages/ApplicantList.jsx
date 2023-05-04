import React from 'react'
import StudyInfo from '../components/StudyWork/StudyInfo'
import styles from '../css/ApplicantList.module.css'
import ApplicantListUserName from '../components/ApplicantListUserName'

export default function ApplicantList() {
  return (
    <div>
      <StudyInfo />
      <div className={styles.container}>
        <div className={styles.child_container}>

          <div>
          <p className={`${styles.title}`}>스터디 참여자 목록</p>
          </div>

          <div>


            <div className={styles.field}>
              <div className={styles.field1}>순번</div>
              <div className={styles.field2}>이름</div>
              <div className={styles.field3}>참여 결정</div>
            </div>




            <div className={styles.list}>
              <div className={styles.data1}>1</div>
              <div className={styles.data2}><ApplicantListUserName userid={"닉네임"} /></div>
              <div className={styles.data3}>
                <div className={styles.approve_button}>
                  승인
                </div>
                <div className={styles.reject_button}>
                  거절
                </div>
              </div>
            </div>



            <div className={styles.list}>
              <div className={styles.data1}>1</div>
              <div className={styles.data2}><ApplicantListUserName userid={"닉네임"} /></div>
              <div className={styles.data3}>
                <div className={styles.approve_button}>
                  승인
                </div>
                <div className={styles.reject_button}>
                  거절
                </div>
              </div>
            </div>



          </div>




          

        </div>
      </div>
    </div>

  )
}
