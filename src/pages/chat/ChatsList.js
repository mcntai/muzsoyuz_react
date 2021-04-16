import React, { useEffect, useState, useRef } from "react"
import ChatPreview from "./ChatPreview"
import { io } from "socket.io-client"
import { NavLink } from 'react-router-dom'
import s from './ChatList.module.css'
import useChat from './useChat'


function ChatsList() {
  const { socketConnect, conversations } = useChat()

  useEffect(() => {
    socketConnect()
  }, [])


  return (
    <div className={s.chatListWrapper}>
      {console.log(conversations)}
      {
        conversations?.map(chat => (
          <li key={chat._id}>
            <NavLink className={s.navLinkWrapper} to={{
              pathname: '/opened-chat',
              state: { data: chat },
            }}>
              <ChatPreview chat={chat}/>
            </NavLink>
          </li>
        ))
      }
    </div>
  )
}

export default ChatsList