import React from 'react'
import s from './Messages.module.css'
import Message from './Message'

const Messages = ({ messages }) => {

  return (
    <div className={s.messageWrapper}>
      {
        messages?.map(msg => (
          <li key={msg._id}>
            <Message message={msg}/>
          </li>
        ))
      }
    </div>
  )
}

export default Messages