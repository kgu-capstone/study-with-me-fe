import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Card = ({
  title,
  key,
  study_title,
  study_explanation,
  study_people,
  study_image,
  card_function,
  study_recruit,
  study_favorite,
  study_category,
}) => {
  return (
    <div>
      <Link to="/StudyDetail" style={{ textDecoration: "none" }} studyId={key}>
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
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              ) : (
                <div className="heart">
                  <FontAwesomeIcon icon={faHeart} />{" "}
                  {/* 여기에 빈하트 아이콘 넣기 */}
                </div>
              )}
              <div className="heart">
                <FontAwesomeIcon icon={faHeart} />
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
              <p>{study_explanation}</p>
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
