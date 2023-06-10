import React, { useEffect, useState } from "react";
import "../css/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import parse from "html-react-parser";
import { authApi } from '../services/api';

const Card = ({
  study_id,
  study_title,
  study_explanation,
  study_people,
  study_image,
  study_recruit,
  study_favorite,
  study_favorite_count,
  study_category,
}) => {
  // 화면 바뀌기 전까지 임시적으로 서버에서 정보를 다시받지 않고 프론트에서 바로 하트를 바꾸기 다루기 위한 찜 css
  const [favorite, setFavorite] = useState()
  const [favorite_count, setfavorite_count] = useState();
  useEffect(() => {
    setFavorite(study_favorite)
    setfavorite_count(study_favorite_count)
  }, [study_id])


  const handleToggleLike = () => {
    // // 찜 등록
    if (favorite == -1) {
      authApi.post(`studies/${study_id}/like`)
        .then((response) => {
          setFavorite(1)
          setfavorite_count(favorite_count + 1)
        })
        .catch(err => console.log(err))
    }
    //찜 취소
    else {
      authApi.delete(`studies/${study_id}/like`)
        .then((response) => {
          setFavorite(-1)
          setfavorite_count(favorite_count - 1)
        })
        .catch((err) => {
          console.log(err)
        })
    }

  };

  return (
    <div>
      <div className="card">
        <div className='card_favorite_contianer' onClick={() => handleToggleLike()}>
          <div className={`${favorite == -1 ? "card_favorite_count_none" : "card_favorite_count_liked"}`}>
            {favorite_count}
          </div>
          <div>
            <FontAwesomeIcon
              icon={faHeart}
              className={`${favorite == -1 ? "studyCard_heart_none" : "studyCard_heart_liked"}`}
            />
          </div>
        </div>
        <Link
          to={`/study?name=${study_title}`}
          style={{ textDecoration: "none" }}
          state={{ studyId: study_id, favorite: favorite }}
        >

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
              {/* {study_favorite != -1 ? (
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
              </div> */}
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

        </Link>
      </div>
    </div >
  );
};

export default Card;
