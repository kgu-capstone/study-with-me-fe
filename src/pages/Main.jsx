import "../css/Main.css";
import Ad from "../components/Ad";
import Category from "../components/Category";
import DropDownSort from "../components/DropDownSort";
import RealEstate from "../components/RealEstate";
import Card from "../components/Card";
import Foot from "../components/Foot";
import { useState } from "react";

function Main() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [studies, setStudies] = useState([
    // 스터디 데이터 예시
    { id: 1, title: "English Study", category: "어학" },
    { id: 2, title: "Interview Preparation", category: "면접" },
    { id: 3, title: "Programming Study", category: "프로그래밍" },
    { id: 4, title: "NCS", category: "인적성 & NCS" },
    { id: 5, title: "Certificate", category: "자격증" },
    { id: 6, title: "etc", category: "기타" },
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
      <div>
        <Ad />
        <div className="category-area">
          <Category title="어학" onClick={() => handleCategoryClick("어학")} />
          <Category title="면접" onClick={() => handleCategoryClick("면접")} />
          <Category
            title="프로그래밍"
            onClick={() => handleCategoryClick("프로그래밍")}
          />
          <Category
            title="인적성 & NCS"
            onClick={() => handleCategoryClick("인적성 & NCS")}
          />
          <Category
            title="자격증"
            onClick={() => handleCategoryClick("자격증")}
          />
          <Category title="기타" onClick={() => handleCategoryClick("기타")} />
        </div>

        <div className="sort-area">
          <span>
            <RealEstate className="some-area" />
          </span>

          <span className="test">
            <DropDownSort
              title="온/오프라인 전체"
              sub1="온/오프라인 전체"
              sub2="온라인만"
              sub3="오프라인만"
              className="some-area"
            />
            <DropDownSort
              title="모집 최신순"
              sub1="모집 최신순"
              sub2="찜 많은 순"
              sub3="리뷰많은순"
              className="some-area"
            />
          </span>
        </div>
        {/* 필터링된 스터디 데이터를 이용하여 카드 생성 */}
        <div className="card-area">
          {filteredStudies.slice(0, 4).map((study) => (
            <Card key={study.id} title={study.title} />
          ))}
        </div>

        <div className="card-area">
          {filteredStudies.slice(0, 4).map((study) => (
            <Card key={study.id} title={study.title} />
          ))}
        </div>

        <Foot />
      </div>
    </div>
  );
}

export default Main;
