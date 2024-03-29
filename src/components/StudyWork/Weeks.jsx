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
import UserName from '../UserName';
import { useLocation } from 'react-router';
import AssignmentSummit from '../AssignmentSummit';



export default function ByWeek() {

  //##-- 만약 id가 없는 비로그인상태라면 --##
  //로그인 후 redirect href 미리 저장 -> 활동페이지는 마이페이지로
  localStorage.setItem("loginRedirectpath", `${process.env.REACT_APP_BASE_URL}mypage`)

  // 사용자 id get
  let memberId;
  if (localStorage.getItem("id")) {
    memberId = localStorage.getItem("id")
  } else {
    window.location.href = `${process.env.REACT_APP_BASE_URL}login`;
  }
  //##-----------------------------------##

  // studyId
  const location = useLocation()
  const studyId = location.state?.studyId


  // 팀장인지 불러오기
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    authApi.get(`studies/${studyId}`)
      .then((response) => {
        if (memberId == response.data.host.id) {
          setIsHost(true)
        }
      })
      .catch(err => console.log(err))
  }, [])



  //// 스터디 불러오기 ////
  const [weekInfo, setWeekInfo] = useState([]);

  const weeksapi = () => {
    authApi.get(`studies/${studyId}/weeks`)
      .then((response) => {
        setWeekInfo(response.data.weeks);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    // 스크롤 맨 위로
    window.scrollTo(0, 0);
    weeksapi()
  }, [])

  // 스터디 불러오기 api 업데이트
  const [isApiUpdate, setIsApiUpdate] = useState(0);

  useEffect(() => {
    weeksapi()
  }, [isApiUpdate])


  // 처음에 불러올 때 메뉴 모두 닫힌상태로 만들기
  const [weekfoldcss, setWeekFoldcss] = useState([]);

  useEffect(() => {
    let tempFoldListcss = [];
    for (let i = 0; i < weekInfo.length; i++) {
      tempFoldListcss[i] = `${styles.byweek_each_content_contianer_none}`
    }

    setWeekFoldcss(tempFoldListcss)
  }, [weekInfo])

  // 클릭하면 펼치거나 접기 + 값도 펼치기
  const handleFold = (index) => {
    let tempFoldListcss = [...weekfoldcss];
    for (let i = 0; i < tempFoldListcss.length; i++) {
      tempFoldListcss[i] = (`${styles.byweek_each_content_contianer_none}`)
    }

    tempFoldListcss[index] = (`${styles.byweek_each_content_contianer_block}`)

    setWeekFoldcss(tempFoldListcss)

    setHomeworksFiles()
    setHomeworkFileName('')
  }


  //// 글쓰기 ////

  // 글쓰기 펼치기
  const [viewWriteByweek, setViewWriteByweek] = useState(`${styles.byweek_write_contianer_none}`);
  const [writeOrCloseByweek, setWriteOrCloseByweek] = useState('+ 새 스터디')
  const [isWriteByweek, setIsWriteByweek] = useState(false);

  const handleByweekWrite = () => {
    setIsWriteByweek(!isWriteByweek)

    if (isWriteByweek == false) { //펼칠 때
      setViewWriteByweek(`${styles.byweek_write_contianer_block}`);
      setWriteOrCloseByweek('닫기');

    } else { //이미 펼쳐져있을 때 닫기
      setViewWriteByweek(`${styles.byweek_write_contianer_none}`);
      setWriteOrCloseByweek('+ 새 스터디');

    }
  }

  // 날짜선택
  const CutomInputStart = forwardRef(({ value, onClick }, ref) => (
    <button className={`${styles.byweek_period_input_start}`} onClick={onClick} ref={ref}>
      {startDate.getFullYear()}&nbsp;-&nbsp;

      {/* 1의 자리수인 경우 앞에 0 붙이기*/}
      {startDate.getMonth() < 10
        ?
        `0${startDate.getMonth() + 1}`
        :
        startDate.getMonth() + 1
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
    <button className={`${styles.byweek_period_input_end}`} onClick={onClick} ref={ref}>
      {endDate.getFullYear()}&nbsp;-&nbsp;

      {endDate.getMonth() < 10
        ?
        `0${endDate.getMonth() + 1}`
        :
        endDate.getMonth() + 1
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
      upload() {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          loader.file.then((file) => {
            formData.append("type", "weekly")
            formData.append("filename", file.name);
            formData.append("file", file);

            authApi.post(`image`, formData)
              .then((res) => {
                resolve({
                  default: `${res.data.result}`
                });
              })
              .catch((err) => {
                console.log(err);
                reject(err)
              });
          })
        })
      }
    }
  }

  function uploadPlugin(editor) { // (3)
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    }
  }


  // 파일첨부 - 글쓰기
  let [files, setFiles] = useState([]);

  const handleFileUpload = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setFiles([...files, { uploadFile: file }]);
  }

  const handlefileUploadCancle = (index) => {
    const temp = [...files]
    temp.splice(index, 1);
    setFiles(temp)
  }

  // 파일첨부 - 과제
  let [homeworksFiles, setHomeworksFiles] = useState();
  const [HomewworkdFileName, setHomeworkFileName] = useState('');


  const handleHomworkUpload = (e) => {
    //파일
    const file = e.target.files[0];
    setHomeworksFiles({ uploadFile: file })

    setHomeworkFileName(e.target.files[0].name)
  }




  const [byweekInputTitle, setByweekInputTitle] = useState('');
  const [byweekInputContent, setByweekInputContent] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [inputAssignmentExists, setInputAssignmentExists] = useState(true);
  const [inputAutoAttendance, setInputAutoAttendance] = useState(true);


  //스터디생성
  const handleStudyUpload = () => {
    const fileData = new FormData();

    files.map((item) => {
      fileData.append("files", files.length && item.uploadFile);
    })
    fileData.append("title", byweekInputTitle);
    fileData.append("content", byweekInputContent);
    fileData.append("startDate", moment(startDate).format("YYYY-MM-DDTHH:mm"));
    fileData.append("endDate", moment(endDate).format("YYYY-MM-DDTHH:mm"));
    fileData.append("assignmentExists", inputAssignmentExists);
    fileData.append("autoAttendance", inputAutoAttendance);

    authApi.post(`studies/${studyId}/week`,
      fileData,
      {
        headers: {
          "Content-Type": `multipart/form-data;`
        }
      }
    ).then((response) => {
      setIsApiUpdate(isApiUpdate + 1) // api 업데이트
      handleByweekWrite() // 글쓰기 닫기

      setByweekInputTitle('') // 글쓰기 useState 초기화
      setByweekInputContent('')
      setStartDate(new Date())
      setEndDate(new Date())
      setInputAssignmentExists(true)
      setInputAutoAttendance(true)
      //초기화
    }).catch((error) => {
      console.log(error);
    })
  }


  //첨부파일 열기
  const openAttach = (attach, attachName) => {
    window.open(attach, attachName);
  }




  // 과제 제출 타입
  const [homeworkTypeOpen, setHomeworkTypeOpen] = useState(false);


  const [homeworkType, setHomeworkType] = useState('file');

  // 과제제출 api 파일
  const handleHomeWorkUplaodFile = (week) => {
    const fileData = new FormData();

    fileData.append("file", homeworksFiles && homeworksFiles.uploadFile);
    fileData.append("type", homeworkType);

    authApi.post(`studies/${studyId}/weeks/${week}/assignment`,
      fileData,
      {
        headers: {
          "Content-Type": `multipart/form-data;`
        }
      }
    ).then((response) => {
      setIsApiUpdate(isApiUpdate + 1) // api 업데이트

      setHomeworkType('file'); //초기화
      setHomeworkTypeOpen(false);
      setHomeworkLink('')
    }).catch((error) => {
      console.log(error);
    })

  }

  // 과제제출 api 링크
  const [homeworkLink, setHomeworkLink] = useState('');

  const handleHomeworkLink = (value, week) => {
    let tempLink = [...homeworkLink]
    tempLink[week] = value
    setHomeworkLink(tempLink)
  }
  const handleHomeWorkUplaodLink = (week) => {
    const fileData = new FormData();

    fileData.append("type", homeworkType);
    fileData.append("link", homeworkLink);

    authApi.post(`studies/${studyId}/weeks/${week}/assignment`,
      fileData,
      {
        headers: {
          "Content-Type": `multipart/form-data;`
        }
      }
    ).then((response) => {
      setIsApiUpdate(isApiUpdate + 1) // api 업데이트

      setHomeworkType('file'); //초기화
      setHomeworkTypeOpen(false);
      setHomeworkLink('')
    }).catch((error) => {
      console.log(error);
    })
  }




  // 주차 삭제 api
  const handleStudyWeekDelete = (week_value) => {
    if (window.confirm('해당 주차를 삭제하시겠습니까?')) {
      authApi.delete(`studies/${studyId}/weeks/${week_value}`)
        .then(res => {
          setIsApiUpdate(isApiUpdate + 1) // api 업데이트
        })
        .catch(err => console.log(err))
    }
  }



  // 과제 날짜 마감이 지나면 빨간색 표시를 위해 오늘 날짜 데이터 담기
  const today = new Date();


  return (
    <div className={`${styles.right_container}`}>
      {isHost ?
        <div className={`${styles.byweek_writebutton}`} onClick={() => handleByweekWrite()}>
          {writeOrCloseByweek}
        </div>
        : <></>}

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
                customInput={<CutomInputEnd />}
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
            <input type='text' className={`${styles.byweek_write_title_input}`} value={byweekInputTitle} onChange={(e) => setByweekInputTitle(e.target.value)}></input>
          </div>
        </div>

        <div>
          <div className={`${styles.byweek_write_contents}`}>
            <p>내용</p>
          </div>
          <div className={`${styles.byweek_write_contents_input_container}`}>
            {/* <input type='text' className={`${styles.byweek_write_contents_input}`}></input> */}
            <CKEditor
              editor={ClassicEditor}
              config={{ // (4)
                extraPlugins: [uploadPlugin]
              }}
              data={byweekInputContent}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                // console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                // console.log( { event, editor, data } );
                setByweekInputContent(data);
              }}
              onBlur={(event, editor) => {
                // console.log( 'Blur.', editor );
              }}
              onFocus={(event, editor) => {
                // console.log( 'Focus.', editor );
              }}
            />
          </div>
        </div>

        <div>
          <div className={`${styles.byweek_file_container}`}>
            {/* <button type='button' key='byweek_attach' className={`${styles.byweek_file_attech_button}`}>파일 첨부</button> */}
            <input type='file' id='fileupload' className={`${styles.byweek_file_attech_button}`}
              onChange={(e) => handleFileUpload(e)}
              multiple></input>
            <label htmlFor='fileupload' className={`${styles.byweek_file_attech_button_label}`} >
              파일첨부</label>
            <div className={`${styles.byweek_file_names}`}>
              {
                files.map((fileItem, fileIndex) => {
                  return (
                    <p className={`${styles.byweek_file_name}`}
                    >{fileItem.uploadFile.name}<span className={styles.byweek_file_name_cancel} onClick={() => handlefileUploadCancle(fileIndex)}>x</span></p>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div>
          <div className={`${styles.byweek_isHomework_toggle}`}>
            <p>과제 여부</p>
          </div>
          <div className={`${styles.byweek_toggles_contianer}`}>
            <input type='radio' name='isHomework' id='yesHomework' className={`${styles.byweek_toggle_on}`} onClick={() => setInputAssignmentExists(true)} defaultChecked /><label htmlFor='yesHomework'>ON</label>
            <input type='radio' name='isHomework' id='notHomework' className={`${styles.byweek_toggle_off}`} onClick={() => setInputAssignmentExists(false)} /><label htmlFor='notHomework'>OFF</label>
          </div>
        </div>

        {inputAssignmentExists ?
          <div>
            <div className={`${styles.byweek_isAutoAtten_toggle}`}>
              과제 제출에 따라 자동으로 출석 처리합니다.
            </div>
            <div className={`${styles.byweek_toggles_contianer}`}>
              <input type='radio' name='isAutoAttend' id='yesAutoAttend' className={`${styles.byweek_toggle_on}`} value={true} onClick={() => setInputAutoAttendance(true)} defaultChecked /><label htmlFor='yesAutoAttend'>ON</label>
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

      <div className={styles.byweek_contianer}>
        {
          weekInfo.map((item, index) => {
            return (
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
                    {
                      item.attachments.length > 0
                        ?
                        <div className={`${styles.byweek_each_attach_list}`}>
                          <p className={`${styles.byweek_each_attach_title}`}>첨부</p>
                          {
                            item.attachments.map((attachs) => {
                              return (
                                <>
                                  <p className={`${styles.bywee_each_attachs}`}
                                    onClick={() => openAttach(attachs.link, attachs.uploadFileName)}
                                  >
                                    {/* 파일 이름*/}
                                    {decodeURI(attachs.uploadFileName)}&nbsp;&nbsp;</p>
                                </>
                              )

                            })
                          }
                        </div>
                        :
                        <></>

                    }
                    {
                      isHost
                        ?
                        <div className={styles.byweek_revice_container}>

                          <p className={styles.byweek_delete_button}
                            onClick={() => handleStudyWeekDelete(item.week)}
                          >삭제</p>
                        </div>
                        :
                        <></>
                    }


                    {/* 과제 입력창*/}
                    {
                      item.assignmentExists
                        ?
                        <>
                          <div>
                            <div className={`${styles.byweek_period_endDate}`}>
                              과제 마감일:&nbsp;&nbsp;
                              {today < new Date(item.period.endDate)
                                ?
                                <>
                                  <div>{item.period.endDate.substring(0, 10)}&nbsp;&nbsp;{item.period.endDate.substring(11, 16)}
                                  </div>
                                </>
                                :
                                <>
                                  {/* 마감기간 지났을 땐 빨간색 표시 */}
                                  <div className={styles.byweek_period_red}>{item.period.endDate.substring(0, 10)}&nbsp;&nbsp;{item.period.endDate.substring(11, 16)}
                                  </div>
                                </>
                              }
                              {/* {item.period.endDate.substring(0, 10)}&nbsp;&nbsp;{item.period.endDate.substring(11, 16)} */}</div>
                            <div className={`${styles.byweek_each_homework_inputs}`}>

                              {/* <AssignmentSummit studyId={studyId} week={item.week} setIsApiUpdate={setIsApiUpdate} isApiUpdate={isApiUpdate} /> */}

                              {/* 타입 버튼을 열였느냐 */}
                              {homeworkTypeOpen
                                ?
                                <>
                                  <div onClick={() => setHomeworkTypeOpen(!homeworkTypeOpen)} className={`${styles.byweek_each_homework_type_select_ON}`}>
                                    {homeworkType == 'file'
                                      ?
                                      '파일'
                                      :
                                      '링크'
                                    }
                                    <div className={`${styles.byweek_each_homework_type_contianer}`}>
                                      <div onClick={() => setHomeworkType('file')}
                                        className={`${styles.byweek_each_homework_type_file}`}>
                                        파일</div>
                                      <div onClick={() => setHomeworkType('link')}
                                        className={`${styles.byweek_each_homework_type_link}`}
                                      >링크</div>
                                    </div>
                                  </div>
                                </>

                                : <>
                                  <div onClick={() => setHomeworkTypeOpen(!homeworkTypeOpen)} className={`${styles.byweek_each_homework_type_select}`}>
                                    {homeworkType == 'file'
                                      ?
                                      '파일'
                                      :
                                      '링크'
                                    }
                                  </div>
                                </>

                              }



                              {
                                homeworkType == 'file'
                                  ?
                                  // 파일을 선택했다면 
                                  <>
                                    <input type='file' id='homeworkupload' className={`${styles.byweek_file_homeworkAttach_button}`}
                                      onChange={(e) => handleHomworkUpload(e, item.week)}
                                    ></input>
                                    <label htmlFor='homeworkupload' className={`${styles.byweek_file_homeworkAttach_button_label}`} >파일첨부</label>


                                    <input type='text' className={`${styles.byweek_each_homework_input_fileON}`} value={HomewworkdFileName} disabled></input>
                                    <button type='button' className={`${styles.byweek_each_homework_button}`}
                                      onClick={() => handleHomeWorkUplaodFile(item.week)}
                                    >과제 등록</button>
                                  </>
                                  :
                                  // 링크를 선택했다면
                                  <>
                                    <input type='text' className={`${styles.byweek_each_homework_input}`} value={homeworkLink} onChange={(e) => setHomeworkLink(e.target.value, item.week)}></input>
                                    <button type='button' className={`${styles.byweek_each_homework_button}`}
                                      onClick={() => handleHomeWorkUplaodLink(item.week)}
                                    >과제 등록</button>

                                  </>
                              }



                            </div>

                            {/* 과제들*/}
                            <div className={styles.byweek_homework_container}>
                              {
                                item.submits.map((submit, submitindex) => {
                                  return (
                                    <>
                                      <div className={`${styles.byweek_each_homework_contianer}`}>
                                        <div className={`${styles.byweek_each_homework}`}>
                                          <div className={`${styles.byweek_each_homework_profile}`}>
                                            <Avatar
                                              size={40}
                                              name={submit.participant.nickname}
                                              variant="beam"
                                              colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                                            />
                                          </div>
                                          <div className={`${styles.byweek_each_homework_nickname_container}`}>
                                            <div className={`${styles.byweek_each_homework_nickname}`}><UserName userNickname={submit.participant.nickname} userId={submit.participant.id} /></div>
                                          </div>
                                          <div className={`${styles.byweek_each_homework_viewHomework}`}>
                                            <p onClick={() => window.open(submit.submitLink)}>과제보기</p>
                                          </div>
                                        </div>
                                      </div>
                                    </>

                                  )
                                })
                              }
                            </div>



                          </div>
                        </>
                        :
                        <>

                        </>

                    }

                  </div >
                </div >

              </>
            )
          })
        }

      </div >
    </div >
  )

}
