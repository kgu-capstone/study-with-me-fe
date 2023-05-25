import "../css/Main.css";
import Ad from "../components/Ad";
import Category from "../components/Category";
import { DropDownSort } from "../components/DropDownSort";
import RealEstate from "../components/RealEstate";
import Card from "../components/Card";
import Foot from "../components/Foot";

import { useEffect, useState } from "react";
import { authApi } from "../services/api";
import * as sortManage from "../sortManage";
import { te } from "date-fns/locale";

import { useInView } from "react-intersection-observer";

function Main() {
  const [save_Sort_Status, setSaveSortStatus] = useState("date");
  const [save_Category_Status, setSaveCategoryStatus] = useState(1);
  const [save_category_css, setSave_category_css] = useState([
    "category_clicked",
    "category",
    "category",
    "category",
    "category",
    "category",
  ]);
  const [recruitStatus, setRecruitStatus] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [save_page_status, setSave_page_status] = useState(0);

  const [save_province_status, setSave_province_status] =
    useState("시/도 선택");
  const [save_city_status, setSave_city_status] = useState("구/군 선택");

  const [studyList, setStudyList] = useState([
    {
      id: 1,
      name: "Spring 스터디",
      description: "Spring 스터디입니다",
      category: "프로그래밍",
      thumbnail: "programming_Java.png",
      thumbnailBackground: "#FF0000",
      type: "온라인",
      recruitmentStatus: "모집중",
      currentMembers: 2,
      maxMembers: 10,
      registerDate: "2023-05-06T15:44:55.6582435",
      hashtags: ["스프링", "Spring", "프로그래밍", "김영한"],
      favoriteMarkingMembers: [94, 21, 50, 72, 22],
    },
    {
      id: 2,
      name: "JPA 스터디",
      description: "JPA 스터디입니다",
      category: "프로그래밍",
      thumbnail: "programming_Java.png",
      thumbnailBackground: "#FF0000",
      type: "온라인",
      recruitmentStatus: "모집중",
      currentMembers: 5,
      maxMembers: 4,
      registerDate: "2023-05-05T15:44:55.6582435",
      hashtags: ["Hibernate", "JPA", "프로그래밍", "김영한"],
      favoriteMarkingMembers: [10, 40, 40],
    },
    {
      id: 3,
      name: "Real MySQL 스터디",
      description: "programming_C.png",
      category: "프로그래밍",
      thumbnail: "programming_HTML.png",
      thumbnailBackground: "#FF0000",
      type: "오프라인",
      recruitmentStatus: "모집중",
      currentMembers: 5,
      maxMembers: 10,
      registerDate: "2023-05-04T15:44:55.6582435",
      hashtags: ["DBA", "Real MySQL", "DB"],
      favoriteMarkingMembers: [],
    },
    {
      id: 4,
      name: "코틀린 스터디",
      description: "aptitude_ncs_003.png",
      category: "프로그래밍",
      thumbnail: "programming_Baekjoon.png",
      thumbnailBackground: "#FF0000",
      type: "온라인",
      recruitmentStatus: "모집중",
      currentMembers: 2,
      maxMembers: 10,
      registerDate: "2023-05-03T15:44:55.6582435",
      hashtags: ["코틀린", "프로그래밍", "Kotlin"],
      favoriteMarkingMembers: [52, 91, 43, 21],
    },
    {
      id: 5,
      name: "네트워크 스터디",
      description: "네트워크 스터디입니다",
      category: "프로그래밍",
      thumbnail: "language_TEPS.png",
      thumbnailBackground: "#FF0000",
      type: "온라인",
      recruitmentStatus: "모집중",
      currentMembers: 2,
      maxMembers: 7,
      registerDate: "2023-05-02T15:44:55.6582435",
      hashtags: ["네트워크", "인프라", "OSI 7 Layer", "TCP/IP"],
      favoriteMarkingMembers: [46, 13, 50, 89],
    },
    {
      id: 6,
      name: "이펙티브 자바 스터디",
      description: "이펙티브 자바 스터디입니다",
      category: "프로그래밍",
      thumbnail: "interview_samsung.png",
      thumbnailBackground: "#FF0000",
      type: "온라인",
      recruitmentStatus: "모집중",
      currentMembers: 5,
      maxMembers: 8,
      registerDate: "2023-05-01T15:44:55.6582435",
      hashtags: ["자바", "프로그래밍", "이펙티브 자바"],
      favoriteMarkingMembers: [61, 12, 77, 85],
    },
    {
      id: 7,
      name: "AWS 스터디",
      description: "AWS 스터디입니다",
      category: "프로그래밍",
      thumbnail: "language_TOEIC.png",
      thumbnailBackground: "#FF0000",
      type: "오프라인",
      recruitmentStatus: "모집중",
      currentMembers: 0,
      maxMembers: 10,
      registerDate: "2023-04-30T15:44:55.6582435",
      hashtags: ["클라우드 플랫폼", "배포", "AWS"],
      favoriteMarkingMembers: [6, 49, 65, 17],
    },
    {
      id: 8,
      name: "Docker 스터디",
      description: "Docker 스터디입니다",
      category: "프로그래밍",
      thumbnail: "language_TOEFL.png",
      thumbnailBackground: "#FF0000",
      type: "온라인",
      recruitmentStatus: "모집중",
      currentMembers: 2,
      maxMembers: 6,
      registerDate: "2023-04-29T15:44:55.6582435",
      hashtags: ["컨테이너", "Docker"],
      favoriteMarkingMembers: [3, 73],
    },
  ]);

  //로그인 한 사용자라면 정보 불러오기
  const memberId = localStorage.getItem("id");

  useEffect(() => {
    if (memberId) {
      authApi
        .get(`members/${memberId}`)
        .then((response) => {
          if (response.data.interests[0] == "어학") {
            setSaveCategoryStatus(1);
          } else if (response.data.interests[0] == "면접") {
            setSaveCategoryStatus(2);
          } else if (response.data.interests[0] == "프로그래밍") {
            setSaveCategoryStatus(3);
          } else if (response.data.interests[0] == "인적성&NCS") {
            setSaveCategoryStatus(4);
          } else if (response.data.interests[0] == "자격증") {
            setSaveCategoryStatus(5);
          } else {
            setSaveCategoryStatus(6);
          }
          setSave_province_status(response.data.province);
          setSave_city_status(response.data.city);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  //스터디 불러오는 함수 호출 후 리스트 병합
  const getData = () => {
    sortManage
      .sortManage(
        save_Category_Status,
        save_Sort_Status,
        save_page_status,
        recruitStatus,
        save_province_status,
        save_city_status
      )
      .then((list) => {
        //페이지가 0일때는 처음부터임으로 리스트를 넣음
        if (save_page_status == 0) {
          setStudyList(list);
        }
        //페이지가 0이 아닐때는 추가해야함으로 배열 병함
        else {
          let temp = [...studyList];
          temp = temp.concat(list);
          setStudyList(temp);
        }
      });
  };

  // 정렬들 페이지가 0이라서 변화가 없다면 함수를 아예 불러주고
  // 0이나닐때는 페이지를 0으로 바꿔서 무한스크롤 함수에서 api함수를 호출하도록 함

  /* 
  useEffect(() => {
    if (save_page_status == 0) {
      getData();
    } else {
      setSave_page_status(0);
    }
  }, [save_Category_Status]);

  useEffect(() => {
    if (save_page_status == 0) {
      getData();
    } else {
      setSave_page_status(0);
    }
  }, [save_Sort_Status]);

  useEffect(() => {
    if (save_page_status == 0) {
      getData();
    } else {
      setSave_page_status(0);
    }
  }, [recruitStatus]);

  useEffect(() => {
    if (save_page_status == 0) {
      getData();
    } else {
      setSave_page_status(0);
    }
  }, [save_province_status]);

  useEffect(() => {
    if (save_page_status == 0) {
      getData();
    } else {
      setSave_page_status(0);
    }
  }, [save_city_status]);

  //무한스크롤
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setSave_page_status(save_page_status + 1);
    }
  }, [inView]);

  useEffect(() => {
    getData();
  }, [save_page_status]);
*/

  const [studies, setStudies] = useState([
    // 스터디 데이터 예시
    {
      id: 1,
      title: "English Study",
      category: "어학",
      study_title: "신박한 스터디",
      study_explanation: "신나게 박진감있게",
      study_people: "15/20",
      study_image: "/img/studyprofiles/language_TOEIC.png",
    },
    {
      id: 2,
      title: "Interview Preparation",
      category: "면접",
      study_title: "스팸",
      study_explanation: "삼성 가좌~~!",
      study_people: "5/7",
      study_image: "/img/studyprofiles/interview_samsung.png",
    },
    {
      id: 3,
      title: "Programming Study",
      category: "프로그래밍",
      study_title: "판교 등대지기",
      study_explanation: "코테준비하자",
      study_people: "19/20",
      study_image: "/img/studyprofiles/programming_Baekjoon.png",
    },
    {
      id: 4,
      title: "NCS",
      category: "인적성 & NCS",
      study_title: "대감집 노비",
      study_explanation: "공기업,공공기관",
      study_people: "17/20",
      study_image: "/img/studyprofiles/interview_NCS.png",
    },
    {
      id: 5,
      title: "Certificate",
      category: "자격증",
      study_title: "대학생 없다",
      study_explanation: "졸업하기ㅠㅠ",
      study_people: "30/35",
      study_image: "/img/studyprofiles/certificate_CIP.png",
    },
    {
      id: 6,
      title: "etc",
      category: "기타",
      study_title: "일본 워홀",
      study_explanation: "같이 일본어 공부해요!",
      study_people: "3/5",
      study_image: "/img/studyprofiles/language_JLPT.png",
    },

    {
      id: 7,
      title: "Programming Study",
      category: "프로그래밍",
      study_title: "프론트엔드",
      study_explanation: "JavaScript 기초",
      study_people: "6/10",
      study_image: "/img/studyprofiles/programming_JavaScript.png",
    },
    {
      id: 8,
      tilte: "English Study",
      category: "어학",
      study_title: "미국 유학 준비",
      study_explanation: "유학 준비 같이!!",
      study_people: "3/5",
      study_image: "/img/studyprofiles/language_TEPS.png",
    },
  ]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="main_main">
      <Ad />
      {/* */}
      <div className="category-area">
        <Category
          title="어학"
          category_num={1}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          category_css={save_category_css}
          category_css_set={setSave_category_css}
          recruit={recruitStatus}
        />
        <Category
          title="면접"
          category_num={2}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          category_css={save_category_css}
          category_css_set={setSave_category_css}
          recruit={recruitStatus}
        />
        <Category
          title="프로그래밍"
          category_num={3}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          category_css={save_category_css}
          category_css_set={setSave_category_css}
          recruit={recruitStatus}
        />
        <Category
          title="인적성 & NCS"
          category_num={4}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          category_css={save_category_css}
          category_css_set={setSave_category_css}
          recruit={recruitStatus}
        />
        <Category
          title="자격증"
          category_num={5}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          category_css={save_category_css}
          category_css_set={setSave_category_css}
          recruit={recruitStatus}
        />
        <Category
          title="기타"
          category_num={6}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          category_css={save_category_css}
          category_css_set={setSave_category_css}
          recruit={recruitStatus}
        />
      </div>
      {/* */}
      <div className="sort_area_container">
        <div className="sort_area_inner">
          <div className="sort-area">
            {recruitStatus == "off" ? (
              <span className="some-area some_area_dummy">
                더미
              </span> /* 꼼수.. */
            ) : (
              <span className="some-area">
                <RealEstate
                  setProvince={setSave_province_status}
                  setCity={setSave_city_status}
                  province={save_province_status}
                  city={save_city_status}
                />
              </span>
            )}

            <span className="test">
              <DropDownSort
                title="온/오프라인 전체"
                sub1="온/오프라인 전체"
                sub2="온라인만"
                sub3="오프라인만"
                selectedOption={selectedOption} // 현재 선택된 값 전달
                className="some-area"
                sub1_API={null}
                sub2_API="online"
                sub3_API="offline"
                setRecru_Sort={setRecruitStatus}
              />

              <DropDownSort
                title="모집 최신순"
                sub1="모집 최신순"
                sub2="찜 많은 순"
                sub3="리뷰많은순"
                sub1_API="date"
                sub2_API="favorite"
                sub3_API="review"
                selectedOption={selectedOption}
                className="some-area"
                setRecru_Sort={setSaveSortStatus}
              />
            </span>
          </div>
        </div>
      </div>
      {/* sort area 끝 */}

      <div className="card_area_container">
        <div className="card_area_inner">
          {/* 스터디 카드 들어갈 공간 */}
          {studyList &&
            studyList.map((item, index) => {
              let favorite_true = item.favoriteMarkingMembers.indexOf(memberId);
              return (
                <div className="card-area">
                  <Card
                    key={item.id}
                    study_title={item.name}
                    study_explanation={item.description}
                    study_people={`${item.currentMembers} / ${item.maxMembers}`}
                    study_image={`/img/studyprofiles/${item.thumbnail}`}
                    study_recruit={item.recruitmentStatus}
                    study_favorite={favorite_true}
                    study_category={item.category}
                  />
                </div>
              );
            })}
        </div>
      </div>

      {/* 무한 스크롤 */}
      {/* <div ref={ref}></div> */}

      <div className="footer-area">
        <Foot />
      </div>
    </div>
  ); // return 괄호인가/
}

export default Main;
