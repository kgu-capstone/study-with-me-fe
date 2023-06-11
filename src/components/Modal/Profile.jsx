import React, { Component, useEffect, useState, RechartsComponent } from 'react';
import styles from '../../css/Profile.module.css'
import { authApi } from '../../services/api';
import Avatar from "boring-avatars";
import PeerReview from './PeerReview';
import { NavLink } from "react-router-dom";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { defaultApi } from '../../services/api'
import axios from 'axios';

/*useEffect(()=>{
  defaultApi.get('members/1/attendances')
  .then((response) => {
    setMemberStatus(response.data.status);
    setMemberErrorCode(response.data.errorCode);
    setMemberMessage(response.data.message);
  })
  .catch((error) => {
    console.log(error);
  })
})*/

export default function Profile({ closeModal, userId }) {
  // 사용자 id get
  const memberId = localStorage.getItem("id")


  let [memberScore, setMemberScore] = useState(0);
  let [memberNickname, setMemberNickname] = useState('');
  let [memberBirth, setMemberBirth] = useState('');
  let [memberGender, setMemberGender] = useState('');
  let [memberRegion, setMemberRegion] = useState('');
  let [memberInterest, setMemberInterest] = useState('');

  const [activeStudy, setActiveStudy] = useState([]);

  // 데이터 변수 정의 및 초기화
  let data = [];

  // API 호출 함수
  async function fetchData() {
    try {
      const response = await authApi.get(`members/${memberId}/attendances`);
      const ATTENDANCE = response.data.result[0].count;
      const LATE = response.data.result[1].count;
      const ABSENCE = response.data.result[2].count;

      const data = [
        {
          name: 'RATE A',
          출석: 6,
          지각: 1,
          결석: 1
        },];
      setAttendanceData(data)
    } catch (error) {
      console.error('API 호출 오류:', error);
    }
  }




  useEffect(() => {
    authApi.get(`members/${userId}`)
      .then((response) => {
        setMemberNickname(response.data.nickname);
        setMemberBirth(response.data.birth);
        setMemberGender(response.data.gender);
        setMemberRegion(response.data.region);
        setMemberInterest(response.data.interests);
        setMemberScore(response.data.score);
      })
      .catch((error) => {
        console.log(error);
      })


    //활동중인
    authApi.get(`members/${userId}/studies/participate`)
      .then((response) => {
        setActiveStudy(response.data.result)
      })
    // //활동했던
    // authApi.get(`members/${userId}/studies/graduated`)
    //   .then((response) => {
    //     let templist = [...activeStudy]
    //     templist.concat(response.data.result);
    //     setActiveStudy(templist)
    //   })



    //리뷰
    authApi.get(`members/${userId}/reviews`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch(e => console.log(e))

  }, [])

  //PEERVIEW 쓰기
  const [isview_peerriew, setIsView_peerriew] = useState(false);

  //PEERVIEW 조회
  const [reviews, setReviews] = useState([]);


  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await authApi.get(`/members/${userId}/attendances`);
        const attendanceResult = response.data.result;

        const mappedData = attendanceResult.map((item) => {
          let statusLabel = '';
          switch (item.status) {
            case 'ATTENDANCE':
              statusLabel = '출석';
              break;
            case 'LATE':
              statusLabel = '지각';
              break;
            case 'ABSENCE':
              statusLabel = '결석';
              break;
            default:
              break;
          }

          return {
            name: statusLabel,
            count: item.count,
          };
        });

        setAttendanceData(mappedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAttendance();

    // API 호출 함수 실행
    fetchData();
  }, [userId]);

  // 출석률 계산 함수
  const calculateAttendanceRate = () => {
    // 출석 횟수 합산
    const totalAttendanceCount = attendanceData.reduce((sum, item) => sum + item.count, 0);

    // 출석률 계산
    const rateData = attendanceData.map((item) => ({
      ...item,
      rate: (item.count / totalAttendanceCount) * 100,
    }));

    return rateData;
  };

  // 출석률 표시
  const renderAttendanceRate = () => {
    const rateData = calculateAttendanceRate();

    return rateData.map((item) => (
      <div key={item.name}>
        <span>{item.name}: </span>
        <span>{item.rate.toFixed(2)}%</span>
      </div>
    ));
  };




  return (

    <div className={styles.profile_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.relative}>


          <div className={styles.nicknameProfile}>{memberNickname}님 프로필</div>
          <div className={styles.top_contianer}>
            <div className={styles.score_container}>

              <div className={styles.thermometer}>
                <div className={styles.thermometer_outer}>
                  <img src={process.env.PUBLIC_URL + '/img/thermometer_bar.png'} />

                  <div style={{ height: memberScore * 1.6 + 'px' }} className={styles.thermometer_inner}></div>
                  {// 열정온도 동그라미
                    memberScore > 0 ?
                      <div className={styles.thermometer_circle}></div>
                      : <></>}


                </div>



              </div>
              <div className={styles.iprof}>
                <Avatar
                  size={158}
                  name="nick"
                  variant="beam"
                  colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                />
                {
                  memberScore <= 20
                    ?
                    <img className={styles.fire} src={process.env.PUBLIC_URL + '/img/frozen.png'} />
                    : <></>
                }
                {
                  memberScore >= 90
                    ? <img className={styles.fire} src={process.env.PUBLIC_URL + '/img/fire.png'} />
                    : <></>

                }
                <div className={styles.score_value}>
                  열정온도: {memberScore}
                </div>
              </div>

            </div>



            <div className={styles.label_contianer}>
              <div>
                <div className={styles.label}>닉네임</div>
                <div className={styles.label}>나이</div>
                <div className={styles.label}>성별</div>
                <div className={styles.label}>지역</div>
                <div className={styles.label}>관심사</div>
              </div>
              <div>
                <div className={styles.labele}>{memberNickname}</div>
                <div className={styles.labele}>{memberBirth}</div>
                <div className={styles.labele}>{memberGender}</div>
                <div className={styles.labele}>{memberRegion.province} {memberRegion.city}</div>
                <div className={styles.labele}>{memberInterest && memberInterest.map((item, index) => {
                  return (
                    <>{
                      index + 1 === memberInterest.length ?
                        <>{item}</>
                        :
                        <>{item},&nbsp;&nbsp;</>
                    }

                    </>
                  )
                })}</div>
              </div>
            </div>

          </div>
          <div className={styles.squareA}>
            <div className={styles.square_topA}>
              <div className={styles.bstudy}>활동하는 스터디</div>
              <div className={styles.active_study_container}>
                {activeStudy && activeStudy.map((item) => {
                  return (
                    <div onClick={() => closeModal(false)}>
                      <NavLink className={styles.active_link} to={`/study?${item.name}`} state={{ studyId: item.id }}>
                        <div className={styles.active_study} >
                          <div><img width={25} height={25} src={process.env.PUBLIC_URL + `/img/studyprofiles/${item.thumbnail}`} /></div>
                          <div className={styles.active_study_name}>{item.name}</div>
                          <div className={styles.active_study_category}>{item.category}</div>
                        </div>
                      </NavLink>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>


          <div className={styles.squareB}>
            <div className={styles.square_top}>
              <div className={styles.bstudy}>PEER REVIEW</div>
              <div className={styles.write_review}
                onClick={() => setIsView_peerriew(true)}
              >리뷰 쓰기
              </div>
            </div>

            <div className={styles.peer_reivew_content_container}>
              {reviews.map((item) => {
                return (
                  <><div className={styles.peer_review_content} >{item}</div></>
                )
              })}

            </div>
          </div>
          <div className={styles.ratelabel}>출석률</div>


          <div className={styles.graph}>
            <ResponsiveContainer width="100%" height="100%" data={data}>
              <BarChart data={attendanceData}>
                width={300}
                height={500}
                data={data}
                {/* margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }} */}



                <Tooltip cursor={true} isAnimationActive={true} contentStyle={{ transform: 'rotate(-90deg)' }} />
                <Bar dataKey="출석" stackId="a" fill="#50FF12" />
                <Bar dataKey="지각" stackId="a" fill="#FFE500" />
                <Bar dataKey="결석" stackId="a" fill="#FF5037" />
              </BarChart>
            </ResponsiveContainer>
          </div>


          <div>
            {isview_peerriew && <PeerReview closeModal={setIsView_peerriew} userId={userId} userName={memberNickname} />}
          </div>
        </div>
      </div>

    </div>


  )

}