import React, { useEffect } from "react"
import ChatPreview from "./ChatPreview"
import { NavLink } from 'react-router-dom'
import s from './ChatList.module.css'


function ChatsList({conversationsMap, createConversation}) {

  const addChat = () => {
    createConversation()
  }

  return (
    <div className={s.chatListWrapper}>
      {
        Object.keys(conversationsMap)?.map(chatId => (
          <li key={chatId}>
            <NavLink className={s.navLinkWrapper} to={{
              pathname: '/opened-chat',
              state   : { data: chatId },
            }}>
              <ChatPreview chat={conversationsMap[chatId]}/>
            </NavLink>
          </li>
        ))
      }
      <button onClick={addChat}>Create Chat</button>
    </div>
  )
}

export default ChatsList