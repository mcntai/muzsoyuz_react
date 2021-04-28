import React, { useEffect, useRef } from "react"
import "antd/dist/antd.css"
import AvatarOnly from "./Avatar"
import PersonName from "./PersonName"
import ActivityStatus from "./ActivityStatus"
import EnterTextField from "./EnterTextField"
import Messages from "./Messages"
import { Row, Col } from "antd"
import { goBack } from "../../actions/user"
import { useDispatch, useSelector } from 'react-redux'
import s from './OpenedChat.module.css'
import { useLocation } from "react-router-dom"
import { selectChat, selectUser } from "../../reducers/chatReducer"
import { createConversation, goToAllChats } from '../../actions/chat'


const OpenedChat = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const participantId = location.state?.participantId
  const chatId = location.state?.chatId

  const myRef = useRef(null)
  let id = useRef()
  const existingChat = useSelector(selectUser(participantId))
  const chat = useSelector(selectChat(chatId))
  id.current = existingChat ? existingChat : chatId

  const scrollToTheBottom = () => {
    myRef.current.scrollIntoView(false)
  }

  useEffect(() => {
    scrollToTheBottom()
  }, [chat])

  useEffect(() => {
    if (participantId && !existingChat) {
      dispatch(createConversation(participantId))
    }
  }, [])

  const redirect = () => {
    dispatch(goToAllChats())
  }

  return (
    <div className={s.openedChatWrapper}>
      {!location.state && redirect()}
      <Row
        align="middle"
        gutter={20}
        style={{
          position     : "fixed",
          top          : "0",
          background   : "#FFFFFF",
          paddingTop   : "15px",
          paddingBottom: "10px",
          width        : "100%"
        }}
      >
        <Col span={2}>
          <span className={s.backBtn} onClick={() => dispatch(goBack())}/>
        </Col>
        <Col span={6}>
          <AvatarOnly id={id.current}/>
        </Col>
        <Col span={14}>
          <div className={s.nameAndStatusWrapper}>
            <PersonName id={id.current} fontSize={"16px"}/>
            <ActivityStatus id={id.current}/>
          </div>
        </Col>
      </Row>
      <Messages id={id.current}/>
      <EnterTextField id={id.current}/>
      <div ref={myRef} style={{ marginTop: '100px' }}/>
    </div>
  )
}

export default OpenedChat
