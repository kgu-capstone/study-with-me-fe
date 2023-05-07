import React from 'react'
import styles from '../css/StudyProfileChoice.module.css'

export default function StudyProfileChoice({closeModal, setProfile}) {

    const profileList = [
        'language_001.png',
        'certifacate_computerLiteracy.png',
        'etc_teacherExam.png',
        'interview_samsung.png',
        'language_toeic.png',
        'ncs_ncs.png',
        'programming_baekjoon.png',
        'certifacate_computerLiteracy.png',
        'etc_teacherExam.png',
        'interview_samsung.png',
        'language_toeic.png',
        'ncs_ncs.png',
        'programming_baekjoon.png',
    ]


    const choiceThumbnail = (name) => {
        setProfile(name);
        closeModal(false);
    }

  return (
    <div className={styles.profile_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.profiles}>
        {
            profileList.map((name) => {
                return(
                    <>
                        <div className={styles.each_profile} onClick={() => choiceThumbnail(name)}>
                            <img width={158} height={158} src={process.env.PUBLIC_URL + `/img/studyprofiles/${name}`}/>
                        </div>
                    </>
                )
            })
        }
        </div>
      </div>
    </div>
  )
}
