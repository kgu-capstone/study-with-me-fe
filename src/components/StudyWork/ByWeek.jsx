import React, { forwardRef, useEffect, useState } from 'react'
import styles from '../../css/StudyWork.module.css';
import Avatar from "boring-avatars";
import parse from 'html-react-parser';


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import moment from 'moment';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import ko from "date-fns/locale/ko";

import { authApi } from '../../services/api';
import { error, event } from 'jquery';


export default function ByWeek(){

//// 스터디 불러오기 ////
const [weekInfo, setWeekInfo] = useState([]);

useEffect(() => {
  authApi.get(`studies/${studyId}/weeks`)
  .then((response) => {
    console.log(response.data.weeks);
    setWeekInfo(response.data.weeks);

  })
  .catch((err) => {
    console.log(err);
  })

}, [])


// 처음에 불러올 때 메뉴 모두 닫힌상태로 만들기
const [weekfoldcss, setWeekFoldcss] = useState([]);

useEffect(() => {
  let tempFoldListcss = [];
  for(let i = 0; i < weekInfo.length; i++){
    tempFoldListcss[i] = `${styles.byweek_each_content_contianer_none}`
  }

  setWeekFoldcss(tempFoldListcss)
}, [weekInfo] )

// 클릭하면 펼치거나 접기
const handleFold = (index) =>{
  let tempFoldListcss = [...weekfoldcss];
  if(tempFoldListcss[index] == ( `${styles.byweek_each_content_contianer_none}`)){
    tempFoldListcss[index] = ( `${styles.byweek_each_content_contianer_block}`)
  }else{
    tempFoldListcss[index] = (`${styles.byweek_each_content_contianer_none}`)
  }

  setWeekFoldcss(tempFoldListcss)
}


  //// 글쓰기 ////

// 글쓰기 펼치기
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

  // 날짜선택

const CutomInputStart = forwardRef(({ value, onClick }, ref) => (
  <button className={`${styles.byweek_period_input_start}`}  onClick={onClick} ref={ref}>
    {startDate.getFullYear()}&nbsp;-&nbsp;

    {/* 1의 자리수인 경우 앞에 0 붙이기*/}
    {startDate.getMonth() < 10
    ?
    `0${startDate.getMonth()+1}`
    :
      startDate.getMonth()+1
    }&nbsp;-&nbsp;

    {startDate.getDate() < 10
    ?
      `0${startDate.getDate()}`
    :
      startDate.getDate()
    }&nbsp;&nbsp;&nbsp;&nbsp;

    {startDate.getHours() < 10
    ?
      `0${startDate.getHours()}`
    :
      startDate.getHours()
    }:

    {startDate.getMinutes() < 10
    ?
      `0${startDate.getMinutes()}`
    :
      startDate.getMinutes()
    }
  </button>
));

const CutomInputEnd = forwardRef(({ value, onClick }, ref) => (
  <button className={`${styles.byweek_period_input_end}`}  onClick={onClick} ref={ref}>
    {endDate.getFullYear()}&nbsp;-&nbsp;

    {endDate.getMonth() < 10
    ?
    `0${endDate.getMonth()+1}`
    :
    endDate.getMonth()+1
    }&nbsp;-&nbsp;

    {endDate.getDate() < 10
    ?
      `0${endDate.getDate()}`
    :
    endDate.getDate()
    }&nbsp;&nbsp;&nbsp;&nbsp;

    {endDate.getHours() < 10
    ?
      `0${endDate.getHours()}`
    :
    endDate.getHours()
    }:

    {endDate.getMinutes() < 10
    ?
      `0${endDate.getMinutes()}`
    :
    endDate.getMinutes()
    }
  </button>
));

registerLocale("ko", ko);


  //글쓰기 에디터 관련

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


//파일첨부


const handleFileUpload = (e) => {
  e.preventDefault();

  const file = e.target.files[0];
  setFiles([...files, {uploadFile: file}]);
}



//업로드
const studyId = 3;
let week = 5;

let [files, setFiles] = useState([]);

const [byweekInputTitle, setByweekInputTitle] = useState('');
const [byweekInputContent, setByweekInputContent] = useState('');
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(new Date());
const [inputAssignmentExists, setInputAssignmentExists] = useState(true);
const [inputAutoAttendance, setInputAutoAttendance] = useState(true);



const handleStudyUpload = () => {
  const fileData = new FormData();

  // Object.values(fileNames).forEach((file) => fileData.append("files", file));
  fileData.append("files", files.length && files[0].uploadFile);
  fileData.append("title", byweekInputTitle);
  fileData.append("content", byweekInputContent);
  fileData.append("startDate", moment(startDate).format("YYYY-MM-DDTHH:mm"));
  fileData.append("endDate", moment(endDate).format("YYYY-MM-DDTHH:mm"));
  fileData.append("assignmentExists", inputAssignmentExists);
  fileData.append("autoAttendance", inputAutoAttendance);

  for (const key of fileData.keys()){
    console.log(key);
  }
  for (const value of fileData.values()){
    console.log(value);
  }
  console.log(fileData);

  authApi.post(`studies/${studyId}/weeks/${week}`,
  fileData,
  {headers: {
    "Content-Type" : `multipart/form-data;`
  }}
  ).then((response) => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}StudyWork/ByWeek`;
  }).catch((error) => {
    console.log(error);
  })
}




//첨부파일 열기
const openAttach = (attach, attachName) => {
  window.open(attach, attachName);
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
                      <DatePicker 
                      locale="ko"
                      dateFormat="yyyy-mm-dd'T'HH:mm"
                      // startDate={startDate}
                      // endDate={endDate}
                      className="input-datepicker" 
                      placeholderText="시작 날짜" 
                      
                      customInput={<CutomInputStart />}
                      label={'시작 날짜'} 
                      onChange={(newValue) => setStartDate(newValue)}
                      showTimeSelect
                      />
                  </div>

                  <div className={`${styles.byweek_period_tilde_contianer}`}>
                    <p className={`${styles.byweek_period_tilde}`}>~</p>
                  </div>
                  <div>
                      <DatePicker
                      locale={ko}
                      dateFormat="yyyy-mm-dd'T'HH:mm"
                      className="input-datepicker"
                      placeholderText="종료 날짜"
                      customInput={<CutomInputEnd/>}
                      label={'종료 날짜'} value={endDate} onChange={(newValue) => setEndDate(newValue)}
                      showTimeSelect
                      />
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
                  {/* <p>{fileNames}</p> */}
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


              {
                weekInfo.map((item, index) => {
                  return(
                    <>
                      <div className={`${styles.byweek_each_contianer}`}>
                        <div className={`${styles.byweek_each_title} ${styles.regular_24}`} onClick={() => handleFold(index)}>
                            {item.title}
                          </div>
                          <div className={`${weekfoldcss[index]}`}>
                            {/* 내용 */}
                            <div className={`${styles.byweek_each_content} ${styles.regular_16}`}>
                              {parse(item.content)}
                            </div>

                            {/* 첨부파일*/}
                            <div className={`${styles.byweek_each_attach_list}`}>
                              <p className={`${styles.byweek_each_attach_title}`}>첨부</p>
                              {
                                item.attachments.map((attachs, attachsIndex) => {
                                  return(
                                    <>
                                      <p className={`${styles.bywee_each_attachs}`}
                                        onClick={() => openAttach(attachs, attachs.split('/')[4].split('-').slice(-1))}
                                      >
                                        {/* 파일 이름만 골라내기*/}
                                        {decodeURI(attachs.split('/')[4].split('-').slice(-1))}&nbsp;&nbsp;</p>
                                    </>
                                  )
                                  
                                })
                              }
                            </div>

                            {/* 과제 입력창*/}
                            {
                              item.assignmentExists 
                              ?
                              <>
                              <div>
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
                              </>
                              :
                              <>
                              
                              </>


                            



                            }
                            
                          </div>
                        </div>  
                    
                    </>
                  )
                })
              }

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
