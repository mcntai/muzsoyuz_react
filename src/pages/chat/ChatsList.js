import React, { useEffect } from "react"
import ChatPreview from "./ChatPreview"
import { NavLink } from 'react-router-dom'
import s from './ChatList.module.css'
import useChat from './useChat'


function ChatsList() {
  const { conversations, createConversation } = useChat()

  const addChat = () => {
    createConversation()
  }

  return (
    <div className={s.chatListWrapper}>
      {
        conversations?.map(chat => (
          <li key={chat._id}>
            <NavLink className={s.navLinkWrapper} to={{
              pathname: '/opened-chat',
              state   : { data: chat },
            }}>
              <ChatPreview chat={chat}/>
            </NavLink>
          </li>
        ))
      }
      <button onClick={addChat}>Create Chat</button>
    </div>
  )
}

export default ChatsList