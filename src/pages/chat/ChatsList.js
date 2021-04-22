import React, { useState } from "react"
import ChatPreview from "./ChatPreview"
import { NavLink } from 'react-router-dom'
import s from './ChatList.module.css'
import { useSelector } from "react-redux"
import { selectChats } from "../../reducers/chatReducer"


function ChatsList() {
  const chats = useSelector(selectChats)

  const addChat = () => {
    // createConversation()
  }

  return (
    <div className={s.chatListWrapper}>
      {
        Object.keys(chats)?.map(chatId => (
          <li key={chatId}>
            <NavLink className={s.navLinkWrapper} to={{
              pathname: '/opened-chat',
              state   : { data: chatId },
            }}>
              <ChatPreview chatId={chatId}/>
            </NavLink>
          </li>
        ))
      }
      <button onClick={addChat}>Create Chat</button>
    </div>
  )
}

export default ChatsList