import React, { useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import Avatar from "boring-avatars";



import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { authApi } from '../../services/api';
import { error, event } from 'jquery';

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

  const [viewWriteByweek, setViewWriteByweek] = useState(`${styles.byweek_write_contianer_none}`);
  const [writeOrCloseByweek, setWriteOrCloseByweek] = useState('+ 새 스터디')
  const [isWriteByweek, setIsWriteByweek] = useState(false);

  const handleByweekWrite = () =>{
    setIsWriteByweek(!isWriteByweek)

    if(isWriteByweek == false){ //펼칠 때
      setViewWriteByweek(`${styles.byweek_write_contianer_block}`);
      setWriteOrCloseByweek('닫기');

    }else{ //이미 펼쳐져있을 때 닫기
      setViewWriteByweek(`${styles.byweek_write_contianer_none}`);
      setWriteOrCloseByweek('+ 새 스터디');

    }
  }


  //글쓰기 에디터 관련
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


//파일첨부
const handleFileUpload = (e) => {
  const files = document.getElementById("fileupload").files[0];
  fileNames = files
  // setFileNames(files);
}



//업로드
const studyId = 1;
const week = 1;

let fileNames;

const [byweekInputTitle, setByweekInputTitle] = useState('');
const [byweekInputContent, setByweekInputContent] = useState('');
const [startDate, setStartDate] = useState(dayjs());
const [endDate, setEndDate] = useState(dayjs().add(7,'day'));
const [inputAssignmentExists, setInputAssignmentExists] = useState(true);
const [inputAutoAttendance, setInputAutoAttendance] = useState(true);




const handleStudyUpload = () => {
  const fileData = new FormData();

  Object.values(fileData).forEach((file) => fileData.append("files", file));
  fileData.append("title", byweekInputTitle);
  fileData.append("content", byweekInputContent);
  fileData.append("startDate", startDate);
  fileData.append("endDate", endDate);
  fileData.append("assignmentExists", inputAssignmentExists);
  fileData.append("autoAttendance", inputAutoAttendance);


  authApi.post(`studies/${studyId}/weeks/${week}`,
  fileData,
  {headers: {
    "Content-Type" : `multipart/form-data;`
  }}
  ).then((response) => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}StudyWork/ByWeek`;
  }).catch((e) => {
    console.log(error);
  })
}

    return (
          <div className={`${styles.right_container}`}>
            <div className={`${styles.byweek_writebutton}`} onClick={() => handleByweekWrite()}>
              {writeOrCloseByweek}
            </div>
            <div className={viewWriteByweek}>
              <div>
                <div className={`${styles.byweek_period}`}>
                  스터디 기간
                </div>
                <div className={`${styles.byweek_period_input_contianer}`}>
                  <div>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker className={`${styles.byweek_period_input_start}`} label={'시작 날짜'} value={startDate} onChange={(newValue) => setStartDate(newValue)}/>
                    </DemoContainer>
                  </LocalizationProvider>
                  </div>

                  <div className={`${styles.byweek_period_tilde_contianer}`}>
                    <p className={`${styles.byweek_period_tilde}`}>~</p>
                  </div>
                  <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker className={`${styles.byweek_period_input_start}`} label={'종료 날짜'} value={endDate} onChange={(newValue) => setEndDate(newValue)}/>
                    </DemoContainer>
                  </LocalizationProvider>
                  </div>
                </div>
              </div>


              <div>
                <div className={`${styles.byweek_write_title}`}>
                  <p>제목</p>
                </div>
                <div>
                  <input type='text' className={`${styles.byweek_write_title_input}`} onChange={(e) => setByweekInputTitle(e.target.value)}></input>
                </div>
              </div>

              <div>
                <div className={`${styles.byweek_write_contents}`}>
                  <p>내용</p>
                </div>
                <div className={`${styles.byweek_write_contents_input_container}`}>
                  {/* <input type='text' className={`${styles.byweek_write_contents_input}`}></input> */}
                  <CKEditor
                    editor={ ClassicEditor }
                    config={{ // (4)
                        extraPlugins: [uploadPlugin]
                    }}
                    data="<p></p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, editor, data } );
                        setByweekInputContent(data);
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

              <div>           
                <div>
                  {/* <button type='button' key='byweek_attach' className={`${styles.byweek_file_attech_button}`}>파일 첨부</button> */}
                  <input type='file' id='fileupload' className={`${styles.byweek_file_attech_button}`} 
                    onChange={(e) => handleFileUpload(e)} 
                    multiple></input>
                  <label htmlFor='fileupload' className={`${styles.byweek_file_attech_button_label}`} >파일첨부</label>
                  <p>{fileNames}</p>
                </div>
              </div>

              <div>
                <div className={`${styles.byweek_isHomework_toggle}`}>
                  <p>과제 여부</p>
                </div>
                <div className={`${styles.byweek_toggles_contianer}`}>
                  <input type='radio' name='isHomework' id='yesHomework' className={`${styles.byweek_toggle_on}`} onClick={() => setInputAssignmentExists(true)} defaultChecked/><label htmlFor='yesHomework'>ON</label>
                  <input type='radio' name='isHomework' id='notHomework' className={`${styles.byweek_toggle_off}`} onClick={() => setInputAssignmentExists(false)} /><label htmlFor='notHomework'>OFF</label>
                </div>
              </div>

              {inputAssignmentExists ?
              <div>
                <div className={`${styles.byweek_isAutoAtten_toggle}`}>
                  과제 제출에 따라 자동으로 출석 처리합니다.
                </div>
                <div className={`${styles.byweek_toggles_contianer}`}>
                  <input type='radio' name='isAutoAttend' id='yesAutoAttend' className={`${styles.byweek_toggle_on}`} value={true}  onClick={() => setInputAutoAttendance(true)} defaultChecked/><label htmlFor='yesAutoAttend'>ON</label>
                  <input type='radio' name='isAutoAttend' id='notAutoAttend' className={`${styles.byweek_toggle_off}`} value={false} onClick={() => setInputAutoAttendance(false)} /><label htmlFor='notAutoAttend'>OFF</label>
                </div>
              </div>
              :
              <div></div>
              }
              


              <div className={`${styles.upload_button_container}`}>
                <button type='button' key='byweekUpload' className={`${styles.upload_button}`} 
                    onClick={() => handleStudyUpload()}
                >등록</button>
              </div>

            </div>



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
