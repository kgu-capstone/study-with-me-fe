import React, { useEffect, useState } from 'react'
import styles from '../css/ProfileRevice.module.css'
import Avatar from 'boring-avatars';
import { authApi, defaultapi } from '../services/api';
import { useLocation } from 'react-router';

export default function ProfileRevice(props) {


    // 사용자 id get
    const memberId = localStorage.getItem("id")




    // 닉네임 + 프로필바꾸기
    const handleNick = (nickValue) => {
        nickValue = nickValue.replace(' ', '')
            .replace(/[^a-z|A-Z|0-9|ㄱ-ㅎ|가-힣]/g, "");

        setMemberNickname(nickValue)
    }

    //시
    const citys = [
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
    const [city, setCity] = useState('서울특별시');
    const [town, setTown] = useState('종로구');

    const townList = [
        ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
        ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
        ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
        ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '웅진군'],
        ['동구', '서구', '남구', '북구', '광산구'],
        ['동구', '중구', '서구', '유성구', '대덕구'],
        ['중구', '남구', '동구', '북구', '울주군'],
        ['세종특별차지시'],
        ['수원시', '고양시', '용인시', '성남시', '부천시', '화성시', '안산시', '남양주시', '안양시', '평택시', '시흥시', '파주시', '의정부시', '김포시', '광주시', '광명시', '군포시', '하남시', '오산시', '양주시', '이천시', '구리시', '안성시', '포천시', '의왕시', '양평군', '여주시', '동두천시', '가평군', '과천시', '연천군'],
        ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정성군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
        ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
        ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
        ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
        ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
        ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
        ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
        ['제주시', '서귀포시']
    ];

    const towns = []
    for (let i = 0; i < townList[citys.indexOf(city)].length; i++) {
        towns.push(townList[citys.indexOf(city)][i]);
    }

    // 도를 바꾸면 시가 바로 안바뀌는 현상 때문에 도를 바꿀 때 처음에는 첫 값으로 할당해줌
    const handleCity = (e) => {
        setCity(e);
        setTown(townList[citys.indexOf(e)][0]);
    }

    // 이메일 수신 동의 체크박스 바꾸기
    const [email_check_css, setEmail_check_css] = useState('email_check_false.png');
    const [email_check, setEmail_check] = useState(false);

    const handleEmail_check = () => {
        if (email_check_css == 'email_check_false.png') {
            setEmail_check_css('email_check_true.png')
            setEmail_check(true)
        } else {
            setEmail_check_css('email_check_false.png')
            setEmail_check(false)
        }
    }





    // 관심분야 카테고리


    //카테고리 조회
    let [category_list, setCategory_list] = useState([]);
    let [category_css, setCategory_css] = useState([]);

    //카테고리 css 임시배열
    let tempcss = []

    const category_find = () => {
        defaultapi.get(`categories`)
            .then((response) => {
                setCategory_list(response.data.result);

                for (let i = 0; i < category_list.length; i++) { //check박스

                    tempcss[i] = styles.category_display

                }
                setCategory_css(tempcss)
                console.log(tempcss);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        category_find()
    }, [])


    //사용자 관심분야 넣기
    const [categories, setCategories] = useState([]);

    const [message_nick, setMessage_nick] = useState('');
    const [message_tel, setMessage_tel] = useState('');
    const [message_gender, setMessage_gender] = useState('');
    const [message_category, setMessage_category] = useState('');




    const handelCategory = (e, index) => { // 카테고리 배열에

        let tempcss = [...category_css]
        let tempvalue = [...categories]
        if (tempvalue.includes(parseInt(e))) { // 있으면 삭제
            tempvalue = tempvalue.filter(tempvalue => tempvalue !== parseInt(e))

            //css영역
            tempcss[index] = styles.category_display
        } else { // 없으면 추가

            tempvalue.push(parseInt(e))

            //css영역
            tempcss[index] = styles.category_display_checked

        }
        tempvalue.sort();

        setCategories(tempvalue)
        setCategory_css(tempcss)


    }






    //const axios.get()
    let [memberName, setMemberName] = useState('');
    let [memberNickname, setMemberNickname] = useState('');
    let [memberEmail, setMemberEmail] = useState('');
    let [memberPhone, setmemberPhone] = useState('');
    let [memberBirth, setMemberBirth] = useState('');
    let [memberGender, setMemberGender] = useState('');
    let [memberInterest, setMemberInterest] = useState('');

    useEffect(() => {
        authApi.get(`members/${memberId}`)
            .then((response) => {
                setMemberName(response.data.name);
                setMemberNickname(response.data.nickname);
                setMemberEmail(response.data.email);
                setmemberPhone(response.data.phone)
                setMemberBirth(response.data.birth);
                setMemberGender(response.data.gender);
                setMemberInterest(response.data.interests);
                handleCity(response.data.region.province);
                setTown(response.data.region.city);
                setEmail_check(response.data.isEmailOptIn)
                if (response.data.isEmailOptIn) {
                    setEmail_check_css("email_check_true.png")
                }

                const category = response.data.interests
                let tempvalue = [...categories]
                category_list.map((item) => {
                    if (category.includes(item.name)) {
                        if (tempvalue.includes(item.id)) {

                        } else {
                            tempvalue.push(parseInt(item.id)) // 진짜 값
                            setCategories(tempvalue)

                            tempcss[item.id - 1] = styles.category_display_checked //css
                            setCategory_css(tempcss)
                        }


                    }
                })
                if (response.data.emailOptIn) {
                    setEmail_check_css('email_check_true.png');
                    setEmail_check(true)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [category_list])


    //수정 api
    const handleReivce = () => {

        authApi.patch(`members/${memberId}`, {
            "nickname": memberNickname,
            "phone": memberPhone,
            "province": city,
            "city": town,
            "emailOptIn": email_check,
            "categories": categories
        })
            .then((response) => {
                window.location.href = `${process.env.REACT_APP_BASE_URL}MyPage`;
            })
    }

    return (
        <div>
            <div className={styles.main_container}>
                <div className={styles.logos}>
                    <img src={process.env.PUBLIC_URL + '/img/logo.svg'} />
                </div>
                <div className={styles.description}>
                    <p>프로필 수정</p>
                </div>
                <div className={styles.profile}>
                    <Avatar
                        size={133}
                        name={memberNickname}
                        variant="beam"
                        colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                    />
                </div>
                <div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            <label htmlFor='name'>이름</label>
                        </div>
                        <div>
                            <input type='text' id='name' value={memberName} className={`${styles.inputs_readonly} ${styles.inputs} ${styles.inputs_one}`} readOnly />
                        </div>
                    </div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            <label htmlFor='email'>이메일</label>
                        </div>
                        <div>
                            <input type='text' id='email' value={memberEmail} className={`${styles.inputs_readonly} ${styles.inputs} ${styles.inputs_one}`} readOnly />
                        </div>
                    </div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            <label htmlFor="nick">닉네임</label> <img src='./img/info-circle.svg' className={styles.info_circle} /><p className={styles.info_nick}> 2~10글자, 한글/영어/숫자만 입력가능</p>
                        </div>
                        <div>
                            <input type="text" id="nick" className={`${styles.inputs} ${styles.inputs_one}`} minLength='2' maxLength='10' onChange={(e) => handleNick(e.target.value)} value={memberNickname} />
                            <p className={styles.validated_message}>{message_nick}</p>
                        </div>

                    </div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            <label htmlFor="tel">연락처</label>
                        </div>
                        <div>
                            <input type="text" id="tel" className={`${styles.inputs_readonly} ${styles.inputs} ${styles.inputs_one}`} maxLength='13' value={memberPhone} readOnly />
                        </div>
                    </div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            <label htmlFor="birth">생년월일</label>
                        </div>
                        <div>
                            <input type='text' value={memberBirth} className={`${styles.inputs_readonly} ${styles.inputs} ${styles.inputs_one}`} readOnly />
                        </div>
                    </div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            성별
                        </div>
                        <div className={styles.selects}>
                            <input type='text' value={memberGender} className={`${styles.inputs_readonly} ${styles.inputs} ${styles.inputs_one}`} readOnly />
                        </div>
                    </div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            거주지역
                        </div>
                        <div>
                            <select id="area-city" className={`${styles.inputs} ${styles.inputs_two} ${styles.inputs_margin}`} value={city} onChange={(e) => handleCity(e.target.value)}>
                                {citys.map((item_city) => {
                                    return (
                                        <option value={item_city} key={item_city}>{item_city}</option>
                                    );
                                })}

                            </select>
                            <select id="area-town" className={`${styles.inputs} ${styles.inputs_two}`} value={town} onChange={(e) => setTown(e.target.value)}>
                                {towns.map((item_town) => {
                                    return (
                                        <option value={item_town} key={item_town}>{item_town}</option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={styles.floor}>
                        <div className={styles.labels}>
                            관심분야
                        </div>
                        <div className={styles.selects}>
                            {category_list.map((data, index) => {
                                return (
                                    <><input type='checkbox' name='category' id={data.id} className={styles.category_input} value={data.id} key={data.id} checked={data.isChecked}
                                        onClick={(e) => handelCategory(e.target.value, index)} />
                                        <label className={`${styles.category_display} ${category_css[index]}`} htmlFor={data.id}>{data.name}</label ></>
                                );
                            })}
                            <p className={styles.validated_message}>{message_category}</p>
                        </div>
                    </div>
                    <div className={styles.floor}>
                        <div className={styles.email_check_container}>
                            <img className={styles.email_check_button}
                                src={process.env.PUBLIC_URL + `/img/${email_check_css}`}
                                onClick={() => handleEmail_check()}
                            />
                            이메일 수신동의
                        </div>
                        <div className={styles.email_check_info_container}>
                            <img className={styles.email_info_circle}
                                src={process.env.PUBLIC_URL + `/img/info-circle.svg`}
                            />
                            스터디 관련 이메일이 발신됩니다.
                        </div>




                    </div>
                    <div className={styles.floor}>
                        <div className={styles.button_container}>
                            <input type="submit" className={styles.buttons} value="정보수정"
                                onClick={() => handleReivce()} />
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}
