import React, {Component, useEffect, useState} from 'react';
import styles from '../css/Profile.module.css'
import { authApi } from '../services/api';
import Avatar from "boring-avatars";
import ReactApexChart from "react-apexcharts"; 

export default function Profile({closeModal, userId}) {

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
      })
      .catch((error) => {
          console.log(error);
      })
  })

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
        bar: {  horizontal: true,
        
        }
      },
      title: {
        text: '출석률',
        align: 'center',
      },
      yaxis:{
        show : false,
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { show: false },
      },
    },
  }


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
    
    <div className={styles.squareA}></div>
    <div className={styles.astudy}>활동중인 스터디</div>
    <div className={styles.squareB}></div>
    <div className={styles.bstudy}>20자 리뷰</div>

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
    </div>
    </div>
    
    
  )
}
   /* <div className={styles.graph}> 
    <ChartComponent /> </div>*/