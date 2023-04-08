import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../css/Main.css";

function Main() {
  return (
    // 광고 부분
    <div className="ad-area">
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://www.htmlcsscolor.com/preview/gallery/FF5037.png"
              class="d-block w-100 ad-img"
              alt="..."
            />
          </div>

          <div class="carousel-item">
            <img
              src="https://www.htmlcsscolor.com/preview/gallery/FF5037.png"
              class="d-block w-100 ad-img"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className="tag-line">
        <div className="hash-tag-area">
          <a href="#">
            <button className="hash-tag">어학</button>
          </a>
          <a href="#">
            <button className="hash-tag">면접</button>
          </a>
          <a href="#">
            <button className="hash-tag">프로그래밍</button>
          </a>
          <a href="#">
            <button className="hash-tag">인적성 & NCS</button>
          </a>
          <a href="#">
            <button className="hash-tag">자격증</button>
          </a>
          <a href="#">
            <button className="hash-tag">기타</button>
          </a>
        </div>
      </div>

      <div className="card-area">
        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>
      </div>

      <div className="card-area">
        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <FontAwesomeIcon icon={faHeart} className="heart" />
            <h5 class="card-title">스터디 이름</h5>
            <p class="card-text">스터디 소개 내용</p>
            <p class="card-text">0/10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
