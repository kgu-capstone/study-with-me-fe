import React, {Component, useEffect, useState} from 'react';
import styles from '../css/Report.module.css'
import { authApi } from '../services/api';
import Avatar from "boring-avatars";

export default function Report({closeModal, reporteeId}) {

  const memberId = localStorage.getItem("id")
  let [memberNickname, setMemberNickname] = useState('');

  useEffect(() => {
    authApi.get(`members/${memberId}`)
    .then((response) => {
        setMemberNickname(response.data.nickname);
      })
      .catch((error) => {
          console.log(error);
      })
  })

  const reportbutton = () => {
    authApi.post(`members/${reporteeId}`)
    .then()
    .catch()
  }

  return (
    <div className={styles.report_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation}>
      
      <div className={styles.reportq}><b>{memberNickname}님</b>을 신고하시겠습니까?</div>
      <div className={styles.reason}>사유</div>
      <div className={styles.square}></div>
      
      <div onClick={() => reportbutton()}>
      <button className={styles.reportbuttonA}>신고하기</button>
      </div>
      </div>

      </div>
    
  );
}
