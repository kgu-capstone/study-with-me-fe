import axios from 'axios';
import React, { Component } from 'react'
import { defaultapi } from '../services/api';

export default class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }


  handleLogin = async () => {
    const redirectUrl = encodeURIComponent(`${process.env.REACT_APP_BASE_URL}login`);
    const response = await defaultapi.get(`oauth/access?redirectUrl=${redirectUrl}`) // 1. 백엔드 서버에서 Authorization Code 요청 URL 받아오기

    window.location.href = response.data.result; // 구글 회원가입으로 이동
  };

  handleCallback = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const authorizationCode = searchParams.get('code'); // google redirect를 통해서 받아온 Authoriation Code
    const redirectUrl = encodeURIComponent(`${process.env.REACT_APP_BASE_URL}login`); // Redirect Url -> handleLogin의 redirectUri와 반드시 일치

    if (authorizationCode) {
      defaultapi
        .get(`oauth/login?authorizationCode=${authorizationCode}&redirectUrl=${redirectUrl}`) // 2. 백엔드 서버와 인증 통신 후 사용자 정보 + 토큰 받아오기
        .then((response) => {
          localStorage.setItem("nick", response.data.member.nickname); // 정보 저장
          localStorage.setItem("id", response.data.member.id);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);

          localStorage.setItem("isLogin", true);

          // window.location.href = `${process.env.REACT_APP_BASE_URL}`;
          window.location.href = localStorage.getItem("loginRedirectpath");
        })
        .catch((error) => {
          if (error.response.status === 401) { // DB에 사용저 정보 X -> 회원가입 페이지로 이동
            localStorage.setItem("name", error.response.data.name);
            localStorage.setItem("email", error.response.data.email);

            window.location.href = `${process.env.REACT_APP_BASE_URL}sign-up`;
          }
        });
    }
  };

  componentDidMount() {
    this.handleCallback();
  }

  componentDidUpdate() {
    this.handleCallback();
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <div>오류가 발생했습니다. 발생처 : GoogleLogin</div>;
    }

    return (
      <div onClick={this.handleLogin}>
        <img src={process.env.PUBLIC_URL + '/img/google_signIn.svg'} />
      </div>

    );
  }
}
