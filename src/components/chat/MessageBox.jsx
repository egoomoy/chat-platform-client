import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useChatStore from "../../store/chatStore";
import { Client } from "@stomp/stompjs";
import MessageSend from "./MessageSend";
import Loading from "../common/Loading";
import TelegramIcon from "@mui/icons-material/Telegram";
import MessageList from "./MessageList";

const brokerURL = "ws://localhost:18080/ws/websocket"; // ? websocket
const subURL = "/sub/chat/room/";
const pubURL = "/pub/chat/message";

const MessageBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MessageBoxHeader = styled.div`
  display: flex;
  align-items: center;
  color: black;
  margin-right: auto;
  font-size: var(--sub-title-font-size);
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background-color: #fefefe;
  padding: 0.9rem 0 0.9rem 0.8rem;
  width: 98%;
  border-radius: 8px;
`;

const MessageBoxMain = styled.div`
  background: #ffffff;
  border-top-left-radius: 5px;
  height: 40vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.9rem;
    color: #629eff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c7c7c7;
    border-radius: 7px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
`;

const JoinButton = styled.button`
  color: #027df8;
  font-size: 1rem;
  padding: 0.1rem;
  padding-bottom: 0.7rem;
  background: none;
  outline: none;
  border: none;
  background: #ffffff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  transition: all 0.4s background ease-in;
  &:hover {
    background: #eeeeee;
  }
  cursor: pointer;
  font-weight: 900;
`;

const client = new Client({
  brokerURL,
  onConnect: () => {
    console.log("is It connected??  : " + client.connected);
  },
  debug: function (str) {
    // console.log(str);
  },
  onDisconnect: () => {
    console.log("disconnect =)");
  },
});

function MessageBox() {
  const { connectedRoomUUID, setConnectedRoomUUID } = useChatStore();
  const [prvRoomUUID, setPrvRoomUUID] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef();

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const onMessageConcat = useCallback((rcvMessage) => {
    const newMessage = {
      id: rcvMessage.id,
      message: rcvMessage.message,
      senderId: rcvMessage.senderId,
    };
    setMessageList((messageList) => messageList.concat(newMessage));
  }, []);

  const changeMessageList = (messageList) => {
    setMessageList(messageList);
    return messageList;
  };

  useEffect(() => {
    scrollToBottom();
    return () => {};
  }, [messageList]);

  const onClickJoinButton = () => {
    if (connectedRoomUUID === "") {
      alert("입장할 채팅방을 선택해주세요.");
    } else {
      setIsJoined(true);
    }
  };

  const subscribe = () => {
    if (client && client.connected && connectedRoomUUID !== "") {
      // console.log("function#-subscribe:" + connectedRoomUUID);
      client.subscribe(
        subURL + connectedRoomUUID,
        (data) => {
          // const newMessage = JSON.parse(data.body).message;
          console.log(JSON.parse(data.body));
          onMessageConcat(JSON.parse(data.body));
        },
        { id: connectedRoomUUID }
      );
    }
  };

  const unsubscribe = () => {
    if (client && client.connected && prvRoomUUID !== "") {
      // console.log("function#-unsubscribe:" + prvRoomUUID);
      client.unsubscribe(prvRoomUUID);
    }
  };

  const publishHandler = (message) => {
    if (client != null) {
      if (!client.connected) return;
      client.publish({
        destination: pubURL,
        body: JSON.stringify({
          roomUuid: connectedRoomUUID,
          type: "MESSAGE", // 타입 정의해서 어딘가에 두고 사용할 것?
          senderId: "aet",
          message: message,
          senderNm: "구윤모",
        }),
      });
    }
  };

  useEffect(() => {
    setPrvRoomUUID(connectedRoomUUID);
    setIsJoined(false);
    if (client.connected) {
      unsubscribe();
      subscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedRoomUUID]);

  useEffect(() => {
    client.activate();
    return () => {
      setConnectedRoomUUID("");
      client.deactivate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MessageBoxWrapper>
        <MessageBoxHeader>HelpBox</MessageBoxHeader>
        <MessageBoxMain ref={scrollRef}>
          {connectedRoomUUID !== "" ? (
            <MessageList
              uuid={connectedRoomUUID}
              changeMessageList={changeMessageList}
              messageList={messageList}
            />
          ) : (
            <Loading />
          )}
        </MessageBoxMain>
        {isJoined === true ? (
          <MessageSend sendMessage={publishHandler} />
        ) : (
          <JoinButton onClick={onClickJoinButton}>
            시작하기 <TelegramIcon />
          </JoinButton>
        )}
      </MessageBoxWrapper>
    </>
  );
}

export default MessageBox;
