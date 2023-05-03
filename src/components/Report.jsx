import React from 'react'
import styles from '../css/Report.module.css'

export default function Report({closeModal}) {
  return (
    <div className={styles.report_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation}>
      Report
      </div>
    </div>
  )
}
