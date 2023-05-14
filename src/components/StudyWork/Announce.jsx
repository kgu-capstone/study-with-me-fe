import React, { useEffect, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import Avatar from "boring-avatars";
import parse from 'html-react-parser';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { authApi } from '../../services/api';
import { useLocation } from 'react-router';

export default function Announce(){

  

    // 넘어올 정보
    const location = useLocation()
    const studyId = 3
    // const studyId = location.state?.studyId


  // 공지사항 조회
  const [announceList, setAnnounceList] = useState([]);

  const announceApi = () => {
    authApi.get(`studies/${studyId}/notices`)
    .then((response) => {
      setAnnounceList(response.data.result);
    })
    .catch((e) => console.log(e))
  }


  useEffect(() => {
    // 스크롤 맨 위로
    window.scrollTo(0, 0);

    announceApi()
   }, [])

   
  // 공지사항 none css 입력
  const [foldListcss, setFoldListcss] = useState([]);

  useEffect(() => { 
    let tempFoldListcss = [];
    for(let i = 0; i< announceList.length; i++){
      tempFoldListcss[i] = `${styles.announce_each_content_contianer_none}`;
    }

    setFoldListcss(tempFoldListcss)

  }, [announceList])


   
     //접었다 펴기
  const handleFold = (index) =>{
    let tempFoldListcss = [...foldListcss];
    
    if(tempFoldListcss[index] == (`${styles.announce_each_content_contianer_none}`)){ //접혀있을 때
      tempFoldListcss[index] = (`${styles.announce_each_content_contianer_block}`)
    }else{ //펼쳐져있을 때
      tempFoldListcss[index] = (`${styles.announce_each_content_contianer_none}`)
    }
    
    setFoldListcss(tempFoldListcss)
  }



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
  const [flag, setFlag] = useState(false);

  const customUploadAdapter = (loader) => { // (2)
    return {
        upload(){
            return new Promise ((resolve, reject) => {
                const formData = new FormData();
                 loader.file.then( (file) => {
                        formData.append("filename", file.name);
                        formData.append("file", file);

                        authApi.post(`image`, formData)
                            .then((res) => {
                                resolve({
                                    // default: `${imgLink}/${res.data.filename}`
                                    default: `${res.data.result}`
                                });
                            })
                            .catch((err)=>{
                              console.log(err);
                              reject(err)
                            });
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

  

//공지사항등록  api
const handleAnnounceUpload = () => {
  authApi.post(`studies/${studyId}/notice`, 
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


  // 댓글 useState
  const [comment, setComment] = useState([]);
  
  const handleCommentValue = (value, index) =>{
    let tempComment = [...comment]; // 임시배열을 만들어서
    tempComment[index] = value // 임시배열의 값을 바꾸고
    setComment(tempComment) // 다시 임시배열을 set useState 
    // -- 공지사항 여러개 열어놓고 댓글을 쓸 때를 대비해서, 서로 값을 분리하기 위함 --

  }


    //댓글등록 api
  const handleCommentUplaod = (value, index) => {

    // 줄바꿈 \n을 <br>로 변경
    value = value.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');


    authApi.post(`notices/${index}/comment`,
      {"content" : value}
    )
    .then((response) => {
      window.location.href = `${process.env.REACT_APP_BASE_URL}StudyWork/Announce`;
    })
    .catch((err) => {
      console.log(err);
    })
  }


  // 댓글삭제 api
  const handleCommentDelete = (noticeId, commentId) => {
    if(window.confirm('댓글을 삭제하시겠습니까?')){
      authApi.delete(`notices/${noticeId}/comments/${commentId}`)
      .then((response) => {
        announceApi();
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }


  // 댓글 textarea높이조절
  const autoResizeTextarea = (className) => {
    let textarea = document.querySelector(className);

    if(textarea){
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }

  //--댓글 수정--
  // 댓글 수정 칸 열기
  const [commentReviceOn, setCommentReviceOn] = useState([]);

  const handleCommentReviceOnOff = (commentIndex, onoff, value) => {
    let TempReviceOn = [...commentReviceOn];
    TempReviceOn[commentIndex] = onoff
    setCommentReviceOn(TempReviceOn);

    // 초기 입력값
    commentReivceValue[commentIndex] = value
  }

  // 댓글 수정 입력값 받기
  const [commentReivceValue, setCommentReviceValue] = useState([]);
  
  const handleCommentReviceValue = (value, index) =>{
    let tempRevice = [...commentReivceValue];
    tempRevice[index] = value
    setCommentReviceValue(tempRevice) 

  }

  //댓글수정 api
  const handleCommentReviceRevice = (noticeId, commentId, reviceValue) => {
    // 줄바꿈 \n을 <br>로 변경
    reviceValue = reviceValue.replaceAll(/(?:\r\n|\r|\n)/g, '<br>');


    authApi.put(`notices/${noticeId}/comments/${commentId}`,
    {
      "content" : reviceValue
    })
    .then((response)=>{
      window.location.href = `${process.env.REACT_APP_BASE_URL}StudyWork/Announce`;
    })
    .catch((err) => {
      console.log(err);
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




            <div className={styles.announce_contianer}> 

            {/* 공지사항 목록들 */}
            {
              announceList.map((item, index) => {
                return(
                  <>
              <div className={`${styles.announce_each_contianer}`}>
              <div className={`${styles.announce_each_title} ${styles.regular_24}`} onClick={() => handleFold(index)}>
                {item.title}
              </div>
              <div className={`${foldListcss[index]}`}>
                <div className={`${styles.announce_each_content} ${styles.regular_16}`}>
                  {parse(item.content)}
                </div>

              {/* 
                <div>
                  <p className={`${styles.announce_}`}>수정</p>
                  <p className={`${styles.announce_delete}`}>삭제</p>
                </div> */}


                <div className={`${styles.announce_each_commnet_continer}`}>
                  <div className={`${styles.announce_each_comment_count}`}>
                    댓글 ({item.comments.length})
                  </div>
                  <div className={`${styles.announce_each_comment_inputs}`}>

                    <textarea 
                    value={comment[index]} 
                    onChange={(e) => handleCommentValue(e.target.value, index)} 
                    type='text' 
                    className={`${styles.announce_each_comment_input}`} 
                    onKeyDown={() => autoResizeTextarea(`.${styles.announce_each_comment_input}`)}
                    onKeyUp={() => autoResizeTextarea(`.${styles.announce_each_comment_input}`)}
                    />

                    <button type='button' 
                            className={`${styles.announce_each_comment_button}`}
                            onClick={() => handleCommentUplaod(comment[index], item.id)}
                    >올리기</button>              
                  </div>
                  <div className={`${styles.announce_each_comment_lists}`}>
                  

                    {item.comments.map((content, contentIndex) => {
                      return (
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
                            <div className={styles.announce_each_comment_top_container}>
                              <div className={styles.announce_each_comment_nickname_contianer}>
                                <p className={`${styles.announce_each_comment_list_nickname} ${styles.bold_16}`}>{content.writer.nickname}</p>
                              </div>
                              <div className={styles.announce_each_comment_revice_container}>
                                {
                                  //수정누르면 완료 버튼으로 바뀜
                                  commentReviceOn[contentIndex]
                                  ?
                                  <>
                                  
                                  <p className={styles.announce_each_comment_revice_button}
                                      onClick={() => handleCommentReviceRevice(item.id, content.id,commentReivceValue[contentIndex])}
                                  >
                                    수정완료
                                  </p>
                                  <p className={styles.announce_each_comment_reviceOff_button}
                                  onClick={() => handleCommentReviceOnOff(contentIndex, false, content.content)}>
                                    수정취소
                                  </p>
                                  </>
                            
                                  :
                                  <p className={styles.announce_each_comment_reviceOn_button}
                                    onClick={() => handleCommentReviceOnOff(contentIndex, true, content.content.replaceAll('<br>', '\n'))}
                                  >수정</p>


                                }
                                
                                <p className={styles.announce_each_comment_delete_button}
                                  onClick={() => handleCommentDelete(item.id, content.id)}
                                >삭제</p>
                              </div>
                            </div>
                            <div>

                              
                              {//수정 누르면 input으로 바뀜
                                commentReviceOn[contentIndex]
                                ?
                                <textarea
                                  className={`${styles.announce_each_comment_list_content_revice}`}
                                  onKeyDown={() => autoResizeTextarea(`.${styles.announce_each_comment_list_content_revice}`)}
                                  onKeyUp={() => autoResizeTextarea(`.${styles.announce_each_comment_list_content_revice}`)}
                                  value={commentReivceValue[contentIndex]}
                                  onChange={(e) => handleCommentReviceValue(e.target.value, contentIndex)}
                                />
                                :
                                <p className={`${styles.announce_each_comment_list_content} ${styles.regular_16}`}>{parse(content.content)}</p>
                              }
                              
                              
                            </div>
                          </div>
                        </div>
                      )

                    })}
                    


                  </div>
                </div>


              </div>
            </div>
                  </>
                )
              })
            }


        </div>

           
          </div>
      
    )
}
