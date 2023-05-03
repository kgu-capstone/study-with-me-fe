import React, { useState } from 'react'
import styles from '../css/UserName.module.css'
import Profile from './Profile'
import Report from './Report'

export default function UserName({userNickname}) {

    //드롭다운

    const [userNameContainerCss, setUserNameContainerCss] = useState(`${styles.container}`);

    const handleUserNameContainer = (is) =>{

        if(is == true){
            setUserNameContainerCss(`${styles.view_container}`)
        }else{
            setUserNameContainerCss(`${styles.container}`)
        }
    }
        


    //프로필 모달
    const [isview_profile_modal, setIsview_profile_modal] = useState(false);


    //신고하기 모달
    const [isview_report_modal, setIsview_report_modal] = useState(false);

    // onMouseOut={() => handleUserNameContainer(false)}

  return (
    <div className={styles.component_container} onMouseLeave={() => handleUserNameContainer(false)}>
        <div className={userNameContainerCss} >
            <div>
            <div className={styles.view_profile} onClick={() => setIsview_profile_modal(true)}>프로필</div>
            <div className={styles.report} onClick={() => setIsview_report_modal(true)}>신고하기</div>
            </div>
            
        </div>
        
        <div className={styles.userName} onClick={() => handleUserNameContainer(true)}>
            <p>{userNickname}</p>
        </div>

<div>
{isview_profile_modal && <Profile closeModal = {setIsview_profile_modal}/>}
</div>

<div>
{isview_report_modal && <Report closeModal = {setIsview_report_modal}/>}
</div>

    </div>
  )
}
