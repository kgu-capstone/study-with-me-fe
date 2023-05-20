import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../css/MakeStudy.module.css"
import '../css/MakeStudy.scss'

import Tags from '@yaireo/tagify/dist/react.tagify' // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS

import { authApi, defaultapi } from '../services/api';
import StudyProfileChoice from '../components/StudyProfileChoice';
import { useLocation } from 'react-router';

const MakeStudy = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  // 스터디 프로필 모달
  const [isview_profile_modal, setIsview_profile_modal] = useState(false);


  


  //카테고리 조회
  let [category_list, setCategory_list] = useState([])

  const category_find = () => {
      defaultapi.get(`categories`)
      .then((response) => {
          setCategory_list(response.data.result);

          for(let i = 0; i < category_list.length; i++){ //check박스
              category_list[i].isChecked = false;
          }
      })
      .catch((error) => {
          console.log(error);
      })
  }

  useEffect(category_find, []);


// 카테고리 넣기
const [categories, setCategories] = useState([]);





  // 참여인원 숫자만 입력되도록
  const handleNumberMax = (value) =>{
    value = value.replace(/[^0-9]/g, '')
    setStudyNumber(value);

  }

  // 최소 졸업 조건 수 숫자만 입력되도록
  const handlemin = (value) =>{
    value = value.replace(/[^0-9]/g, '')
    setMinimumAttendanceForGraduation(value);

  }





  //시
const citys=[
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도'
];

// 시/구
const [city, setCity] = useState('서울특별시');
const [town, setTown] = useState('종로구');

const townList=[
  ['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구'],
  ['중구','서구','동구','영도구','부산진구','동래구','남구','북구','해운대구','사하구','금정구','강서구','연제구','수영구','사상구','기장군'],
  ['중구','동구','서구','남구','북구','수성구','달서구','달성군'],
  ['중구','동구','미추홀구','연수구','남동구','부평구','계양구','서구','강화군','웅진군'],
  ['동구','서구','남구','북구','광산구'],
  ['동구','중구','서구','유성구','대덕구'],
  ['중구','남구','동구','북구','울주군'],
  ['세종특별차지시'],
  ['수원시','고양시','용인시','성남시','부천시','화성시','안산시','남양주시','안양시','평택시','시흥시','파주시','의정부시','김포시','광주시','광명시','군포시','하남시','오산시','양주시','이천시','구리시','안성시','포천시','의왕시','양평군','여주시','동두천시','가평군','과천시','연천군'],
  ['춘천시','원주시','강릉시','동해시','태백시','속초시','삼척시','홍천군','횡성군','영월군','평창군','정성군','철원군','화천군','양구군','인제군','고성군','양양군'],
  ['청주시','충주시','제천시','보은군','옥천군','영동군','증평군','진천군','괴산군','음성군','단양군'],
  ['천안시','공주시','보령시','아산시','서산시','논산시','계룡시','당진시','금산군','부여군','서천군','청양군','홍성군','예산군','태안군'],
  ['전주시','군산시','익산시','정읍시','남원시','김제시','완주군','진안군','무주군','장수군','임실군','순창군','고창군','부안군'],
  ['목포시','여수시','순천시','나주시','광양시','담양군','곡성군','구례군','고흥군','보성군','화순군','장흥군','강진군','해남군','영암군','무안군','함평군','영광군','장성군','완도군','진도군','신안군'],
  ['포항시','경주시','김천시','안동시','구미시','영주시','영천시','상주시','문경시','경산시','군위군','의성군','청송군','영양군','영덕군','청도군','고령군','성주군','칠곡군','예천군','봉화군','울진군','울릉군'],
  ['창원시','진주시','통영시','사천시','김해시','밀양시','거제시','양산시','의령군','함안군','창녕군','고성군','남해군','하동군','산청군','함양군','거창군','합천군'],
  ['제주시','서귀포시']
];

const towns=[]
for(let i = 0; i < townList[citys.indexOf(city)].length; i++){
  towns.push(townList[citys.indexOf(city)][i]);    
}

