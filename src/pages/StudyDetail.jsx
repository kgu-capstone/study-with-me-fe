import React, { useEffect, useState } from "react";
import Foot from "../components/Foot";
import { authApi, defaultapi } from "../services/api";
import UserName from "../components/UserName";
import Avatar from "boring-avatars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Rechart from "../Rechart";
import "../css/Main.css";
import { useLocation } from "react-router";
import parse from "html-react-parser";

export default function StudyDetail() {
  // 넘어올 정보
  const location = useLocation();
  const studyId = location.state?.studyId;

  const [study_recruit, setStudy_recruit] = useState("모집중"); // 모집중 변수담아주세요
  const [hostName, setHostName] = useState("콩콩이"); // 방장닉네임 담아주세요.
  const [hostid, setHostId] = useState(1); // 방장아이디 담아주세요.

  const [thumbnail, setThumbnail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [graduateCount, setGraduateCount] = useState(0);
  const [hashtag, setHashtag] = useState();
  const [people, setPeople] = useState(0);
  const [people_now, setPeopleNow] = useState(0);
  const [detailDescription, setDescription] = useState(
    "열정적으로 활동할 스티디원 모집합니다."
  );
  const [age, setAge] = useState(0);
  const [studyName, setStudyName] = useState("");

  // 찜 버튼 구현부분
  const [like, setLike] = useState(false);
  const handleToggleLike = () => {
    setLike((prevLike) => !prevLike);
  };

  useEffect(() => {
    // 스크롤 맨 위로
    window.scrollTo(0, 0);

    // 기본정보 api
    defaultapi.get(`studies/${studyId}`).then((response) => {
      setPeople(response.data.maxMembers);
      setHashtag(response.data.hashtags);
      setPeopleNow(response.data.currentMembers);
      setDescription(response.data.description);
      setAge(response.data.participants.age);

      setHostName(response.data.host.nickname);
      setHostId(response.data.host.id);
      setStudy_recruit(response.data.recruitmentStatus ? "모집중" : "모집마감");

      setStudyName(response.data.name);

      setThumbnail(response.data.thumbnail);
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
  }, [studyId]);

  const apply = () => {
    authApi
      .post(`studies/${studyId}/applicants`)
      .then((response) => {
        alert(
          "지원이 완료되었습니다. 팀장이 승인하면 스터디를 들어갈 수 있습니다."
        );
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="studyDetail_contianer">
      <div className="StudyProfileArea">
        <div className="studydDetail_area_container">
          <div className="StudyDetail-first-line">
            <span className="studyDetail_recruit_status">
              {study_recruit === "모집중" ? (
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
              <p className="studyDetail_recruit_status_text">{study_recruit}</p>
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
              src={process.env.PUBLIC_URL + `/img/studyprofiles/${thumbnail}`}
              className="StudyDetail-img"
            />
            <div className="items-detail">
              <p className="studyDetail_study_name">{studyName}</p>
              <div className="studyDetail_hashtag">
                {hashtag &&
                  hashtag.map((item) => {
                    return <>#{item}&nbsp;&nbsp;</>;
                  })}
              </div>

              <div className="studyDetail_second_bottom">
                <div>
                  {people_now} / {people}
                </div>
                <div>
                  <UserName userNickname={hostName} userId={hostid} />
                </div>
              </div>
            </div>
            <div className="apply-button-area">
              <button className="apply-button" onClick={() => apply()}>
                지원하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="contents">
        <div className="contents_inner">
          <div className="contents-area">
            <p className="studyDetail_study_contents_title">스터디 모집 내용</p>
            <div className="studyDetail_study_contents">
              {parse(detailDescription)}
            </div>
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
              {reviews &&
                reviews.map((review) => {
                  return (
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
                      <div>{review.content}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//rfc
