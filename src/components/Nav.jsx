import React, { Component, useState } from 'react'
import styles from '../css/Nav.module.css';
import SignIn from '../pages/SignIn';
import MyPage from '../pages/MyPage';
import Avatar from "boring-avatars";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";


export default class Nav extends Component {
    constructor(){
        super();
        this.state = {
            isLogin : false,
        }
    }

    handleLogout = () => {
        localStorage.clear();

        window.location.reload();
    }

  render() {
    const nick = localStorage.getItem("nick");
    if(localStorage.getItem("isLogin")){
        this.state.isLogin = localStorage.getItem("isLogin");
    }
   
    return (
        <div>
        <div className={styles.nav_area}>
            <nav>
                <Link to = '/'><img src="./img/logo.svg" className={styles.logo_area} /></Link>
                
                {this.state.isLogin ? //로그인 상태일 때
                    <div className={styles.nickname_area}>
                        <Avatar
                            size={40}
                            name={nick}
                            variant="beam"
                            colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                            />             
                        <p className={styles.nav_detail}>{nick} 님</p>
                        <div className={styles.dropdown}>
                            <NavLink to = '/MyPage' className={styles.dropdown_contents}>마이페이지</NavLink>
                            <p onClick={this.handleLogout} className={styles.dropdown_contents}>로그아웃</p>
                        </div>
                    </div>
                    
                : // 로그인 안되어있을 때
                    <div>
                        <div className={styles.nav_detail}>
                            <NavLink to='/SignIn' className={`${styles.nav_detail} ${styles.nav_links}`}>로그인</NavLink>
                        </div>
                    </div>
                }    
            </nav>
            </div> 
         </div>
    )
  }
}
