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

  const [studyList, setStudyList] = useState([]);

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
      <div ref={ref}></div>

      <div className="footer-area">
        <Foot />
      </div>
    </div>
  ); // return 괄호인가/
}

export default Main;
