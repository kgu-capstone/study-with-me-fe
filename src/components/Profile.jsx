import React, { Component, useEffect, useState } from 'react';
import styles from '../css/Profile.module.css'
import { authApi } from '../services/api';
import Avatar from "boring-avatars";
import ReactApexChart from "react-apexcharts";
import PeerReview from './PeerReview';


export default function Profile({ closeModal, userId }) {

  let [memberScore, setMemberScore] = useState(0);
  let [memberNickname, setMemberNickname] = useState('');
  let [memberEmail, setMemberEmail] = useState('');
  let [memberBirth, setMemberBirth] = useState('');
  let [memberGender, setMemberGender] = useState('');
  let [memberRegion, setMemberRegion] = useState('');
  let [memberInterest, setMemberInterest] = useState('');

  useEffect(() => {
    authApi.get(`members/${userId}`)
      .then((response) => {
        setMemberNickname(response.data.nickname);
        setMemberEmail(response.data.email);
        setMemberBirth(response.data.birth);
        setMemberGender(response.data.gender);
        setMemberRegion(response.data.region);
        setMemberInterest(response.data.interests);
        setMemberScore(response.data.score);
      })
      .catch((error) => {
        console.log(error);
      })

    authApi.get(`members/${userId}/reviews`)
      .then((response) => {
        setReviews(response.data.reviews);
      })
      .catch(e => console.log(e))



  }, [])

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

        </div>
        <div className={styles.labelA}>닉네임</div>
        <div className={styles.labelB}>나이</div>
        <div className={styles.labelC}>성별</div>
        <div className={styles.labelD}>지역</div>
        <div className={styles.labelE}>관심사</div>

        <div className={styles.Alabele}>{memberNickname}</div>
        <div className={styles.Blabele}>{memberBirth}</div>
        <div className={styles.Clabele}>{memberGender}</div>
        <div className={styles.Dlabele}>{memberRegion.province} {memberRegion.city}</div>
        <div className={styles.Elabele}>{memberInterest}</div>

        <div className={styles.squareA}>

        </div>
        <div className={styles.astudy}>활동중인 스터디</div>
        <div className={styles.squareB}>
          <div className={styles.squareB_top}>
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

    </div>


  )
}
   /* <div className={styles.graph}>
<ChartComponent /> </div>*/