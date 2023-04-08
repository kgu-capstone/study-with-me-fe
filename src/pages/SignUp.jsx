import React, { Component, useCallback, useState } from 'react';
import '../css/SignUp.css';
import Avatar from "boring-avatars";
import { useLocation } from 'react-router';

function SignIn() {

// 프로필바꾸기
const [nick, setNick] = useState('hi');

//년
const years=[];
for(let i = 2023; i >= 1900; i--){
    years.push(i);
}

//월
const months=[];
for(let i = 1; i <= 12; i++){
    if(i < 10){
        months.push("0"+i);
    }else{
        months.push(i);
    }
}

//일
const days=[];
const [year, setYear] = useState('2023')
const [month, setMonth] = useState('01');
let dates = new Date(year, month,0).getDate();
for(let i = 1; i <= dates; i++){
    if(i < 10){
        days.push("0"+ i.toString());
    }else{
        days.push(i);
    }
    
}

//시
const citys=[
    '서울특별시',
    '부산광역시',
    '대구광역시',
    '인천광역시',
    '광주광역시',
    '대전광역시',
    '울산광역시',
    '세종특별자치시',
    '경기도',
    '강원도',
    '충청북도',
    '충청남도',
    '전라북도',
    '전라남도',
    '경상북도',
    '경상남도',
    '제주특별자치도'
];

// 시/구
const townList=[
    ['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구'],
    ['중구','서구','동구','영도구','부산진구','동래구','남구','북구','해운대구','사하구','금정구','강서구','연제구','수영구','사상구','기장군'],
    ['중구','동구','서구','남구','북구','수성구','달서구','달성군'],
    ['중구','동구','미추홀구','연수구','남동구','부평구','계양구','서구','강화군','웅진군'],
    ['동구','서구','남구','북구','광산구'],
    ['동구','중구','서구','유성구','대덕구'],
    ['중구','남구','동구','북구','울주군'],
    ['세종특별차지시'],
    ['수원시','고양시','용인시','성남시','부천시','화성시','안산시','남양주시','안양시','평택시','시흥시','파주시','의정부시','김포시','광주시','광명시','군포시','하남시','오산시','양주시','이천시','구리시','안성시','포천시','의왕시','양평군','여주시','동두천시','가평군','과천시','연천군'],
    ['춘천시','원주시','강릉시','동해시','태백시','속초시','삼척시','홍천군','횡성군','영월군','평창군','정성군','철원군','화천군','양구군','인제군','고성군','양양군'],
    ['청주시','충주시','제천시','보은군','옥천군','영동군','증평군','진천군','괴산군','음성군','단양군'],
    ['천안시','공주시','보령시','아산시','서산시','논산시','계룡시','당진시','금산군','부여군','서천군','청양군','홍성군','예산군','태안군'],
    ['전주시','군산시','익산시','정읍시','남원시','김제시','완주군','진안군','무주군','장수군','임실군','순창군','고창군','부안군'],
    ['목포시','여수시','순천시','나주시','광양시','담양군','곡성군','구례군','고흥군','보성군','화순군','장흥군','강진군','해남군','영암군','무안군','함평군','영광군','장성군','완도군','진도군','신안군'],
    ['포항시','경주시','김천시','안동시','구미시','영주시','영천시','상주시','문경시','경산시','군위군','의성군','청송군','영양군','영덕군','청도군','고령군','성주군','칠곡군','예천군','봉화군','울진군','울릉군'],
    ['창원시','진주시','통영시','사천시','김해시','밀양시','거제시','양산시','의령군','함안군','창녕군','고성군','남해군','하동군','산청군','함양군','거창군','합천군'],
    ['제주시','서귀포시']
];

const towns=[]
const [city, setCity] = useState('서울특별시');
for(let i = 0; i < townList[citys.indexOf(city)].length; i++){
    towns.push(townList[citys.indexOf(city)][i]);    
}

const name = localStorage.getItem("name");
const email = localStorage.getItem("email");

    return (
        <div>
            <div className='main_container'>
                <div className='logos'>
                    <img src={process.env.PUBLIC_URL + '/img/logo.svg'}/>
                </div>
                <div className='description'>
                    <p>회원가입을 진행해주세요 :)</p>
                </div>
                <div className='profile'>
                    <Avatar
                        size={133}
                        name={nick}
                        variant="beam"
                        colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                    />            
                </div>
                <div>
                    <form>
                        <div className='floor'>
                            <div className='labels'>
                                <label htmlFor='name'>이름</label>
                            </div>
                            <div>
                                <input type='text' id='name' value={name} className='inputs_readonly inputs inputs_one' readOnly/>
                            </div>                            
                        </div>
                        <div className='floor'>
                            <div className='labels'>
                                <label htmlFor='email'>이메일</label>
                            </div>
                            <div>
                                <input type='text' id='email' value={email} className='inputs_readonly inputs inputs_one' readOnly/>
                            </div>
                        </div>
                        <div className='floor'>
                            <div className='labels'>
                                <label htmlFor="nick">닉네임</label>
                            </div>
                            <div>
                                <input type="text" id="nick" className='inputs inputs_one' onChange={(e) => setNick(e.target.value)}/>
                            </div>
                        </div>
                        <div className='floor'>
                            <div className='labels'>
                                <label htmlFor="tel">연락처</label>
                            </div>
                            <div>
                                <input type="text" id="tel" className='inputs inputs_one'/>
                            </div>
                        </div>
                        <div className='floor'>
                            <div className='labels'>
                                <label htmlFor="birth">생년월일</label>
                            </div>
                            <div>
                                
                                <select id="birth-year" className='inputs inputs_three inputs_margin' onChange={(e) => setYear(e.target.value)}>
                                    {years.map((year)=> {
                                        return (
                                            <option value={year} key={year}>{year}</option>
                                        );
                                    })}

                                </select>
                                <select id="birth-month" className='inputs inputs_three inputs_margin' onChange={(e) => setMonth(e.target.value)}>
                                    {months.map((month)=> {
                                        return (
                                            <option value={month} key={month}>{month}</option>
                                        );
                                    })}

                                </select>
                                <select id="birth-day" className='inputs inputs_three'>
                                    {days.map((day)=> {
                                        return (
                                            <option value={day} key={day}>{day}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='floor'>
                            <div className='labels'>
                                성별
                            </div>
                            <div className='selects'>
                                <input type="radio" name="gender" id="man" className='radios'/><label htmlFor="man" className='inputs_margin'>남</label>
                                <input type="radio" name="gender" id="woman" className='radios'/><label htmlFor="woman">여</label>
                            </div>
                        </div>
                        <div className='floor'>
                            <div className='labels'>
                                거주지역
                            </div>
                            <div>
                                <select id="area-city" className='inputs inputs_two inputs_margin' onChange={(e) => setCity(e.target.value)}>
                                    {citys.map((item)=> {
                                        return (
                                            <option value={item} key={item}>{item}</option>
                                        );
                                    })}

                                </select>
                                <select id="area-town" className='inputs inputs_two'>
                                    {towns.map((town)=> {
                                        return (
                                            <option value={town} key={town}>{town}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='floor'>
                            <div className='labels'>
                                관심분야
                            </div>
                            <div className='selects'>
                                <input type='checkbox' name='category' id='1' className='checkboxs' value={'어학'}/><label htmlFor="1">어학</label>
                                <input type='checkbox' name='category' id='2' className='checkboxs' value={'면접'}/><label htmlFor="2">면접</label>
                                <input type='checkbox' name='category' id='3' className='checkboxs' value={'프로그래밍'}/><label htmlFor="3">프로그래밍</label>
                                <input type='checkbox' name='category' id='4' className='checkboxs' value={'인적성 & NCS'}/><label htmlFor="4">인적성 & NCS</label>
                                <input type='checkbox' name='category' id='5' className='checkboxs' value={'자격증'}/><label htmlFor="5">자격증</label>
                                <input type='checkbox' name='category' id='6' className='checkboxs' value={'기타'}/><label htmlFor="6">기타</label>
                            </div>
                        </div>
                        <div className='floor'>
                            <div className='button_container'>
                                <input type="submit" className='buttons' value="회원가입"/>
                            </div>
                        </div>
                    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;