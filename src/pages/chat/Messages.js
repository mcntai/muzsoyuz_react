import React from 'react'
import s from './Messages.module.css'
import Message from './Message'
import { useSelector } from "react-redux"
import { selectChat } from "../../reducers/chatReducer"

const Messages = ({ id }) => {
  const chat = useSelector(selectChat(id))

  return (
    <div className={s.messageWrapper}>
      {
        chat?.messages?.map(msg => <Message key={msg._id} message={msg}/>)
      }
    </div>
  )
}

export default Messages