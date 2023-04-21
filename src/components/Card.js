import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Card = () => {
  return (
    <div>
      <Link to="/StudyDetail" style={{ textDecoration: "none" }}>
        <div className="card">
          <div className="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 className="card-title">스터디 이름</h5>
            <p className="card-text">스터디 소개 내용</p>
            <p className="card-text">0/10</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
