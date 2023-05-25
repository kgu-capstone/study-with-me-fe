import React, { useEffect, useState } from "react";
import Foot from "../components/Foot";
import { authApi } from "../services/api";
import UserName from "../components/UserName";
import Avatar from "boring-avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Rechart from "../Rechart";
import "../css/Main.css";
export default function StudyDetail({ studyId }) {
  // 희민님 여기에 스터디 기본 정보 불러오는거 구현하시면 됩니다!

  const [study_recruit, setStudy_recruit] = useState("모집중"); // 모집중 변수담아주세요
  const [hostName, setHostName] = useState("콩콩이"); // 방장닉네임 담아주세요.
  const [hostid, setHostId] = useState(1); // 방장아이디 담아주세요.
  const [reviews, setReviews] = useState([]);
  const [graduateCount, setGraduateCount] = useState(0);
  const [hashtag, setHashtag] = useState();
  const [people, setPeople] = useState(0);
  const [people_now, setPeopleNow] = useState(0);
  const [detailDescription, setDescription] = useState(
    "열정적으로 활동할 스티디원 모집합니다."
  );
  const [age, setAge] = useState(0);

  // 찜 버튼 구현부분
  const [like, setLike] = useState(false);
  const handleToggleLike = () => {
    setLike((prevLike) => !prevLike);
  };

  useEffect(
    (studyId) => {
      // 기본정보 api
      authApi.get(`studies/${studyId}`).then((response) => {
        // 희민 TODO... 나머지 정보들 useState에 저장 후 보이도록 설정
        setPeople(response.data.maxMembers);
        setHashtag(response.data.hashtags);
        setPeopleNow(response.data.currentMembers);
        setDescription(response.data.description);
        setAge(response.data.participants.age);

        document.getElementsByClassName(
          `StudyProfileArea`
        )[0].style.backgroundColor = `${response.data.thumbnailBackground}`;
      });

      // 리뷰 api
      authApi
        .get(`studies/${studyId}/reviews`)
        .then((response) => {
          setReviews(response.data.reviews);
          setGraduateCount(response.data.graduateCount);
        })
        .catch((err) => console.log(err));
    },
    [studyId]
  );

  //---------------

  return (
    <div className="studyDetail_contianer">
      <div className="StudyProfileArea">
        <div className="studydDetail_area_container">
          <div className="StudyDetail-first-line">
            <span className="studyDetail_recruit_status">
              {study_recruit == "모집중" ? (
                <img
                  width={5}
                  height={5}
                  className="card_recruit_status_img"
                  src={process.env.PUBLIC_URL + `/img/recruit_on.png`}
                  alt={study_recruit}
                />
              ) : (
                <img
                  width={5}
                  height={5}
                  className="card_recruit_status_img"
                  src={process.env.PUBLIC_URL + `/img/recruit_off.png`}
                  alt={study_recruit}
                />
              )}
              <p className="studyDetail_recruit_status_text">모집여부</p>
            </span>
            <span>
              <FontAwesomeIcon
                icon={faHeart}
                onClick={handleToggleLike}
                className={`studyDetail_heart ${like ? "liked" : ""}`}
              />
            </span>
          </div>

          <div className="StudyDetail-second-line">
            <img
              width={132}
              height={132}
              src="../img/FFFFFF.png"
              className="StudyDetail-img"
            />
            <div className="items-detail">
              <div>#{hashtag}</div>

              <p className="studyDetail_study_name"></p>
              <div>
                {people_now} / {people}
              </div>
              <div>
                <UserName userNickname={hostName} userId={hostid} />
              </div>
            </div>
            <div className="apply-button-area">
              <button className="apply-button ">지원하기</button>
            </div>
          </div>
        </div>
      </div>

      <div className="contents">
        <div className="contents_inner">
          <div className="contents-area">
            <p className="studyDetail_study_contents_title">스터디 모집 내용</p>
            <div>{detailDescription}</div>
          </div>

          <div className="contents-area">
            <p className="studyDetail_study_age_title">스터디원 나이 분포</p>
            <div>
              <Rechart />
            </div>
          </div>

          <div className="contents-area">
            <div className="studyDetail_study_review_title_contianer">
              <p className="studyDetail_study_review_title">
                이 스터디를 졸업한 사람의 리뷰를 들어보세요.
              </p>
              <p className="studyDetail_study_graduaion">
                졸업한 사람 수: {graduateCount}
              </p>
            </div>

            <div>
              {reviews.map((review) => {
                <div className="studyDetail_review_each_container">
                  <div className="studyDetail_review_top">
                    <div>
                      <Avatar
                        size={40}
                        name={review.reviewer.nickname}
                        variant="beam"
                        colors={[
                          "#FF3D1F",
                          "#FFEA52",
                          "#FF5037",
                          "#1FFF98",
                          "#4D2BFF",
                        ]}
                      />
                    </div>
                    <div className="studyDetail_review_nick">
                      <UserName
                        userNickname={review.reviewer.nickname}
                        userId={review.reviewer.hostid}
                      />
                    </div>
                  </div>
                  <div>
                    리뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰
                  </div>
                </div>;
              })}

              {/* ---------------최종 올릴 때 아래 내용은 지울 것--------------*/}
              <div className="studyDetail_review_each_container">
                <div className="studyDetail_review_top">
                  <div>
                    <Avatar
                      size={40}
                      name="더미"
                      variant="beam"
                      colors={[
                        "#FF3D1F",
                        "#FFEA52",
                        "#FF5037",
                        "#1FFF98",
                        "#4D2BFF",
                      ]}
                    />
                  </div>
                  <div className="studyDetail_review_nick">
                    <UserName userNickname={"더미"} userId={1} />
                  </div>
                </div>
                <div>
                  리뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰뷰
                </div>
              </div>
              {/* -----------------------------------------------------*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//rfc
