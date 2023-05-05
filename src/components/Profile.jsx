import React from 'react'
import styles from '../css/Profile.module.css'

export default function Profile({closeModal}) {
  return (
    <div className={styles.profile_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
      Profile
      </div>
    </div>
  )
}
