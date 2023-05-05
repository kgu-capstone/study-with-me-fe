import React from "react";
import "../css/Main.css";
import "../components/Category";
import Category from "../components/Category";
const MakeStudy = () => {
  return (
    <div>
      <div className="container-inner">
        <div className="center-arrange">
          <h3>스터디 만들기</h3>
          <div>
            <div className="study-title-area">
              <div>스터디 이름</div>
              <input type="text" />
            </div>

            <div className="study-info-area">
              <div>스터디 설명</div>
              <textarea type="text" className="input-box" />
            </div>

            <div className="number">
              <div>참여인원</div>
              <input type="number" />
            </div>

            <div className="on_offline">
              <div>온/오프라인 유무</div>
              <div>
                <button className="on_off_button">온라인</button>
                <button className="on_off_button">오프라인</button>
              </div>
            </div>

            <div className="hash-tag-area">
              <div>해시태그</div>
              <input placeholder="입력 후 엔터를 눌러주세요." />
              <div>#</div>
            </div>

            <button className="make_study_button">스터디 만들기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeStudy;
