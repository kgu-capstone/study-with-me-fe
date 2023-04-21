import React, {Component} from 'react';
import '../css/MyPage.css';
import Avatar from "boring-avatars";
import Button from 'react-bootstrap/Button';
/*import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';*/


class MyPage extends Component {
    render(){
        return(

            <><>
                <div>
                    <label for='id' className='nicknameProfile'>닉네임님 프로필</label>
                </div>
                <div className='biprof'>
                <Avatar
                            size={158}
                            name="nick"
                            variant="beam"
                            colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                            />      
                </div>
                <div>
                    <div>

                        <div>
                            <label for='id' className='label'>닉네임</label>
                        </div>
                        <div>
                            <label for='id' className='labela'>이메일</label>
                        </div>
                        <div>
                            <label for='id' className='labelb'>생년월일</label>
                        </div>
                        <div>
                            <label for='id' className='labelc'>성별</label>
                        </div>
                        <div>
                            <label for='id' className='labeld'>지역</label>
                        </div>
                        <div>
                            <label for='id' className='labele'>관심사</label>
                        </div>
                        <div>
                            <label for='id' className='alabele'>별명</label>
                        </div>
                        <div>
                            <label for='id' className='blabele'>이메일@naver.com</label>
                        </div>
                        <div>
                            <label for='id' className='clabele'>2000.01.01</label>
                        </div>
                        <div>
                            <label for='id' className='dlabele'>여</label>
                        </div>
                        <div>
                            <label for='id' className='elabele'>경기도 수원시</label>
                        </div>
                        <div>
                            <label for='id' className='flabele'>면접</label>
                        </div>
                    </div>
                </div>
                <div class="square"></div>
                    <div>
                        <label for='id' className='astudy'>활동중인 스터디</label>
                    </div>
                    <div>
                        <label for='id' className='astudyarrow'>^</label>
                    </div>
                    <div className='astudyprof1'></div>
                    <div>
                        <label for='id' className='astudy1'>스터디 이름</label>
                    </div>
                    <div>
                        <label for='id' className='astudy11'>#분야</label>
                    </div>
                    <div className='astudyprof2'></div>
                    <div>
                        <label for='id' className='astudy2'>스터디 이름</label>
                    </div>
                    <div>
                        <label for='id' className='astudy22'>#분야</label>
                    </div>
                    <div class="square1"></div>
                    <div>
                        <label for='id' className='bstudy'>활동이 끝난 스터디</label>
                    </div>
                    <div>
                        <label for='id' className='bstudyarrow'>v</label>
                    </div>
                    <div class="square2"></div>
                    <div>
                        <label for='id' className='cstudy'>찜한 스터디</label>
                    </div>
                    <div>
                        <label for='id' className='cstudyarrow'>v</label>
                    </div>
                    <div class='squarebutton'></div>
                    <div>
                        <label for='id' className='createbutton'>스터디 만들기</label>
                    </div>           
            </></>


        )
    }
}



export default MyPage;