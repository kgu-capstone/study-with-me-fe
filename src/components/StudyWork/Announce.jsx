import React, { useEffect, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import Avatar from "boring-avatars";


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { authApi } from '../../services/api';

export default function Announce(){

  //접었다 펴기
  const handleFold = () =>{
    if(document.getElementsByClassName(`${styles.announce_each_content_contianer}`)[0].style.display == 'none'){ //접혀있을 때 // 데이터받아올 때 해당 배열값으로 배열 수정필요
      document.getElementsByClassName(`${styles.announce_each_content_contianer}`)[0].style.display = 'block';
    }else{ //펼쳐져있을 때
      document.getElementsByClassName(`${styles.announce_each_content_contianer}`)[0].style.display = 'none';
    }
    
  }

  // 공지사항 정보 불러오기


  //글쓰기 펼치기
  const [viewWriteAnnounce, setViewWriteAnnounce] = useState(`${styles.announce_write_contianer_none}`);
  const [writeOrCloseAnnounce, setWriteOrCloseAnnounce] = useState('+ 새 공지사항')
  const [isWriteAnnounce, setIsWriteAnnounce] = useState(false);

  const handleAnnounceWrite = () =>{
    setIsWriteAnnounce(!isWriteAnnounce)

    if(isWriteAnnounce == false){ //펼칠 때
      setViewWriteAnnounce(`${styles.announce_write_contianer_block}`);
      setWriteOrCloseAnnounce('닫기');

    }else{ //이미 펼쳐져있을 때
      setViewWriteAnnounce(`${styles.announce_write_contianer_none}`);
      setWriteOrCloseAnnounce('+ 새 공지사항');

    }
  }

  // 글쓰기 에디터관련
  
  // useEffect = () =>{
  //   authApi.post('study', 
  //   {
  //     "name" : "TOEIC 스터디",
  //     "description" : "TOEIC 스터디입니다",
  //     "capacity" : 8,
  //     "category" : 1,
  //     "thumbnail" : "language_001.png",
  //     "type" : "ON",
  //     "province" : null,
  //     "city" : null,
  //     "minimumAttendanceForGraduation" : 5,
  //     "hashtags" : [ "TOEIC", "언어", "토익" ]
  //   }
  //   ).then((response) => {
  //     console.log(response);
  //   }).catch((e) => console.log(e))
  // }


  const [flag, setFlag] = useState(false);

  const customUploadAdapter = (loader) => { // (2)
    return {
        upload(){
            return new Promise ((resolve, reject) => {
                const data = new FormData();
                 loader.file.then( (file) => {
                        data.append("name", file.name);
                        data.append("file", file);

                        authApi.post(`image`, data)
                            .then((res) => {
                                if(!flag){
                                    setFlag(true);
                                    // setImage(res.data.filename);
                                }
                                resolve({
                                    // default: `${imgLink}/${res.data.filename}`
                                    default: `${res.data.filename}`
                                });
                            })
                            .catch((err)=>reject(err));
                    })
            })
        }
    }
}

  function uploadPlugin (editor){ // (3)
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return customUploadAdapter(loader);
    }
}

const [announceTitle, setAnnounceTitle] = useState('');
const [announceContent, setAnnounceContent] = useState('');

  

//등록  api
const handleAnnounceUpload = () => {
  authApi.post(`studies/1/notice`, 
  {
    "title": announceTitle,
    "content": announceContent
  })
  .then((response)=>{
    window.location.href = `${process.env.REACT_APP_BASE_URL}StudyWork/Announce`;
  })
  .catch((e) => {
    console.log(e);
  })
  }



    return (
          <div className={`${styles.right_container}`}>
            <div className={`${styles.announce_writebutton}`} onClick={() => handleAnnounceWrite()}>
              {writeOrCloseAnnounce}
            </div>
            <div className={viewWriteAnnounce}>
              <div>
                <div className={`${styles.announce_write_title}`}>
                  <p>공지사항 제목</p>
                </div>
                <div>
                  <input type='text' className={`${styles.announce_write_title_input}`} onChange={(e) => setAnnounceTitle(e.target.value)}></input>
                </div>                
              </div>

              <div>
                <div className={`${styles.announce_write_contents}`}>
                  <p>공지사항 내용</p>
                </div>
                <div className={`${styles.announce_write_contents_input_container}`}>
                  {/* <input type='text' className={`${styles.announce_write_contents_input}`}></input> */}
                  {/* <WriteSlate /> */}
                  
                  <CKEditor
                    editor={ ClassicEditor }
                    config={{ // (4)
                        extraPlugins: [uploadPlugin]
                    }}
                    data="<p></p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, editor, data } );
                        setAnnounceContent(data);
                    } }
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                  />    

                </div>

                


              </div>
              <div className={`${styles.upload_button_container}`} onClick={() => handleAnnounceUpload()}>
                <button type='button' key='announceUpload' className={`${styles.upload_button}`}>등록</button>
              </div>
            </div>

            
            <div className={`${styles.announce_each_contianer}`}>
              <div className={`${styles.announce_each_title} ${styles.regular_24}`} onClick={() => handleFold()}>
                공지사항 제목
              </div>
              <div className={`${styles.announce_each_content_contianer}`}>
                <div className={`${styles.announce_each_content} ${styles.regular_16}`}>
                  공지사항 내용
                </div>

{/* 
                <div>
                  <p className={`${styles.announce_}`}>수정</p>
                  <p className={`${styles.announce_delete}`}>삭제</p>
                </div> */}


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
