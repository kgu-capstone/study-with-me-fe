import React, {Component, useEffect, useState} from 'react';
import styles from '../css/Profile.module.css'
import { authApi } from '../services/api';
import Avatar from "boring-avatars";

export default function Profile({closeModal}) {
  const memberId = localStorage.getItem("id")
  let [memberNickname, setMemberNickname] = useState('');
  let [memberEmail, setMemberEmail] = useState('');
  let [memberBirth, setMemberBirth] = useState('');
  let [memberGender, setMemberGender] = useState('');
  let [memberRegion, setMemberRegion] = useState('');
  let [memberInterest, setMemberInterest] = useState('');
  
  useEffect(() => {
      authApi.get(`members/${memberId}`)
      .then((response) => {
          setMemberNickname(response.data.nickname);
          setMemberEmail(response.data.email);
          setMemberBirth(response.data.birth);
          setMemberGender(response.data.gender);
          setMemberRegion(response.data.region);
          setMemberInterest(response.data.interests);
      })
      .catch((error) => {
          console.log(error);
      })
  })
  return (
    
    <div className={styles.profile_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.nicknameProfile}>{memberNickname}님 프로필</div>
    <div className={styles.iprof}>
    <Avatar
                    size={158}
                    name="nick"
                    variant="beam"
                    colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                 />      
    </div>
    <div className={styles.labelA}>닉네임</div>
    <div className={styles.labelB}>나이</div>
    <div className={styles.labelC}>성별</div>
    <div className={styles.labelD}>지역</div>
    <div className={styles.labelE}>관심사</div>

    <div className={styles.Alabele}>{memberNickname}</div>
    <div className={styles.Blabele}>{memberBirth}</div>
    <div className={styles.Clabele}>{memberGender}</div>
    <div className={styles.Dlabele}>{memberRegion}</div>
    <div className={styles.Elabele}>{memberInterest}</div>
    
    <div className={styles.squareA}></div>
    <div className={styles.astudy}>활동중인 스터디</div>
    <div className={styles.squareB}></div>
    <div className={styles.bstudy}>20자 리뷰</div>

    <div className={styles.percent}>출석률</div>
    <div className={styles.graph}> 
    <span>50%</span></div>

    </div>
    </div>
    
    
  )
}
