import React, { Component, useState } from 'react'
import './Nav.css';
import SignIn from './SignIn';
import Avatar from "boring-avatars";

export default class Nav extends Component {
    constructor(){
        super();
        this.state = {
            isLoginModalOn: false,
        }
    }

    openLoginModal = () => {
        this.setState({
            isLoginModalOn: true,
        });
    };

    closeLoginModal = () => {
        this.setState({
            isLoginModalOn: false
        })
    }
  render() {
    const isLogin = this.props.isLogin
    
    return (
        <div>
        <div className='nav-area'>
            <nav>
                <img src="./img/logo.svg" className='logo-area' />

                {isLogin ? //로그인 상태일 때
                    <div className='nickname-area'>
                        <div className='nav-detail'>
                        <Avatar
                            size={40}
                            name='하이'
                            variant="beam"
                            colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                            /> 
                        </div>
                        <p className='nav-detail'>하이 님</p>
                    </div>
                : // 로그인 안되어있을 때
                    <p onClick={this.openLoginModal} className='nav-detail nav_links'>로그인</p>
                }
                    
            </nav>
            </div> 
         <SignIn isOpen={this.state.isLoginModalOn} close={this.closeLoginModal}/>
         </div>
    )
  }
}
