import React, { useEffect, useState } from 'react'
import StudyInfo from '../components/StudyWork/StudyInfo'
import styles from '../css/ApplicantList.module.css'
import ApplicantListUserName from '../components/ApplicantListUserName'
import { authApi } from '../services/api'
import { useLocation } from 'react-router'
import StudyRejectReason from '../components/StudyRejectReason'

export default function ApplicantList() {

  const location = useLocation()
  const studyId = location.state?.studyId

  // 정보 불러오기
  let applicantsList = [];
  
  useEffect(() => {
    authApi(`studies/${studyId}/applicants`)
    .then((response) => {
      for(let i=0; i< response.data.applicants.length; i++){
        applicantsList[i] = response.data.applicants[i]
      }
    })
    .catch((e) => console.log(e))
  })


  // 승인 버튼
  const handleStudyApprove = (applierId, nickName) => {
    authApi(`studies/${studyId}/applicants/${applierId}/approve`)
    .then((response) => {
      alert(`${nickName}님을 승인하였습니다`);
      window.location.href = `${process.env.REACT_APP_BASE_URL}ApplicantList`; 
    })
    .catch((e) => console.log(e));
  }



  // 거절 모달

  const [input_reject_reason, setInput_reject_reason] = useState(false);


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
                applicantsList.map((item, index) => {
                  return(
                    <tr>
                      <div className={styles.list}>
                      
                      <td className={styles.indextd}><div className={styles.data1}>{index+1}</div></td>
                      
                      <td className={styles.nametd}><div className={styles.data2}><ApplicantListUserName userid={item.id} userName={item.nickname}/></div></td>
                      
                      <td className={styles.buttontd}><div className={styles.data3}>
                        <div className={styles.approve_button} onClick={() => handleStudyApprove(item.id, item.nickname)}>
                          승인
                        </div>
                        <div className={styles.reject_button} onClick={() => setInput_reject_reason(true)}>
                          거절
                        </div>
                        <div>
                        {input_reject_reason && <StudyRejectReason closeModal = {setInput_reject_reason} studyId={studyId} applierId={item.id} applierName={item.nickname}/>}
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
