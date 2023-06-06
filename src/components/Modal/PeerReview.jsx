import React, { useState } from 'react'
import styles from '../../css/PeerReview.module.css'
import { authApi } from '../../services/api';

export default function PeerReview({ closeModal, userId, userName }) {

    const [review_input, setReview_input] = useState('');

    const wirte_review = () => {
        if (review_input == '') {
            alert("리뷰를 입력해주세요");
        }
        else {
            authApi.post(`members/${6}/review`, {
                "content": review_input
            }).then(res => {
                closeModal(false);
            }).catch((error) => {
                alert(error.data.message)
            })
        }

    }



    return (
        <div className={styles.peer_container} >
            <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
                <div onClick={() => closeModal(false)}
                    className={styles.x_button}
                >
                    <img src={process.env.PUBLIC_URL + "/img/x_button.png"} />
                </div>
                <div className={styles.title}>
                    {userName}님 리뷰쓰기
                </div>
                <div className={styles.warning}>
                    <img className={styles.warning_button} src={process.env.PUBLIC_URL + "/img/warningbutton.png"} />
                    PEER REVIEW는 한 번만 가능합니다.
                </div>
                <div className={styles.input_container}>
                    <input type='text' value={review_input} onChange={(e) => setReview_input(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.info_container}>
                    20자이하로만 가능합니다.
                </div>
                <div className={styles.button_container}>
                    <button className={styles.button} onClick={() => wirte_review()}>
                        리뷰쓰기
                    </button>
                </div>

            </div>
        </div>
    )
}
