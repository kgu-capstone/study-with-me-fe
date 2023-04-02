import React, { Component } from 'react'
import './Nav.css';
import SignIn from './SignIn';

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
    return (
        <div>
        <div className='nav-area'>
            <nav>
                <img src="./img/logo.svg" class="logo-area" />

                <div class="nickname-area">
                <p onClick={this.openLoginModal} class="nav-detail nav_links">로그인</p>
                
                </div>
            </nav>
            </div> 
         <SignIn isOpen={this.state.isLoginModalOn} close={this.closeLoginModal}/>
         </div>
    )
  }
}
