import React, { useEffect, useRef } from 'react'
import s from './Messages.module.css'
import Message from './Message'
import { useDispatch, useSelector } from "react-redux"
import { selectChat } from "../../reducers/chatReducer"
import { setMessagesViewed } from "../../actions/chat"

const Messages = ({ id }) => {
  const chat = useSelector(selectChat(id))
  const myRef = useRef(null)
  const dispatch = useDispatch()

  // const scrollToTheBottom = () => {
  //   const windowHeight = window.innerHeight
  //   const contentHeight = document.documentElement.offsetHeight
  //   const clientHeight = document.documentElement.clientHeight
  //
  //   console.log({windowHeight})
  //   console.log({contentHeight})
  //   console.log({clientHeight})
  //
  //   if (contentHeight > windowHeight) {
  //   }
  //     myRef.current.scrollIntoView(false)
  // }
  //
  // useEffect(() => {
  //   scrollToTheBottom()
  // }, [chat])

  useEffect(() => {
    dispatch(setMessagesViewed(id))

    return () => {
      dispatch(setMessagesViewed(id))
    }
  }, [])

  return (
    <div className={s.messageWrapper}>
      {
        chat?.messages?.map(msg => <Message key={msg._id} message={msg}/>)
      }
      {/*<div ref={myRef}/>*/}
    </div>
  )
}

export default Messages