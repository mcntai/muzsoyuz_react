import React from "react"
import "antd/dist/antd.css"
import chat from "../../assets/img/chat.svg"
import { Badge } from "antd"
import { useSelector } from "react-redux"
import { selectChats } from "../../redux/reducers/chatReducer"
import { selectProfile } from "../../redux/slice/user"
import { NavLink } from "react-router-dom"
import s from './Header.module.css'

const UnreadMessageCount = () => {
  const myId = useSelector(selectProfile("_id"))
  const chats = useSelector(selectChats)
  const myUnreadMessages = Object.keys(chats)?.reduce((acc, cur) => {
    return chats[cur]?.messages.filter(msg => msg.senderId !== myId && !msg.viewed)
  }, 0)

  return (
    <>
      <NavLink to="/chat">
        <Badge
          count={myUnreadMessages?.length}
          style={{
            backgroundColor: "#6384EB",
            color          : "#FFFFFF",
            fontFamily     : "Montserrat",
            fontSize       : "15px",
            fontHeight     : "18px",
            fontWeight     : "500"
          }}
        >
          <img src={chat} alt="chat" className={s.chatImg}/>
        </Badge>
      </NavLink>
    </>
  )
}

export default UnreadMessageCount