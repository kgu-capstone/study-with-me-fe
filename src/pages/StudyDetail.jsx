import React from "react";
import Foot from "../components/Foot";
export default function StudyDetail() {
  return (
    <div>
      <div className="StudyProfileArea">
        <div className="container">
          <div className="StudyDetail-first-line">
            <span>모집여부</span>
            <span>하트</span>
          </div>
          <div className="StudyDetail-second-line">
            <img src="../img/FFFFFF.png" className="StudyDetail-img" />
            <div className="items-detail">
              <div>#해시태그</div>

              <h3>스터디 이름</h3>
              <div>인원</div>
              <div>방장 닉네임</div>
            </div>
          </div>
          <div className="apply-button-area">
            <button className="apply-button ">지원하기</button>
          </div>
        </div>
      </div>

      <div className="contents">
        <div>
          <div className="contents-area">
            <h3>스터디 모집 내용</h3>
            <div>내용...</div>
          </div>

          <div className="contents-area">
            <h3>나이 분포</h3>
            <div>결과창...</div>
          </div>

          <div className="contents-area">
            <h3>이 스터디를 졸업한 사람의 리뷰를 들어보세요.</h3>
            <div>내용...</div>
          </div>
        </div>
      </div>
    </div>
  );
}
//rfc
