import React, {Component, useEffect, useState} from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import { authApi } from '../services/api';
import Avatar from "boring-avatars";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
/*import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';*/


function MyPage() {
// 사용자 id get
const memberId = localStorage.getItem("id")


//const axios.get()
let [memberNickname, setMemberNickname] = useState('');
let [memberEmail, setMemberEmail] = useState('');
let [memberBirth, setMemberBirth] = useState('');
let [memberGender, setMemberGender] = useState('');
let [memberRegion, setMemberRegion] = useState('');
let [memberInterest, setMemberInterest] = useState('');

useEffect(() => {
    authApi.get(`members/${memberId}`)
    .then((response) => {
        setMemberNickname(response.data.nickname);
        setMemberEmail(response.data.email);
        setMemberBirth(response.data.birth);
        setMemberGender(response.data.gender);
        setMemberRegion(response.data.region);
        setMemberInterest(response.data.interests);
    })
    .catch((error) => {
        console.log(error);
    })
}, [])

// 참여중인 스터디 리스트 변수
const [participateList, setParticipateList] = useState([]);

// api 함수
const my_participate = () => {
    authApi.get(`members/${memberId}/studies/participate`)
    .then((response) => {
        setParticipateList(response.data.result); 
        // return 부분에 participateList.map((item, index) => {return (<><div>item.name</div></> )}) 
        // 나는 이런식으로 map을 돌려
        // Announce.jsx 에 map을 엄청많이 사용했거든. 참고할 수 있을거야. (Announce가 좀 많이 복잡해져서 알아보기 힘들어지긴 했지만ㅎㅎ;;)

        // 펼치고 접는거는 밑에 내용을 dislplay: none; 해놓고 클릭하면 css가 block으로 바뀌게 했어.
        // <div>분리해서 제목이랑 펼쳤을 떄 나오는 내용이랑 분리하면 편할거야.

        // !!읽고 나서 주석은 지워줘!!
        
    })
    .catch((e) => {
        console.log(e);
    })
}
        return(

            <><>
                <div>
                    <label for='id' className='nicknameProfile'>{memberNickname}님 프로필</label>
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
                            </div>
                            <div className='alabele'>{memberNickname}</div>
                        <div>
                            <label for='id' className='blabele'>{memberEmail}</label>
                        </div>
                        <div>
                            <label for='id' className='clabele'>{memberBirth}</label>
                        </div>
                        <div>
                            <label for='id' className='dlabele'>{memberGender}</label>
                        </div>
                        <div>
                            <label for='id' className='elabele'>{memberRegion.province} {memberRegion.city}</label>
                        </div>
                        <div>
                            <label for='id' className='flabele'>{memberInterest}</label>
                        </div>
                    </div>
                
                <div class="square"></div>
                    <div onClick={() => my_participate()}>
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

                    <Link to="/MakeStudy">
                        <div class='squarebutton'></div>
                        <div>
                            <label for='id' className='createbutton'>스터디 만들기</label>
                        </div>
                    </Link>
            </></>


        )

}



export default MyPage;