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

function Main() {
  
  const [province, setProvince] = useState("시/도");
  const [city, setCity] = useState("구/군");
  const [save_Sort_Status, setSaveSortStatus] = useState("date");
  const [save_Category_Status, setSaveCategoryStatus] = useState(3);
  const [recruitStatus, setRecruitStatus] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const [studyList, setStudyList] = useState([]);
  const getData = () => {
    sortManage.sortManage(save_Category_Status, save_Sort_Status, recruitStatus).then((list) => {   
      setStudyList(list)
    })
  }

  useEffect(() => {
    getData();

  }, []);


  useEffect(() => {
    getData();

  }, [save_Category_Status]);

  useEffect(() => {
    getData();

  }, [save_Sort_Status]);

  useEffect(() => {
    getData();

  }, [recruitStatus]);

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

  // 필터링된 스터디 데이터 가져오기
  const filteredStudies = selectedCategory
    ? studies.filter((study) => study.category === selectedCategory)
    : studies;

  return (
    <div>
      <Ad />
      {/* */}
      <div className="category-area">
        <Category
          title="어학"
          category_num={1}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          recruit={recruitStatus}
        />
        <Category
          title="면접"
          category_num={2}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          recruit={recruitStatus}
        />
        <Category
          title="프로그래밍"
          category_num={3}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          recruit={recruitStatus}
        />
        <Category
          title="인적성 & NCS"
          category_num={4}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          recruit={recruitStatus}
        />
        <Category
          title="자격증"
          category_num={5}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          recruit={recruitStatus}
        />
        <Category
          title="기타"
          category_num={6}
          sort_arrange={save_Sort_Status}
          category_arrange={setSaveCategoryStatus}
          recruit={recruitStatus}
        />
      </div>
      {/* */}
      <div className="sort-area">
        {recruitStatus == "off" ? (
          <></>
        ) : (
          <span>
            <RealEstate
              className="some-area"
              setProvince={setProvince}
              setCity={setCity}
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
            sub2_API="on"
            sub3_API="off"
            fun={sortManage}
            setRecru_Sort={setRecruitStatus}
            save_Category_Status={save_Category_Status}
            save_Sort_Status={save_Sort_Status}
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
            save_Category_Status={save_Category_Status}
            save_Sort_Status={recruitStatus}
          />
        </span>
      </div>
      {/* sort area 끝 */}

      {/* 스터디 카드 들어갈 공간 */}
      {studyList && studyList.map((item, index) => {
        return(
        <div className="card-area">
          <Card
            key={item.id}
            study_title={item.name}
            study_explanation={item.description}
            study_people={`${item.currentMembers} / ${item.maxMembers}`}
            study_image={item.thumbnail}
          />
        </div>
        )
      })}
      

      <div className="card-area">
        {filteredStudies.slice(0, 4).map((study) => (
          <Card
            key={study.id}
            title={study.title}
            study_title={study.study_title}
            study_explanation={study.study_explanation}
            study_people={study.study_people}
            study_image={study.study_image}
          />
        ))}
      </div>

      <div className="card-area">
        {filteredStudies.slice(4).map((study) => (
          <Card
            key={study.id}
            title={study.title}
            study_title={study.study_title}
            study_explanation={study.study_explanation}
            study_people={study.study_people}
            study_image={study.study_image}
          />
        ))}
      </div>

      <Foot />
    </div>
  ); // return 괄호인가/
}

export default Main;
