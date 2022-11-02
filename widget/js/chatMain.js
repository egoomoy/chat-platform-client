var sock;
var stompClient;


var chatbox__main__html = `
<input type="hidden" id="roomUuid" name="roomUuid" value="">     
<input type="hidden" id="roomId" name="roomId" value="">     
<div class="chatbox__main">
    <div class="chatbox__header">
        <div class="chatbot__icon">
            <svg align="center" width="20" height="20" viewBox="0 0 20 17" fill="none"
                xmlns="http://www.w3.org/2000/svg" foundation="[object Object]" defaultopacity="1"
                hoveredopacity="0.5" margintop="0" marginright="0" marginbottom="0" marginleft="0"
                withtheme="true">
                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.17255 16.4226C8.84711 16.748 8.31947 16.748 7.99404 16.4226L2.1607 10.5893C1.83527 10.2638 1.83527 9.73619 2.1607 9.41075L7.99404 3.57742C8.31947 3.25198 8.84711 3.25198 9.17255 3.57742C9.49799 3.90285 9.49799 4.43049 9.17255 4.75593L3.92847 10L9.17255 15.2441C9.49799 15.5695 9.49799 16.0972 9.17255 16.4226Z">
                </path>
            </svg>
        </div>
        <p class="chatbox__title">현대오토에버</p>
        <div class="close__icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                foundation="[object Object]" class="InnerIconstyled__Icon-ch-front__sc-197h5bb-0 jeqCBZ"
                defaultopacity="1" hoveredopacity="1" margintop="0" marginright="0" marginbottom="0"
                marginleft="0" withtheme="true">
                <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
                    d="M16.4818 4.69668L15.3033 3.51817L10 8.82147L4.69671 3.51817L3.5182 4.69668L8.8215 9.99998L3.51819 15.3033L4.6967 16.4818L10 11.1785L15.3033 16.4818L16.4818 15.3033L11.1785 9.99998L16.4818 4.69668Z">
                </path>
            </svg>
        </div>
    </div>
    <div class="chatbox__messages">
        <div>
        </div>
    </div>
    <div class="chatbox__footer">
        <div class="chatbox__send">
            <input class="chatbox__send__input" placeholder="메시지를 입력하세요."></input>
        </div>
    </div>
</div>
`
var help__main__html = `
<div id="chatbox">
    <div class="help__main">
            <div class="help__header">
                <div class="help__title">현대오토에버</div>
                <div class="close__icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                        foundation="[object Object]" class="InnerIconstyled__Icon-ch-front__sc-197h5bb-0 jeqCBZ"
                        defaultopacity="1" hoveredopacity="1" margintop="0" marginright="0" marginbottom="0"
                        marginleft="0" withtheme="true">
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
                            d="M16.4818 4.69668L15.3033 3.51817L10 8.82147L4.69671 3.51817L3.5182 4.69668L8.8215 9.99998L3.51819 15.3033L4.6967 16.4818L10 11.1785L15.3033 16.4818L16.4818 15.3033L11.1785 9.99998L16.4818 4.69668Z">
                        </path>
                    </svg>
                </div>
            </div>
            <div class="help_hello">
                안녕하세요. 오토에버 이캠퍼스 담당자입니다.<br>
                궁굼한 점은 언제든지 문의해주세요.
            </div>
            <div class="help_sqbox">
                <div class="help_sub_title">공지사항</div>
                <b>구윤모 (10/2)</b>
                <div>현대오토에버 전사교육이 예정되어있습니다 <br> 학습 예정 과정을 참고하시어 수강 기간 내에 수료.. </div>
                <br />
                <b>양진아 (10/1)</b>
                <div>금일 17시 부터 현대오토에버 스트리밍서버 <br> 패치가 예정되어있습니다. 패치 중 진도율 업데이... </div>
            </div>
            <div class="chat__start">
                <div>새 문의하기</div>
            </div>
    </div>
    <input type="hidden" id="roomUuid" name="roomUuid" value="">     
    <input type="hidden" id="roomId" name="roomId" value="">     
    <div class="chatbox__main">
        <div class="chatbox__header">
            <div class="chatbot__icon">
                <svg align="center" width="20" height="20" viewBox="0 0 20 17" fill="none"
                    xmlns="http://www.w3.org/2000/svg" foundation="[object Object]" defaultopacity="1"
                    hoveredopacity="0.5" margintop="0" marginright="0" marginbottom="0" marginleft="0"
                    withtheme="true">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
                        d="M9.17255 16.4226C8.84711 16.748 8.31947 16.748 7.99404 16.4226L2.1607 10.5893C1.83527 10.2638 1.83527 9.73619 2.1607 9.41075L7.99404 3.57742C8.31947 3.25198 8.84711 3.25198 9.17255 3.57742C9.49799 3.90285 9.49799 4.43049 9.17255 4.75593L3.92847 10L9.17255 15.2441C9.49799 15.5695 9.49799 16.0972 9.17255 16.4226Z">
                    </path>
                </svg>
            </div>
            <p class="chatbox__title">현대오토에버</p>
            <div class="close__icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    foundation="[object Object]" class="InnerIconstyled__Icon-ch-front__sc-197h5bb-0 jeqCBZ"
                    defaultopacity="1" hoveredopacity="1" margintop="0" marginright="0" marginbottom="0"
                    marginleft="0" withtheme="true">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.4818 4.69668L15.3033 3.51817L10 8.82147L4.69671 3.51817L3.5182 4.69668L8.8215 9.99998L3.51819 15.3033L4.6967 16.4818L10 11.1785L15.3033 16.4818L16.4818 15.3033L11.1785 9.99998L16.4818 4.69668Z">
                    </path>
                </svg>
            </div>
        </div>
        <div class="chatbox__messages">
            <div>
            </div>
        </div>
        <div class="chatbox__footer">
            <div class="chatbox__send">
                <input class="chatbox__send__input" placeholder="메시지를 입력하세요."></input>
            </div>
        </div>
    </div>
    
    <div class="help__button">
        <button>Branch-1</button>
    </div>
</div>
`

