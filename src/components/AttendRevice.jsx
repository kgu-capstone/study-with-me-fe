import React, { useState } from 'react'
import styles from '../css/StudyWork.module.css';
import { authApi } from '../services/api';

export default function AttendRevice({ status, memberId, studyId, hostId }) {

    //출석수정
    const [attend_revice_contianer_css, setAttend_revice_contianer_css] = useState(`${styles.attend_revice_contianer_none}`);
    const veiwReviceAttend = () => {
        if (hostId == memberId) {
            //펼치기
            if (attend_revice_contianer_css == `${styles.attend_revice_contianer_none}`) {
                setAttend_revice_contianer_css(`${styles.attend_revice_contianer_block}`)
            } else {
                setAttend_revice_contianer_css(`${styles.attend_revice_contianer_none}`)
            }
        }

    }

    const reviceAttend = (reviceStatus) => {
        authApi.patch(`studies/${studyId}/attendance/${memberId}`,
            {
                "week": status.week,
                "status": reviceStatus
            })
            .then((response) => {
                setAttend_revice_contianer_css(`${styles.attend_revice_contianer_none}`);
                window.location.reload();
            })
            .catch((err) => console.log(err))
    }


    return (
        <div className={styles.attend_each_status}>
            <div className={attend_revice_contianer_css}>
                <div className={styles.attend_attendance_choice} onClick={() => reviceAttend("출석")}></div>
                <div className={styles.attend_late_choice} onClick={() => reviceAttend("지각")}></div>
                <div className={styles.attend_absent_choice} onClick={() => reviceAttend("결석")}></div></div>
            <div onClick={() => veiwReviceAttend()}>

                {
                    status.status == "출석" ?
                        <div className={styles.attend_attendance} ></div>
                        :
                        status.status == "지각" ?
                            <div className={styles.attend_late} ></div>
                            :
                            status.status == "결석" ?
                                <div className={styles.attend_absent} ></div>
                                :
                                <div className={styles.attend_null}><p>-</p></div>
                }</div>
        </div>
    )
}