// 도를 바꾸면 시가 바로 안바뀌는 현상 때문에 도를 바꿀 때 처음에는 첫 값으로 할당해줌
const handleCity = (e) => {
  setCity(e);
  setTown(townList[citys.indexOf(e)][0]);
}





  
  // 해시태그 라이브러리
  const tagifyRef1 = useRef()

  const baseTagifySettings = {
    maxTags: 5,
    // backspace: "edit",
    placeholder: "type something",
    dropdown: {
      enabled: 0 // a;ways show suggestions dropdown
    }
      
  }

  const [tagifySettings, setTagifySettings] = useState([])
  const [tagifyProps, setTagifyProps] = useState({})

  // merged tagify settings (static & dynamic)
  const settings = {
    ...baseTagifySettings,
    ...tagifySettings,
  }


  // 해시태그 쪼개서 배열에 넣기
  const [hashtagarr, setHashtagarr] = useState([]);
  let hashtagarrtemp = [];

  const handleHashTag = useCallback((e) => {
    for(let i = 0; i < e.detail.tagify.value.length; i++){
      hashtagarrtemp[i] = e.detail.tagify.getCleanValue()[i].value

    }
    setHashtagarr(hashtagarrtemp)
  }, [])





  
  // 정보들
  const [studyThumbnail, setStudyThumbnail] = useState('thumbnailtemp.svg');
  const [studyName, setStudyName] = useState('');
  const [studyInfo, setStudyInfo] = useState('');
  const [studyNumber, setStudyNumber] = useState('');
  const [studyOnoff, setStudyOnoff] = useState('');

  const [minimumAttendanceForGraduation, setMinimumAttendanceForGraduation] = useState('');

  // 유효성 안맞았을 때 경고문들
  const [studyThumbnailWarning, setStudyThumbnailWarning] = useState('');
  const [studyNameWarning, setStudyNameWarning] = useState('');
  const [studyInfoWarning, setStudyInfoWarning] = useState('');
  const [studyCategroryWarning, setStudyCategroryWarning] = useState('');
  const [studyNumberWarning, setStudyNumberWarning] = useState('');
  const [studyOnoffWarning, setStudyOnoffWarning] = useState('');
  const [studyMinimumAttendanceForGraduationWarning, setStudyMinimumAttendanceForGraduationWarning] = useState('');
  const [studyHashTagWarning, setStudyHashTagWarning] = useState('')

  // 유효성 안맞았을 때 이동할 위치
  const thumbnailelement = document.getElementById('thumbnail');
  const categoryelement = document.getElementById('location_category')
  const onoffelement = document.getElementById('locationonoff');
  const hashelement = document.getElementById('hashloction')



  // 스터디 만들기 버튼
  const handleMakeStudy = () => {

    let data = {}

    // 값 있는지 검사
    if(studyThumbnail == 'thumbnailtemp.svg'){
      setStudyThumbnailWarning('스터디 사진을 선택해주세요');
      thumbnailelement.scrollIntoView();
    }
    else if(studyName == ''){
      setStudyThumbnailWarning('');
      setStudyNameWarning('스터디 이름을 입력해주세요');
      window.studyname.focus();
    }
    else if(studyInfo == ''){
      setStudyNameWarning('');
      setStudyInfoWarning('스터디 설명을 입력해주세요');
      window.info.focus();
    }
    else if(categories.length == 0 ){
      setStudyInfoWarning('');
      setStudyCategroryWarning('카테고리를 선택해주세요.');
      categoryelement.scrollIntoView();
    }
    else if((studyNumber == '') || (studyNumber < 2) || (studyNumber > 10)){
      setStudyCategroryWarning('');
      setStudyNumberWarning('2-10명 사이로 입력해주세요');
      window.membernumber.focus();
    }
    else if(studyOnoff == ''){
      setStudyNumberWarning('');
      setStudyOnoffWarning("온/오프라인 유무를 선택해주세요");
      onoffelement.scrollIntoView();
    }
    else if(minimumAttendanceForGraduation == ''){
      setStudyOnoffWarning('');
      setStudyMinimumAttendanceForGraduationWarning('졸업 최소 출석수를 입력해주세요');
      window.mimattend.focus();
    }
    else if(hashtagarr.length == 0){
      setStudyMinimumAttendanceForGraduationWarning('');
      setStudyHashTagWarning('해시태그를 하나 이락 입력해주세요.');
      hashelement.scrollIntoView();
    }

    // 모든값이 유효성 검사를 통과하면
    else{
      setStudyHashTagWarning('');


      //온라인 data
      if(studyOnoff == 'ON'){
        data = {
          "name" : studyName,
          "description" : studyInfo,
          "capacity" : studyNumber,
          "category" : categories,
          "thumbnail" : studyThumbnail,
          "type" : studyOnoff,
          "province" : null,
          "city" : null,
          "minimumAttendanceForGraduation" : minimumAttendanceForGraduation,
          "hashtags" : hashtagarr,
        }
      }
      // 오프라인 data
      else{
        data = {
          "name" : studyName,
          "description" : studyInfo,
          "capacity" : studyNumber,
          "category" : categories,
          "thumbnail" : studyThumbnail,
          "type" : studyOnoff,
          "province" : city,
          "city" : town,
          "minimumAttendanceForGraduation" : minimumAttendanceForGraduation,
          "hashtags" : hashtagarr,
        }
      }

      // api 발송
      authApi.post(`study`, data)
      .then((response) => {
        alert('스터디를 성공적으로 만들었습니다.')
        window.location.href = `${process.env.REACT_APP_BASE_URL}MyPage`;
      })
      .catch((e) => {
        if (e.response.status === 409){
          alert(e.response.message);
        }else(
          console.log(e)
        )
      })
    }
  }


  return (
    <div>
      <div className={styles.container_inner}>
        <div className={styles.center_arrange}>

          <div className={styles.logos}>
              <img src={process.env.PUBLIC_URL + '/img/logo.svg'}/>
          </div>

          <div>
            <p className={styles.title}>스터디 만들기</p>
          </div>



          <div id='thumbnail' className={styles.thumbnail} onClick={() => setIsview_profile_modal(true)}>
            <img width={133} height={133} src={process.env.PUBLIC_URL + `/img/studyprofiles/${studyThumbnail}`}/>
            
          </div>
          <p className={styles.studyWarning}>{studyThumbnailWarning}</p>
          
          <div>
          {isview_profile_modal && <StudyProfileChoice closeModal = {setIsview_profile_modal} setProfile = {setStudyThumbnail}/>}
          </div>



          <div>
            <div className={styles.study_name_area}>
              <div>스터디 이름</div>
              <input type="text" id='studyname' className={styles.study_name_input} value={studyName} onChange={(e) => setStudyName(e.target.value)}/>
              <p  className={styles.studyWarning}>{studyNameWarning}</p>
            </div>

            <div className={styles.study_info_area}>
              <div>스터디 설명</div>
              <textarea type="text" id='info' className={styles.study_info_input_box} value={studyInfo} onChange={(e) => setStudyInfo(e.target.value)} />
              <p className={styles.studyWarning}>{studyInfoWarning}</p>
            </div>

            <div id='location_category' className={styles.study_category_area}>
              <div>카테고리</div>
              {/* <input type="radio" name="onoff" id="off" className={styles.radios} value='OFF' onClick={(e) => setStudyOnoff(e.target.value)} /><label htmlFor="off">오프라인</label> */}
              <div className={styles.category_selects}>
                    {category_list.map((data) => {
                        return(
                            <><input type='radio' name='category' id={data.id} className={styles.category_input} value={data.id} key={data.id}                           
                            onClick={(e) => setCategories(e.target.value)}/>
                            <label className={styles.checkboxs_label} htmlFor={data.id}>{data.name}</label></>
                            );
                    })}              
              </div>
              <p className={styles.studyWarning}>{studyCategroryWarning}</p>
            </div>

            <div className={styles.number}>
              <div>참여 인원
                <img src='./img/info-circle.svg' className={styles.info_circle} /><p className={styles.info_warning}> 2명 - 10명 사이로 입력해주세요.</p>
              </div>
              <input id='membernumber' type="text" min={2} max={10} className={styles.study_number_input} 
                onChange={(e) => handleNumberMax(e.target.value)}
                value={studyNumber}
                />
              <p className={styles.studyWarning}>{studyNumberWarning}</p>
            </div>

            <div id='locationonoff' className={styles.on_offline}>
              <div>온/오프라인 유무</div>
              <div>
                <div className={styles.selects}>                
                  <input type="radio" name="onoff" id="on" className={styles.radios} value='online' onClick={(e) => setStudyOnoff(e.target.value)}/><label htmlFor="on" className={styles.rightMargin}>온라인</label>
                  <input type="radio" name="onoff" id="off" className={styles.radios} value='offline' onClick={(e) => setStudyOnoff(e.target.value)} /><label htmlFor="off">오프라인</label>
                </div>
              </div>
              <p className={styles.studyWarning}>{studyOnoffWarning}</p>
            </div>


            {
              studyOnoff == 'offline'
              ?
              <>
                <div className={styles.citychoice_container}>
                  <div>스터디 지역</div>
                  <div className={styles.citychoice}>
                    <select id="area-city" className={`${styles.city_inputs} ${styles.inputs_two} ${styles.rightMargin}`} onChange={(e) => handleCity(e.target.value)}>
                        {citys.map((city)=> {
                            return (
                                <option value={city} key={city}>{city}</option>
                            );
                        })}

                    </select>
                    <select id="area-town" className={`${styles.city_inputs} ${styles.inputs_two}`} onChange={(e) => setTown(e.target.value)}>
                        {towns.map((town)=> {
                            return (
                                <option value={town} key={town}>{town}</option>
                            );
                        })}
                    </select>
                  </div>
                </div>
              </>
              :
              <></>
            }

            <div className={styles.number}>
              <div>졸업 최소 출석 수
                <img src='./img/info-circle.svg' className={styles.info_circle} /><p className={styles.info_warning}> 졸업할 수 있는 최소 조건을 의미합니다.</p>
              </div>
              <input id='mimattend' type="text" className={styles.study_number_input} 
                onChange={(e) => handlemin(e.target.value)}
                value={minimumAttendanceForGraduation}
                />
              <p className={styles.studyWarning}>{studyMinimumAttendanceForGraduationWarning}</p>
            </div>


            

            <div id='hashloction' className={styles.hash_tag_area}>
              <div>해시태그</div>
              
    
                <div className={styles.hash_tag_input_container}>
                  <div className={styles.hash_tag_input}>

                  
                    <Tags    
                      tagifyRef={tagifyRef1}
                      settings={settings}
                      autoFocus={true}
                      {...tagifyProps}
                      value={hashtagarr}
                      onChange={(e) => handleHashTag(e)}
                      placeholder="입력 후 엔터를 눌러주세요." 
                      
                    />
                  </div>
                </div>
                <p className={styles.studyWarning}>{studyHashTagWarning}</p>
              
              </div>
            </div>

            <button className={styles.make_study_button} onClick={() => handleMakeStudy()}>스터디 만들기</button>
          </div>
        </div>
      </div>
  );
};

export default MakeStudy;
