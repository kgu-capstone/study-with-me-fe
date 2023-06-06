import React, { useEffect, useState } from 'react'
import StudyInfo from '../components/StudyWork/StudyInfo'
import styles from '../css/ApplicantList.module.css'
import ApplicantListUserName from '../components/ApplicantListUserName'
import { authApi } from '../services/api'
import { useLocation } from 'react-router'
import StudyRejectReason from '../components/Modal/StudyRejectReason'
import UserName from '../components/UserName'
import Profile from '../components/Modal/Profile'

export default function ApplicantList() {

  // studyId
  const location = useLocation()
  const studyId = location.state?.studyId


  // 정보 불러오기
  const [applicantsList, setApplicantsList] = useState([]);
  const [isApplicantsUpdate, setIsApplicantsUpldate] = useState(0);

  useEffect(() => {
    authApi(`studies/${studyId}/applicants`)
      .then((response) => {
        setApplicantsList(response.data.applicants)
      })
      .catch((e) => console.log(e))

  }, [isApplicantsUpdate])


  // 승인 버튼
  const handleStudyApprove = (applierId, nickName) => {
    if (window.confirm('승인하시겠습니까?')) {
      authApi(`studies/${studyId}/applicants/${applierId}/approve`)
        .then((response) => {
          alert(`${nickName}님을 승인하였습니다`);
          setIsApplicantsUpldate(isApplicantsUpdate + 1)
        })
        .catch((e) => console.log(e));
    }
  }



  // 거절 모달

  const [input_reject_reason, setInput_reject_reason] = useState(false);

  //프로필 모달
  const [isview_profile_modal, setIsview_profile_modal] = useState(false);

  return (
    <div>
      <StudyInfo />
      <div className={styles.container}>
        <div className={styles.child_container}>
          <div>
            <p className={`${styles.title}`}>스터디 참여자 목록</p>
          </div>

          <div>

            <table border="0" align='center'>

              <div className={styles.field}>
                <th className={styles.indexth}><div className={styles.field1}>순번</div></th>
                <th className={styles.nameth}><div className={styles.field2}>이름</div></th>
                <th className={styles.buttonth}><div className={styles.field3}>참여 결정</div></th>
              </div>


              {
                applicantsList && applicantsList.map((item, index) => {
                  return (
                    <tr>
                      <div className={styles.list}>

                        <td className={styles.indextd}><div className={styles.data1}>{index + 1}</div></td>

                        <td className={styles.nametd}>
                          <p onClick={() => setIsview_profile_modal(true)}>{item.nickname}</p>
                          {isview_profile_modal && <Profile closeModal={setIsview_profile_modal} userId={item.id} />}
                        </td>

                        <td className={styles.buttontd}><div className={styles.data3}>
                          <div className={styles.approve_button} onClick={() => handleStudyApprove(item.id, item.nickname)}>
                            승인
                          </div>
                          <div className={styles.reject_button} onClick={() => setInput_reject_reason(true)}>
                            거절
                          </div>
                          <div>
                            {input_reject_reason && <StudyRejectReason closeModal={setInput_reject_reason} studyId={studyId} applierId={item.id} applierName={item.nickname} />}
                          </div>
                        </div>
                        </td>

                      </div>

                    </tr>

                  )
                })
              }
            </table>


          </div>

        </div>
      </div>
    </div>
  )
}
