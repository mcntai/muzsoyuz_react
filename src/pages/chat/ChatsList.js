import React, { useEffect, useState, useRef } from "react"
import ChatPreview from "./ChatPreview"
import { io } from "socket.io-client"
import { NavLink } from 'react-router-dom'
import s from './ChatList.module.css'

const socket = io('https://muzsoyuz.com/', {
  path: '/api/v2/chat',
  query: {
    token: localStorage.getItem("token"),
  },
})

socket.on('chatError', (err) => {
  console.log(err)
})

// socket.on('connect', () => {
//   socket.emit('connected')
//
//   // connected.current = socket.connected
// })
//
// socket.emit('getConversations', (chats) => {
//   // setConversations(chats)
//   console.log(chats)
// })

function ChatsList() {
  const [connected, setConnected] = useState(false)
  const [conversations, setConversations] = useState()

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('connected')

      setConnected(socket.connected)
    })
  }, [])

  useEffect(() => {
    if (connected) {
      socket.emit('getConversations', (chats) => {
        setConversations(chats)
      })
    }
  }, [connected])


  return (
    <div className={s.chatListWrapper}>
      {console.log(conversations)}
      {
        conversations?.map(chat => (
          <li key={chat._id}>
            <NavLink className={s.navLinkWrapper} to={{
              pathname: '/opened-chat',
              state: { data: chat },
            }}>
              <ChatPreview chat={chat}/>
            </NavLink>
          </li>
        ))
      }
    </div>
  )
}

export default ChatsList