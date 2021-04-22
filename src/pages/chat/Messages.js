import React from 'react'
import s from './Messages.module.css'
import Message from './Message'
import { useSelector } from "react-redux"
import { selectChat, selectMessages } from "../../reducers/chatReducer"

const Messages = ({ chatId }) => {
  const messages = useSelector(selectMessages(chatId))

  return (
    <div className={s.messageWrapper}>
      {
        messages?.map(msg => (
          // <li key={msg._id}>
            <Message key={msg._id} message={msg}/>
          // </li>
        ))
      }
    </div>
  )
}

export default Messages