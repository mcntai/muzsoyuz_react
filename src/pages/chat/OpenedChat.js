import React from "react"
import "antd/dist/antd.css"
import AvatarOnly from "./Avatar"
import PersonName from "./PersonName"
import ActivityStatus from "./ActivityStatus"
import EnterTextField from "./EnterTextField"
import Messages from "./Messages"
import { Row, Col } from "antd"
import { goBack } from "../../actions/user"
import { useDispatch } from 'react-redux'
import s from './OpenedChat.module.css'
import { useLocation } from "react-router-dom"


const OpenedChat = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const chatId = location.state.data

  return (
    <div className={s.openedChatWrapper}>
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
          <AvatarOnly chatId={chatId}/>
        </Col>
        <Col span={14}>
          <div className={s.nameAndStatusWrapper}>
            <PersonName chatId={chatId} fontSize={"16px"}/>
            <ActivityStatus chatId={chatId}/>
          </div>
        </Col>
      </Row>
      <Messages chatId={chatId}/>
      <EnterTextField chatId={chatId}/>
    </div>
  )
}

export default OpenedChat
