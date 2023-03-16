import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
          <nav>
        <img src="./capstone-logo.png"/>
            <div>
                <input class="serarch-bar"/>
                <i class="fa-solid fa-magnifying-glass serarch-icon-move"></i> 
            </div>
           
            <div>
                <a href="singUp.html" class="nav-detail">로그인</a>
                <span>|</span>
                <a href="signIn2.html" class="nav-detail">회원가입</a>
            </div>
    
    </nav>

    {/* <!--main 광고 들어가는 부분입니다. 부트스트랩 이용할 예정--> */}
    <main>
        광고 들어가는 부분 
    </main>

    {/* <!--분야 태그 라인--> */}
    <div class="areacheck">
        
        <a href="#"><button class="hash-tag">어학</button></a>
        <a href="#"><button class="hash-tag">면접</button></a>
        <a href="#"><button class="hash-tag">코딩</button></a>
        <a href="#"><button class="hash-tag">인적성 & NCS</button></a>
        <a href="#"><button class="hash-tag">자격증</button></a>
        <a href="#"><button class="hash-tag">기타</button></a>
    </div>

    {/* <!--카드 들어가는 부분--> */}
    <div class="card-area">

        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>


        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>


        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>

        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>

    </div>
    <div class="card-area">

        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>


        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>


        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>

        <div class="card">
            {/* <img src="./img/profie.jpeg" class="img-setting" alt="..."> */}
            <div class="card-body">
              <h5 class="card-title">스터디 이름</h5>
              <p class="card-text">스터디 소개 내용</p>
            </div>
        </div>
        
    </div>
    
    

    <footer>
        footer입니다.
    </footer>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.오오오오오오된다된다
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