document.onreadystatechange = function (e) {
  if (document.readyState === "complete") {
    console.log("document.onreadystatechange function");
    loadScript("./lib/jquery.min.js", window.jQuery, loadChatWindow);
    loadScript("./lib/sockjs.min.js", window.SockJS, loadSockJS);
    loadScript("./lib/stomp.min.js", window.Stomp, loadStomp);
  }
};

window.onload = function (e) {
  console.log("hi, inside window.onload function");
};

// 스크립트 로드
const loadScript = function (scriptNm, scriptObjCheck, afterCallback) {
  var isExist = false;
  if (scriptObjCheck) {
    console.log(`${scriptNm} is already loaded`);
    isExist = true;
    afterCallback();
  } else {
    var script_element = document.createElement("script");
    script_element.type = "text/javascript";
    script_element.src = scriptNm;
    document.getElementsByTagName("head")[0].appendChild(script_element);
    script_element.onload = function () {
      afterCallback();
      console.log(`${script_element.src} is loaded`);
    };
  }
  return isExist;
};

var loadStomp = function () {
  console.log(`loadStomp is loaded`);
};

var loadSockJS = function () {
  console.log(`loadSockJS is loaded`);
};

var loadChatWindow = function () {
  console.log(`loadChatWindow is loaded`);

  $("body").append(
    help__main__html
  );



  const appendMessage = (bodyJson) => {
    if (bodyJson.type !== "MESSAGE") {
        var t = '<p class="messages__item messages__item__system">' + bodyJson.message + "</p>";
    } else {
        if (bodyJson.senderId == $("#inputAccntId").val()) {
        var t =
            '<p class="messages__item messages__item__visitor">' +
            bodyJson.message +
            "</p>";
        } else {
        var t =
            '<p class="messages__item messages__item__operator">' +
            bodyJson.message +
            "</p>";
        }
    }
    $(".chatbox__messages").append(t);
    $(".chatbox__send__input").val("");
    $(".chatbox__messages").scrollTop(1e10);
};

  const sendMessage = (text) => {
    var temproomID = $("#roomUuid").val();
    var senderId = $("#inputAccntId").val();
    var senderNm = $("#inputName").val();
    stompClient.send(
      "/chat/pub/message",
      {},
      JSON.stringify({
        roomId: $("#roomId").val(),
        roomUuid: temproomID,
        type: "MESSAGE", // Enum 타입 정의해서 어딘가에 두고 사용할 것
        message: text,
        senderId: senderId,
        senderNm: senderNm,
      })
    );
  }

  const createRoom = (roomNm) => {
    console.log($("#helperLegacyId").val());
    var roomUuid = "";
    var reqURL = "http://localhost:18080/chat/room/";
    var jsonDate = {
      roomNm: roomNm,
      legacyId: $("#helperLegacyId").val(),
    };
    $.ajax({
      url: reqURL,
      data: JSON.stringify(jsonDate),
      type: "POST",
      async: false,
      timeout: 5000,
      dataType: "json",
      contentType: "application/json",
      crossDomain: true,
      success: function (res) {
        roomUuid = res.body.roomUuid;
        roomId = res.body.id;
      },
      error: function (e) {
        console.log(e);
      },
    });

    $("#roomUuid").val(roomUuid);
    $("#roomId").val(roomId);
    return roomUuid;
  };

  var help__button = $(".help__button");
  var help__main = $(".help__main");

  help__button.on("click", function () {
    if(!help__button.hasClass("help__button__deactive")){
        help__button.addClass("help__button__deactive");
        help__main.addClass("help__active");
    }
  });


  var chat__start = $(".chat__start");

  chat__start.on("click", function (e) {
    var help__main = $(".help__active");
    if (help__main.hasClass("help__active")) {
        help__main.removeClass("help__active");
        setTimeout(()=>{
            var chatbox__main_temp = $(".chatbox__main");
            chatbox__main_temp.addClass("chatbox__active");
        },0)
    } 
   
    //1. 채팅 시작하기? > 회사 이름을 입력받을 지, 레거시에서 정보를 받을지
    //2. 기존에 있는 방을 조회해야하는지? 새로 생성해야하는지
    //2-1. 기존 방을 부른다면, 채팅 리스트를 읽어서 모두 append
    //2-2. 새로 생성하면, 아무래도 새로고침등의 이슈가 있긴한다.
    //2-3. 새로운 방을 생성하는 기준을 정립할것? 1. 당일에 채팅을 열면 불러오기?, 상담원 종료나 학습자가 종료 버튼(생성 해야함)을 누르면 새로 부르기?
    //3. 메뉴얼(챗봇을 가장한 사기..)를 호출하는 방식에 대해 검토해야함, 최소 8월 15일전까지는 개발된 모습을 봤으면 좋겠다.
    var roomUUID = createRoom($("#inputName").val());
    if (roomUUID !== "" && roomUUID !== undefined) {
      var senderId = $("#inputAccntId").val();
      var senderNm = $("#inputName").val();
      sock = new SockJS("http://localhost:18080/chat/ws");
      stompClient = Stomp.over(sock);
      stompClient.connect(
        {},
        function (frame) {
          stompClient.subscribe(
            "/chat/sub/room/" + roomUUID,
            function (message) {
              var bodyJson = JSON.parse(message.body);
              console.log(bodyJson);
              appendMessage(bodyJson);
            }
          );
          stompClient.send(
            "/chat/pub/message",
            {},
            JSON.stringify({
              roomId: $("#roomId").val(),
              roomUuid: roomUUID,
              type: "ENTER", // Enum 타입 정의해서 어딘가에 두고 사용할 것
              senderId: senderId,
              senderNm: senderNm,
              message: `${senderNm}님이 입장하셨습니다.`,
            })
          );
        },
        function (error) {
          alert("error " + error);
        }
      );
      e.preventDefault();
      var t = $("#inputName").val();
      $("#inputEmail").val();
    }

    $(".chatbox__send__input").keypress(function (e) {
    if (13 == (e.keyCode ? e.keyCode : e.which)) {
        var message = $(".chatbox__send__input").val();
        sendMessage(message);
    }
    });
  });
};