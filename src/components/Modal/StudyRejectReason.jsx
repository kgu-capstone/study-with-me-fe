import React, { useState } from 'react'
import styles from '../../css/ApplicantList.module.css'
import { authApi } from '../../services/api'


export default function StudyRejectReason({ closeModal, studyId, applierId, applierName }) {


  const [rejectReson, setRejectReason] = useState('');
  const [isnoninput, isNoninput] = useState('');

  // 거절 버튼
  const handleStudyReject = (applierId, nickName) => {

    authApi.patch(`studies/${studyId}/applicants/${applierId}/reject`)
      .then((response) => {
        alert(`${nickName}님을 거절하였습니다.`);
        closeModal(false);
        window.location.reload()
      })
      .catch((e) => {
        if (e.response.status === 400) {
          isNoninput(e.response.message);
        }
      })

  }


  return (
    <div className={styles.reject_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <p className={styles.reject_title}><strong>{applierName}</strong> 님의 거절사유를 입력해주세요.</p>
        <textarea className={styles.inputreject} value={rejectReson} onChange={(e) => setRejectReason(e.target.value)}></textarea>

        <div className={styles.reject_button_inmodal}>
          <div onClick={() => handleStudyReject(applierId)}>거절하기</div>
        </div>
        <div className={styles.warningMessage}>{isnoninput}</div>
      </div>


    </div>
  )
}
