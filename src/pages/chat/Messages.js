import React from 'react'
import s from './Messages.module.css'
import Message from './Message'
import { useSelector } from "react-redux"
import { selectMessages } from "../../reducers/chatReducer"

const Messages = ({ id }) => {
  const messages = useSelector(selectMessages(id))

  return (
    <div className={s.messageWrapper}>
      {
        messages?.map(msg => <Message key={msg._id} message={msg}/>)
      }
    </div>
  )
}

export default Messages