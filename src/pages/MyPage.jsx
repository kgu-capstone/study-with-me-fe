import React, { Component, useEffect, useState } from 'react';
import '../css/MyPage.css';
import { authApi } from '../services/api';
import Avatar from "boring-avatars";
import Button from 'react-bootstrap/Button';
import { Link, NavLink } from 'react-router-dom';
import StudyReview from '../components/Modal/StudyReview';
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

    const [isApiUpdate, setIsApiUpdate] = useState(0);
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
    }, [isApiUpdate])



    //화살표 방향
    const [arrow_img, setArrow_img] = useState(['down_arrow', 'down_arrow', 'down_arrow', 'down_arrow']);
    const [astudy_isopen_css, setastudy_isopen_css] = useState(['astudy_element_container_none', 'astudy_element_container_none', 'astudy_element_container_none', 'astudy_element_container_none']);

    //화살표 바꾸고 열고 닫는 함수
    const openAndClose = (number) => {
        let temp = [...arrow_img]
        let tempcss = [...astudy_isopen_css]

        if (temp[number] == 'down_arrow') { //현재 닫혀있는 상태라면
            //화살표 바꾸기
            temp[number] = 'up_arrow'
            setArrow_img(temp);

            //정보 보이게하기
            tempcss[number] = 'astudy_element_container'
            setastudy_isopen_css(tempcss)


        } else {
            //화살표 바꾸기
            temp[number] = 'down_arrow'
            setArrow_img(temp);

            //정보 안보이게하기
            tempcss[number] = 'astudy_element_container_none'
            setastudy_isopen_css(tempcss)
        }
    }
    // api 함수

    // 참여중인 스터디
    const [participateList, setParticipateList] = useState([]);

    const open_active_study = () => {
        openAndClose(0)

        if (arrow_img[0] == 'down_arrow') { //현재 닫혀있는 상태라면

            authApi.get(`members/${memberId}/studies/participate`)
                .then((response) => {
                    setParticipateList(response.data.result);
                })
                .catch((e) => {
                    console.log(e);
                })
        } else {
        }

    }

    // 졸업한 스터디
    const [closedList, setClosedList] = useState([]);

    const open_closed_study = () => {
        openAndClose(1)

        if (arrow_img[1] == 'down_arrow') { //현재 닫혀있는 상태라면
            authApi.get(`members/${memberId}/studies/graduated`)
                .then((response) => {
                    setClosedList(response.data.result);
                })
                .catch((e) => {
                    console.log(e);
                })


        } else {
        }
    }


    const [applyStudy, setApplyStudy] = useState([]);

    const open_apply_study = () => {
        openAndClose(2)
        if (arrow_img[2] == 'down_arrow') { //현재 닫혀있는 상태라면

            authApi.get(`members/${memberId}/studies/apply`)
                .then((response) => {
                    setApplyStudy(response.data.result);
                })
                .catch((e) => {
                    console.log(e);
                })


        } else {
        }
    }

    const [favoriteStudy, setFavoriteStudy] = useState([]);

    const open_favorite_study = () => {
        openAndClose(3)
        if (arrow_img[3] == 'down_arrow') { //현재 닫혀있는 상태라면

            authApi.get(`members/${memberId}/studies/favorite`)
                .then((response) => {
                    setFavoriteStudy(response.data.result);
                })
                .catch((e) => {
                    console.log(e);
                })


        } else {
        }
    }


    // 리뷰쓰기
    const [review_modal_on, setReview_modal_on] = useState(false);



    return (

        <>
            <div className='mypage_container'>
                <div>
                    <label for='id' className='nicknameProfile'>{memberNickname}님 프로필</label>
                </div>
                <div className='biprof'>

                    <div className='biprof_left'>
                        <div className='avatar_profile'>
                            <Avatar
                                size={158}
                                name={memberNickname}
                                variant="beam"
                                colors={["#FF3D1F", "#FFEA52", "#FF5037", "#1FFF98", "#4D2BFF"]}
                            />
                        </div>
                    </div>

                    <div className='biprof_right'>
                        <div>
                            <div>
                                <label for='id' className='label'>닉네임</label>
                            </div>
                            <div>
                                <label for='id' className='label'>이메일</label>
                            </div>
                            <div>
                                <label for='id' className='label'>생년월일</label>
                            </div>
                            <div>
                                <label for='id' className='label'>성별</label>
                            </div>
                            <div>
                                <label for='id' className='label'>지역</label>
                            </div>
                            <div>
                                <label for='id' className='label'>관심사</label>
                            </div>
                        </div>
                        <div className='mypage_labele'>
                            <div>
                                <label for='id' className='labele'>{memberNickname}</label>
                            </div>
                            <div>
                                <label for='id' className='labele'>{memberEmail}</label>
                            </div>
                            <div>
                                <label for='id' className='labele'>{memberBirth}</label>
                            </div>
                            <div>
                                <label for='id' className='labele'>{memberGender}</label>
                            </div>
                            <div>
                                <label for='id' className='labele'>{memberRegion.province} {memberRegion.city}</label>
                            </div>
                            <div>
                                <label for='id' className='labele'>{
                                    memberInterest && memberInterest.map((item, index) => {
                                        return (
                                            <>  {
                                                index + 1 === memberInterest.length
                                                    ?
                                                    <>{item}</>
                                                    :
                                                    <>{item},&nbsp;&nbsp;</>
                                            }

                                            </>
                                        )
                                    })}</label>
                            </div>

                        </div>
                    </div>

                </div>
                <Link to="/mypage/edit" state={{ memberId: memberId }} className='mypage_revice_navlink'>
                    <div className='mypage_brush'>
                        <img src={process.env.PUBLIC_URL + '/img/brush-2.png'} />
                        &nbsp;&nbsp;프로필 수정
                    </div>
                </Link>
                <div className='mypage_study_container'>

                    <div className="mypage_square">
                        <div className='astudy' onClick={() => open_active_study()}>활동중인 스터디 <img className='astudyarrow' src={`${process.env.PUBLIC_URL}/img/${arrow_img[0]}.png`} /></div>
                        <div className={astudy_isopen_css[0]}>
                            {
                                participateList && participateList.map((item) => {
                                    return (

                                        <div className='astudy_element'>
                                            <img width={50} height={50} src={process.env.PUBLIC_URL + `/img/studyprofiles/${item.thumbnail}`} />
                                            <NavLink to={`/study/work/notices?name=${item.name}`} state={{ studyId: item.id }} className='astudy_navlink'>
                                                <p className='astudy_name'>{item.name}</p>
                                            </NavLink>
                                            <p className='astudy_category'>{item.category}</p>
                                        </div>

                                    )
                                })
                            }

                        </div>
                    </div>

                    <div className="mypage_square">
                        <div className='astudy' onClick={() => open_closed_study()}>졸업한 스터디 <img className='astudyarrow' src={`${process.env.PUBLIC_URL}/img/${arrow_img[1]}.png`} /></div>
                        <div className={astudy_isopen_css[1]}>
                            {
                                closedList && closedList.map((item) => {
                                    return (
                                        <>
                                            <div className='astudy_element'>
                                                <img width={50} height={50} src={process.env.PUBLIC_URL + `/img/studyprofiles/${item.thumbnail}`} />
                                                <NavLink to={`/study/work/notices?name=${item.name}`} state={{ studyId: item.id }} className='astudy_navlink'>
                                                    <p className='astudy_name'>{item.name}</p>
                                                </NavLink>
                                                {item.review == null ?
                                                    <p className='astudy_review' onClick={() => setReview_modal_on(true)}>리뷰쓰기</p>
                                                    :
                                                    <></>}

                                                <div>
                                                    {review_modal_on && <StudyReview closeModal={setReview_modal_on} studyId={item.id} studyName={item.name} studyThumbnail={item.thumbnail}></StudyReview>}
                                                </div>
                                                <p className='astudy_category'>{item.category}</p>


                                            </div>

                                        </>

                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="mypage_square">
                        <div className='astudy' onClick={() => open_apply_study()}>신청한 스터디 <img className='astudyarrow' src={`${process.env.PUBLIC_URL}/img/${arrow_img[2]}.png`} /></div>
                        <div className={astudy_isopen_css[2]}>
                            {applyStudy && applyStudy.map((item) => {
                                return (

                                    <div className='astudy_element'>
                                        <img width={50} height={50} src={process.env.PUBLIC_URL + `/img/studyprofiles/${item.thumbnail}`} />
                                        <NavLink to={`/study?name=${item.name}`} state={{ studyId: item.id }} className='astudy_navlink'>
                                            <p className='astudy_name'>{item.name}</p>
                                        </NavLink>
                                        <p className='astudy_category'>{item.category}</p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                    <div className="mypage_square">
                        <div className='astudy' onClick={() => open_favorite_study()}>찜한 스터디 <img className='astudyarrow' src={`${process.env.PUBLIC_URL}/img/${arrow_img[3]}.png`} /></div>
                        <div className={astudy_isopen_css[3]}>
                            {favoriteStudy && favoriteStudy.map((item) => {
                                return (
                                    <div className='astudy_element'>
                                        <img width={50} height={50} src={process.env.PUBLIC_URL + `/img/studyprofiles/${item.thumbnail}`} />
                                        <NavLink to={`/study?name=${item.name}`} state={{ studyId: item.id }} className='astudy_navlink'>
                                            <p className='astudy_name'>{item.name}</p>
                                        </NavLink>
                                        <p className='astudy_category'>{item.category}</p>
                                    </div>

                                )
                            })}
                        </div>
                    </div>



                    <div>
                        <Link to="/study/create">
                            <div className='squarebutton_container'>
                                <button class='squarebutton'>스터디 만들기</button>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </>


    )

}



export default MyPage;