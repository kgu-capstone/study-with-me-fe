import React, { useEffect, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import { authApi } from '../../services/api';
import { Link, NavLink } from 'react-router-dom';

export default function StudyInfo({studyId}) {

  studyId = 3

  // 사용자 id get
  const memberId = localStorage.getItem("id")

  // 서버에서 스터디 info 받아오기
  const [studyThumbnail, setStudyThumbnail] = useState('');
  const [studyCategory, setStudyCategory] = useState('');
  const [studyName, setStudyName] = useState('');
  const [studyCurrentMembers, setStudyCurrentMembers] = useState(0);
  const [studyMaxMembers, setStudyMaxMembers] = useState(0);

  const [isHost, setIsHost] = useState(false)


  useEffect(() => {
    authApi.get(`studies/${studyId}`)
    .then((response) => {
      
      setStudyThumbnail(response.data.thumbnail);
      setStudyCategory(response.data.category);
      setStudyName(response.data.name);
      setStudyCurrentMembers(response.data.currentMembers);
      setStudyMaxMembers(response.data.maxMembers);
      if(memberId == response.data.host.id){
        setIsHost(true)
      }

      document.getElementsByClassName(`${styles.info_container}`)[0].style.backgroundColor = `${response.data.thumbnailBackground}`;
    })
    .catch((e) => {
      console.log(e)
    })
  })

  
    return (
      <div>
        <div className={styles.info_container}>
          <div className={styles.infoes}>
            <div className={styles.info_left}>
              <div className={styles.info_left_element}>
                <img width={132} height={132} src={process.env.PUBLIC_URL + `/img/studyprofiles/${studyThumbnail}`}/>
              </div>
            </div>
            <div className={styles.info_right}>
              <div className={styles.info_right_element}>
                <p className={styles.info_category}>#{studyCategory}</p>
                <p className={`${styles.bold_24} ${styles.info_studyname}`}>{studyName}</p>
                <p className={styles.regular_18}>{studyCurrentMembers} / {studyMaxMembers}</p>
              </div>
              {isHost ?
              <div className={`${styles.info_right_buttons}`}>       
                <NavLink to="/ApplicantList" studyId={studyId} className={styles.applicantList_button}>
                  <div>
                    <img  src={process.env.PUBLIC_URL + '/img/participate_button.png'}
                    className={styles.info_button}/>신청한 사람 보기
                  </div>
                </NavLink>

                <NavLink to="/StudyRevice" state={{studyId : studyId, studyName : studyName}} className={styles.studyRevice_button}>
                  <div>
                  <img  src={process.env.PUBLIC_URL + '/img/setting_button.png'}
                  className={styles.info_button}/>스터디정보수정
                  </div>
                </NavLink>
                </div>
              :
              <></>
              }
              
            </div>
          </div>
        </div>
      </div>
    )
}
