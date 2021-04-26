import React, { useEffect, useRef } from 'react'
import s from './Messages.module.css'
import Message from './Message'
import { useDispatch, useSelector } from "react-redux"
import { selectChat } from "../../reducers/chatReducer"
import { setMessagesViewed } from "../../actions/chat"

const Messages = ({ id }) => {
  const chat = useSelector(selectChat(id))
  const isChatOpened = useRef(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isChatOpened.current) {
      dispatch(setMessagesViewed(id))
    }

    return () => {
    }
  }, [chat])

  return (
    <div className={s.messageWrapper}>
      {
        chat?.messages?.map(msg => <Message key={msg._id} message={msg}/>)
      }
    </div>
  )
}

export default Messages