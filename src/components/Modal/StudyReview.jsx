import React, { useState } from 'react'
import styles from '../../css/StudyReview.module.css'
import { authApi } from '../../services/api'

export default function StudyReview({ closeModal, studyId, studyName, studyThumbnail }) {

    const [text, setText] = useState('');
    const wirteReview = () => {
        authApi.post(`studies/${studyId}/review`, text)
            .then(res => closeModal(false))
            .catch(err => console.log(err))
    }
    return (
        <div className={styles.reivew_container} onClick={() => closeModal(false)}>
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <div className={styles.thumbnail}><img width={82} height={82} src={process.env.PUBLIC_URL + `/img/studyprofiles/${studyThumbnail}`} /></div>
                <div className={styles.title}><span className={styles.span}>{studyName}</span>스터디 리뷰</div>
                <div className={styles.input_title}>리뷰</div>
                <div><textarea type='text' className={styles.input} value={text} onChange={() => setText()} /></div>
                <div>
                    <button onClick={() => wirteReview()} className={styles.button}>리뷰쓰기</button>
                </div>



            </div>
        </div>
    )
}
