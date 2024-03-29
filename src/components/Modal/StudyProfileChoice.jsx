import React from "react";
import styles from "../../css/StudyProfileChoice.module.css";

export default function StudyProfileChoice({ closeModal, setProfile }) {
  const profileList = [
    "certification_CIP.png",
    "certification_EIP.png",
    "certification_CSSD.png",
    "certification_KH.png",
    "certification_GTQ.png",
    "interview_samsung.png",
    "interview_hyundai.png",
    "interview_LG.png",
    "interview_NCS.png",
    "ncs_ncs.png",
    "language_IELTS.png",
    "language_JLPT.png",
    "language_JPT.png",
    "language_Opic.png",
    "language_TEPS.png",
    "language_TOEFL.png",
    "language_TOEIC.png",
    "programming_C.png",
    "programming_Java.png",
    "programming_JavaScript.png",
    "programming_Python.png",
    "programming_Baekjoon.png",
    "programming_CSS.png",
    "programming_HTML.png",
    "etc_teacherExam.png",
  ];

  const choiceThumbnail = (name) => {
    setProfile(name);
    closeModal(false);
  };

  return (
    <div className={styles.profile_container} onClick={() => closeModal(false)}>
      <div
        className={styles.modal_container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.profiles}>
          {profileList.map((name) => {
            return (
              <>
                <div
                  className={styles.each_profile}
                  onClick={() => choiceThumbnail(name)}
                >
                  <img
                    width={158}
                    height={158}
                    src={process.env.PUBLIC_URL + `/img/studyprofiles/${name}`}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
