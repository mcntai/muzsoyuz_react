import React, { useEffect, useRef } from "react"
import "antd/dist/antd.css"
import AvatarOnly from "./Avatar"
import PersonName from "../chatsList/PersonName"
import ActivityStatus from "./ActivityStatus"
import EnterTextField from "./EnterTextField"
import Messages from "./Messages"
import { Row, Col } from "antd"
import { goBack } from "../../../redux/actions/user"
import { useDispatch, useSelector } from 'react-redux'
import s from './OpenedChat.module.css'
import { useLocation } from "react-router-dom"
import { selectChat, selectUser } from "../../../redux/reducers/chatReducer"
import { createConversation, goToAllChats } from '../../../redux/actions/chat'


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

  useEffect(() => {
    if (participantId && !existingChat) {
      dispatch(createConversation(participantId))
    }
  }, [])

  const scrollToTheBottom = () => {
    myRef.current.scrollIntoView(false)
  }

  useEffect(() => {
    scrollToTheBottom()
  }, [chat])

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
        <Col xs={2} sm={2} md={2} lg={1} xl={1} xxl={1}>
          <span className={s.backBtn} onClick={() => dispatch(goBack())}/>
        </Col>
        <Col xs={5} sm={4} md={3} lg={2} xl={2} xxl={2}>
          <AvatarOnly id={id.current}/>
        </Col>
        <Col xs={17} sm={18} md={19} lg={21} xl={21} xxl={21}>
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
