import React, { useState } from "react";
import "../css/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import parse from "html-react-parser";

const Card = ({
  study_id,
  study_title,
  study_explanation,
  study_people,
  study_image,
  study_recruit,
  study_favorite,
  study_category,
}) => {
  const [like, setLike] = useState(study_favorite);
  const handleToggleLike = () => {
    setLike((prevLike) => !prevLike);
  };

  return (
    <div>
      <div></div>
      <Link
        to={`/study?name=${study_title}`}
        style={{ textDecoration: "none" }}
        state={{ studyId: study_id }}
      >
        <div className="card">
          <div className="card-body">
            <div className="card_top_container">
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
              {study_recruit}
              {study_favorite != -1 ? (
                <div className="heart">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`studyDetail_heart ${like ? "liked" : ""}`}
                    onClick={handleToggleLike}
                  />
                </div>
              ) : (
                <div className="heart">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`studyDetail_heart ${like ? "liked" : ""}`}
                    onClick={handleToggleLike}
                  />{" "}
                </div>
              )}
              <div className="heart">
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`studyDetail_heart ${like ? "liked" : ""}`}
                  onClick={handleToggleLike}
                />
              </div>
            </div>
            <div className="study_card_img_contianer">
              <img
                className="study_card_img_setting"
                src={study_image} // 이미지 주소를 src 속성에 설정
                alt={study_title} // 이미지에 대한 대체 텍스트
              />
            </div>
            <h5 className="card-title">{study_title}</h5>
            <div className="card-explanation">
              <p>{parse(study_explanation)}</p>
            </div>

            <p className="card-people">{study_people}</p>
            <p className="card_category">{study_category}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
