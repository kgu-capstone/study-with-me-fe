import "../css/Main.css";
import Ad from "../components/Ad";
import Category from "../components/Category";
import DropDownSort from "../components/DropDownSort";
import RealEstate from "../components/RealEstate";
import Card from "../components/Card";
import Foot from "../components/Foot";
import StudyDetail from "./StudyDetail";

function Main() {
  return (
    <div>
      <div>
        <Ad />
        <div className="category-area">
          <Category title="어학" />
          <Category title="면접" />
          <Category title="프로그래밍" />
          <Category title="인적성 & NCS" />
          <Category title="자격증" />
          <Category title="기타" />
        </div>

        <div className="sort-area">
          <span>
            <RealEstate />
          </span>

          <span className="test">
            <DropDownSort
              title="온/오프라인 전체"
              sub1="온/오프라인 전체"
              sub2="온라인만"
              sub3="오프라인만"
            />
            <DropDownSort
              title="모집 최신순"
              sub1="모집 최신순"
              sub2="찜 많은 순"
              sub3="리뷰많은순"
            />
          </span>
        </div>

        <div className="card-area">
          <div></div>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <div className="card-area">
          <div></div>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <Foot />
      </div>
    </div>
  );
}

export default Main;
