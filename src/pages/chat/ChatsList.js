import React from "react"
import ChatPreview from "./ChatPreview"
import { NavLink } from 'react-router-dom'
import s from './ChatList.module.css'
import { useDispatch, useSelector } from "react-redux"
import { selectChats } from "../../reducers/chatReducer"
import { ACTIONS as t } from "../../constants/action-types"


function ChatsList() {
  const chats = useSelector(selectChats)
  const dispatch = useDispatch()

  const addChat = () => {
    dispatch({ type: t.CREATE_CONVERSATION, participantId: '604cf51a6341ff5448f6abe1' })
  }

  return (
    <div className={s.chatListWrapper}>
      {
        Object.keys(chats)?.map(chatId => (
          <li key={chatId}>
            <NavLink className={s.navLinkWrapper} to={{
              pathname: '/opened-chat',
              state   : { chatId: chatId },
            }}>
              <ChatPreview id={chatId}/>
            </NavLink>
          </li>
        ))
      }
      <button onClick={addChat}>Create Chat</button>
    </div>
  )
}

export default ChatsList