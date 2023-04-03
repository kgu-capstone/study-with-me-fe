import React, { Component } from 'react'
import styles from './SignIn.module.css';
import GoogleLogin from './GoogleLogin';

export default class SignIn extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
  render() {
    const {isOpen, close} = this.props;
    return (
        <div>
            {isOpen ? (
                <div className={styles.modal_container}>
                    <div className={styles.main_container}>
                        <div className={styles.close_button}>
                            <img onClick={close} src="/img/close_button.svg"/>
                        </div>
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
            ) : null}
        
    </div>
    )
  }
}
