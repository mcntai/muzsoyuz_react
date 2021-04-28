import React, { useEffect, useState } from 'react'
import ChatPreview from './ChatPreview'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectChats } from '../../reducers/chatReducer'
import { ROUTES as r } from '../../constants/routes'
import s from './ChatList.module.css'


function ChatsList() {
  const chats = useSelector(selectChats)

  useEffect(() => {

  }, [])

  return (
    <div className={s.chatListWrapper}>
      {
        Object.keys(chats)?.map(chatId => (
          <li key={chatId}>
            <NavLink className={s.navLinkWrapper} to={{
              pathname: r.OPENED_CHAT,
              state   : { chatId: chatId },
            }}>
              <ChatPreview id={chatId}/>
            </NavLink>
          </li>
        ))
      }
    </div>
  )
}

export default ChatsList