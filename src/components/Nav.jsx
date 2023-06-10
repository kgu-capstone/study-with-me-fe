import React, { Component, useEffect, useState } from "react";
import styles from "../css/Nav.module.css";
import Avatar from "boring-avatars";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { authApi } from '../services/api';

export default function Nav() {

  const [isLogin, setIsLogin] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const [nick, setNick] = useState("nick");

  useEffect(() => {
    setIsLogin(localStorage.getItem("isLogin"))

    // 사용자 id get
    const memberId = localStorage.getItem("id")
    authApi.get(`members/${memberId}`)
      .then((response) => {
        setNick(response.data.nickname)
      })
  }, [localStorage.getItem("nick")])

  return (
    <div>
      <div className={styles.nav_area}>
        <nav>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/img/logo.svg"}
              className={styles.logo_area}
            />
          </Link>

          {isLogin ?  //로그인 상태일 때
            <div className={styles.nickname_area}>
              <Avatar
                size={40}
                name={nick}
                variant="beam"
                colors={[
                  "#FF3D1F",
                  "#FFEA52",
                  "#FF5037",
                  "#1FFF98",
                  "#4D2BFF",
                ]}
              />
              <p className={styles.nav_detail}>{nick} 님</p>
              <div className={styles.dropdown}>
                <NavLink to="/mypage" className={styles.dropdown_contents}>
                  마이페이지
                </NavLink>
                <p
                  onClick={() => handleLogout()}
                  className={styles.dropdown_contents}
                >
                  로그아웃
                </p>
              </div>
            </div>
            :
            // 로그인 안되어있을 때
            <div>
              <div className={styles.nav_detail}>
                <NavLink
                  to="/login"
                  className={`${styles.nav_detail} ${styles.nav_links}`}
                >
                  로그인
                </NavLink>
              </div>
            </div>
          }
        </nav>
      </div>
    </div>
  )
}
