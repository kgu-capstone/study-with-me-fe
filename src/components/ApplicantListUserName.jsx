import React, { useState } from 'react'
import styles from '../css/ApplicantListUserName.module.css'
import Profile from './Profile'

export default function ApplicantListUserName({userId, userName}) {

  //프로필 모달
  const [isview_profile_modal, setIsview_profile_modal] = useState(false);


  return (
    <div>
        <div className={styles.userName} onClick={() => setIsview_profile_modal(true)}>
            <p>{userName}</p>
        </div>
        <div>
        {isview_profile_modal && <Profile closeModal = {setIsview_profile_modal}/>}
        </div>
    </div>
  )
}
