import React, { Component, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import Avatar from "boring-avatars";



export default function Announce(){

  //접었다 펴기
  const handleFold = () =>{
    if(document.getElementsByClassName(`${styles.announce_each_content_contianer}`)[0].style.display == 'none'){ //접혀있을 때 // 데이터받아올 때 해당 배열값으로 배열 수정필요
      document.getElementsByClassName(`${styles.announce_each_content_contianer}`)[0].style.display = 'block';
    }else{ //펼쳐져있을 때
      document.getElementsByClassName(`${styles.announce_each_content_contianer}`)[0].style.display = 'none';
    }
    
  }
  
    return (
          <div className={`${styles.right_container}`}>
            <div className={`${styles.announce_each_contianer}`}>
              <div className={`${styles.announce_each_title} ${styles.regular_24}`} onClick={() => handleFold()}>
                공지사항 제목
              </div>
              <div className={`${styles.announce_each_content_contianer}`}>
                <div className={`${styles.announce_each_content} ${styles.regular_16}`}>
                  공지사항 내용
                </div>
                <div className={`${styles.announce_each_commnet_continer}`}>
                  <div className={`${styles.announce_each_comment_count}`}>
                    댓글 (1)
                  </div>
                  <div className={`${styles.announce_each_comment_inputs}`}>
                    <input type='text' className={`${styles.announce_each_comment_input}`}></input>
                    <buuton type='button' className={`${styles.announce_each_comment_button}`}>올리기</buuton>              
                  </div>
                  <div className={`${styles.announce_each_comment_lists}`}>
                    <div className={`${styles.announce_each_comment_list}`}>
                      <div className={`${styles.announce_each_comment_list_profile}`}>
                        <Avatar
                          size={40}
                          name='닉넴'
                          variant="beam"
                          colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                        />
                      </div>
                      <div className={`${styles.announce_each_comment_list_contents}`}>
                        <div>
                          <p className={`${styles.announce_each_comment_list_nickname} ${styles.bold_16}`}>닉넴</p>
                        </div>
                        <div>
                          <p className={`${styles.announce_each_comment_list_content} ${styles.regular_16}`}>댓글 쭈르ddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaddddddddddddvvvccccccccccccccccvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvdddddddddddddddddddddddddddddddddd륵<br/>쭈르<br/>륵</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
    )
}