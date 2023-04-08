import React, { Component } from 'react'
import styles from '../css/SignIn.module.css';
import GoogleLogin from '../components/GoogleLogin';

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
  render() {

    return (
        <div>
            <div className={styles.main_container}>
                <div className={styles.logos}>
                    <img src={process.env.PUBLIC_URL + '/img/logo.svg'}/>
                </div>
                <div className={styles.description}>
                    <p>로그인</p>
                </div>
                <div className={styles.google_login}>                   
                    <GoogleLogin/>
                </div>
            </div>
    </div>
    )
  }
}
