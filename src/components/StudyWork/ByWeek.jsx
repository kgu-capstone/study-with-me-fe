import React, { Component } from 'react'
import styles from '../../css/StudyWork.module.css';
import Avatar from "boring-avatars";

export default function ByWeek(){
  //접었다 펴기
  const handleFold = () =>{
    if(document.getElementsByClassName(`${styles.byweek_each_content_contianer}`)[0].style.display == 'none'){ //접혀있을 때 // 데이터받아올 때 해당 배열값으로 배열 수정필요
      document.getElementsByClassName(`${styles.byweek_each_content_contianer}`)[0].style.display = 'block';
    }else{ //펼쳐져있을 때
      document.getElementsByClassName(`${styles.byweek_each_content_contianer}`)[0].style.display = 'none';
    }
    //두번클릭해야하는 오류 수정 필요

  }
    return (
          <div className={`${styles.right_container}`}>
            <div className={`${styles.byweek_each_contianer}`}>
            <div className={`${styles.byweek_each_title} ${styles.regular_24}`} onClick={() => handleFold()}>
                3주차 3월 8일 스터디
              </div>
              <div className={`${styles.byweek_each_content_contianer}`}>
                {/* 내용 */}
                <div className={`${styles.byweek_each_content} ${styles.regular_16}`}>
                  3주차 스터디 공지드립니다.<br/>
                  첨부파일 작성하셔서 가지고 오시면 됩니다.<br/>
                  이번 스터디는 강남역 스터디룸에서 진행합니다.<br/>
                  3월 8일 18:00 까지 늦지 않게 도착해주시기 바랍니다.<br/>
                  <img src={process.env.PUBLIC_URL + '/img/example-image.svg'}/>
                </div>

                {/* 첨부파일*/}
                <div className={`${styles.byweek_each_attach_list}`}>
                  <p className={`${styles.byweek_each_attach_title}`}>첨부</p>
                  <p>문제.txt &nbsp;&nbsp;예시.hwp</p>
                </div>

                {/* 과제 입력창*/}
                <div className={`${styles.byweek_each_homework_inputs}`}>
                  <buuton type='button' className={`${styles.byweek_each_homework_attach}`}>찾아보기..</buuton>              
                  <input type='text' className={`${styles.byweek_each_homework_input}`} placeholder='찾아보기를 눌러 파일을 첨부하거나, 링크를 입력하세요'></input>
                  <buuton type='button' className={`${styles.byweek_each_homework_button}`}>과제 등록</buuton>              
                </div>

                {/* 과제들*/}
                <div className={`${styles.byweek_each_homework_contianer}`}>
                  <div className={`${styles.byweek_each_homework}`}>
                    <div className={`${styles.byweek_each_homework_profile}`}>
                        <Avatar
                          size={40}
                          name='닉넴'
                          variant="beam"
                          colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                        />
                    </div>
                    <div className={`${styles.byweek_each_homework_nickname}`}>
                      <p>닉네임</p>
                    </div>
                    <div className={`${styles.byweek_each_homework_viewHomework}`}>
                      <p>과제보기</p>
                    </div>
                  </div>
                </div>
                <div className={`${styles.byweek_each_homework_contianer}`}>
                  <div className={`${styles.byweek_each_homework}`}>
                    <div className={`${styles.byweek_each_homework_profile}`}>
                        <Avatar
                          size={40}
                          name='하이'
                          variant="beam"
                          colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                        />
                    </div>
                    <div className={`${styles.byweek_each_homework_nickname}`}>
                      <p>닉네임</p>
                    </div>
                    <div className={`${styles.byweek_each_homework_viewHomework}`}>
                      <p>과제보기</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>                        
          </div>
    )
  
}
