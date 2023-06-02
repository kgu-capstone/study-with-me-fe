import React, { useState } from 'react'
import styles from '../css/ApplicantListUserName.module.css'
import Profile from './Modal/Profile'
import UserName from './UserName';

export default function ApplicantListUserName({ userId, userName }) {

  //프로필 모달
  const [isview_profile_modal, setIsview_profile_modal] = useState(false);


  return (
    <div>
      <UserName userNickname={userName} userId={userId} />
    </div>
  )
}
