import React, { useState } from 'react'
import styles from '../css/AssignmentSummit.module.css';
import { authApi } from '../services/api';

export default function AssignmentSummit({ studyId, week, setIsApiUpdate, isApiUpdate }) {
    const [homeworkTypeOpen, setHomeworkTypeOpen] = useState(false);

    const [homeworkType, setHomeworkType] = useState('file');


    const [homeworksFiles, setHomeworksFiles] = useState([]);
    const [HomewworkdFileName, setHomeworkFileName] = useState([]);

    //주차별로 파일 배열

    // 파일업로드
    const handleHomworkUpload = (e, week) => {
        console.log(week);
        console.log(e.target.files);
        const file = e.target.files[0];

        // 주차별로 파일이름
        let tempFile = [...homeworksFiles]
        tempFile[week] = { uploadFile: file }
        setHomeworksFiles(tempFile);
        console.log(tempFile);

        // 파일 이름만 
        let tempFilename = [...HomewworkdFileName]
        tempFilename[week] = e.target.files[0].name
        setHomeworkFileName(tempFilename)
        console.log(tempFilename);
    }

    // 과제제출 api 파일
    const handleHomeWorkUplaodFile = (week) => {
        const fileData = new FormData();

        fileData.append("file", homeworksFiles && homeworksFiles[week].uploadFile);
        fileData.append("type", homeworkType);

        for (const key of fileData.keys()) {
            console.log(key);
        }
        for (const value of fileData.values()) {
            console.log(value);
        }
        console.log(fileData);

        authApi.post(`studies/${studyId}/weeks/${week}/assignment`,
            fileData,
            {
                headers: {
                    "Content-Type": `multipart/form-data;`
                }
            }
        ).then((response) => {
            setIsApiUpdate(isApiUpdate + 1) // api 업데이트

            setHomeworkType('file'); // 값 초기화
            setHomeworkTypeOpen(false);
            setHomeworksFiles('')
            setHomeworkFileName('')
            setHomeworkLink('')
        }).catch((error) => {
            console.log(error);
        })

    }


    // 과제제출 api 링크
    const [homeworkLink, setHomeworkLink] = useState('');

    const handleHomeWorkUplaodLink = (week) => {
        const fileData = new FormData();

        fileData.append("type", homeworkType);
        fileData.append("link", homeworkLink);

        console.log(studyId);
        console.log(week);

        // authApi.post(`studies/${studyId}/weeks/${week}/assignment`,
        //     fileData,
        //     {
        //         headers: {
        //             "Content-Type": `multipart/form-data;`
        //         }
        //     }
        // ).then((response) => {
        //     setIsApiUpdate(isApiUpdate + 1) // api 업데이트

        //     setHomeworkType('file');// 값 초기화
        //     setHomeworkTypeOpen(false);
        //     setHomeworkLink('')
        //     setHomeworksFiles('')
        //     setHomeworkFileName('')
        // }).catch((error) => {
        //     console.log(error);
        // })
    }



    return (
        <div>
            <div className={`${styles.byweek_each_homework_inputs}`}>

                {/* 타입 버튼을 열였느냐 */}
                {
                    homeworkTypeOpen
                        ?
                        <>
                            <div onClick={() => setHomeworkTypeOpen(!homeworkTypeOpen)} className={`${styles.byweek_each_homework_type_select_ON}`} >
                                {homeworkType == 'file'
                                    ?
                                    '파일'
                                    :
                                    '링크'
                                }
                                <div className={`${styles.byweek_each_homework_type_contianer}`}>
                                    <div onClick={() => setHomeworkType('file')}
                                        className={`${styles.byweek_each_homework_type_file}`}>
                                        파일
                                    </div>
                                    <div onClick={() => setHomeworkType('link')}
                                        className={`${styles.byweek_each_homework_type_link}`}>
                                        링크
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>{/* 버튼 안열음 */}
                            <div onClick={() => setHomeworkTypeOpen(!homeworkTypeOpen)}
                                className={`${styles.byweek_each_homework_type_select}`}>
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
                        <>
                            <input type='file' id='homeworkupload' className={`${styles.byweek_file_homeworkAttach_button}`}
                                onChange={(e) => handleHomworkUpload(e, week)}
                            ></input>
                            <label htmlFor='homeworkupload' className={`${styles.byweek_file_homeworkAttach_button_label}`}>파일첨부</label>

                            <input type='text' className={`${styles.byweek_each_homework_input_fileON}`}
                                value={HomewworkdFileName[week]} disabled
                            ></input>
                            {/* 과제제출 버튼(파일) */}
                            <button type='button' className={`${styles.byweek_each_homework_button}`}
                                onClick={() => handleHomeWorkUplaodFile(week)}
                            >과제 등록</button>

                        </>
                        :
                        <>

                            <input type='text' className={`${styles.byweek_each_homework_input}`} value={homeworkLink} onChange={(e) => setHomeworkLink(e.target.value)}></input>
                            {/* 과제제출 버튼(링크) */}
                            <button type='button' className={`${styles.byweek_each_homework_button}`}
                                onClick={() => handleHomeWorkUplaodLink(week)}
                            >과제 등록</button>
                        </>

                }


            </div>
        </div>
    )
}
