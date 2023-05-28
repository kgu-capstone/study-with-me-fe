import React, { Component, useEffect, useState } from 'react';
import styles from '../css/Profile.module.css'
import { authApi } from '../services/api';
import Avatar from "boring-avatars";
import ReactApexChart from "react-apexcharts";
import PeerReview from './PeerReview';
import { NavLink } from "react-router-dom";


export default function Profile({ closeModal, userId }) {

  let [memberScore, setMemberScore] = useState(0);
  let [memberNickname, setMemberNickname] = useState('');
  let [memberBirth, setMemberBirth] = useState('');
  let [memberGender, setMemberGender] = useState('');
  let [memberRegion, setMemberRegion] = useState('');
  let [memberInterest, setMemberInterest] = useState('');

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
    //활동했던
    authApi.get(`members/${userId}/studies/graduated`)
      .then((response) => {
        let templist = [...activeStudy]
        templist = templist.concat(response.data.result);
        setActiveStudy(templist)
      })




    //리뷰
    authApi.get(`members/${userId}/reviews`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch(e => console.log(e))


  }, [])


  let [activeStudy, setActiveStudy] = useState([]);

  const barData = {
    series: [{
      name: '출석',
      data: [44]
    }, {
      name: '지각',
      data: [44]
    }, {
      name: '결석',
      data: [44]
    }],

    options: {
      chart: {

        toolbar: {
          show: false,
        },
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%'
      },

      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
      }],
      plotOptions: {
        bar: {
          horizontal: true,

        }
      },
      title: {
        text: '출석률',
        align: 'center',
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
    },
  }

  //PEERVIEW 쓰기
  const [isview_peerriew, setIsView_peerriew] = useState(false);

  //PEERVIEW 조회
  const [reviews, setReviews] = useState([]);

  return (

    <div className={styles.profile_container} onClick={() => closeModal(false)}>
      <div className={styles.modal_container} onClick={(e) => e.stopPropagation()}>

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
                memberScore >= 80
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
            <div className={styles.bstudy}>활동한 스터디</div>
            <div className={styles.active_study_container}>
              {activeStudy && activeStudy.map((item) => {
                return (
                  <div onClick={() => closeModal(false)}>
                    <NavLink className={styles.active_link} to='/StudyDetail' state={{ studyId: item.id }}>
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

        <div>

        </div>

        <div>
          <div id="chart"><div className={styles.graph}>
            <ReactApexChart
              options={barData.options}
              series={barData.series}
              type="bar"

            />
          </div>

          </div>
        </div>
        <div>
          {isview_peerriew && <PeerReview closeModal={setIsView_peerriew} userId={userId} userName={memberNickname} />}
        </div>
      </div>

    </div >


  )
}
   /* <div className={styles.graph}>
<ChartComponent /> </div>*/