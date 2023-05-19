import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Card = ({
  title,
  study_title,
  study_explanation,
  study_people,
  study_image,
  card_function,
}) => {
  return (
    <div>
      <Link to="/StudyDetail" style={{ textDecoration: "none" }}>
        <div className="card">
          <div className="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <img
              className="study_card_img_setting"
              src={study_image} // 이미지 주소를 src 속성에 설정
              alt={study_title} // 이미지에 대한 대체 텍스트
            />
            <h5 className="card-title">{study_title}</h5>
            <p className="card-text">{study_explanation}</p>
            <p className="card-text">{study_people}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
