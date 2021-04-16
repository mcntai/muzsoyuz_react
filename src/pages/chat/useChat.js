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


function useChat() {
  const [connected, setConnected] = useState(false)
  const [conversations, setConversations] = useState()


  const socketConnect = () => {
    socket.on('connect', () => {
      socket.emit('connected')

      setConnected(socket.connected)
    })
  }

  useEffect(() => {
    if (connected) {
      socket.emit('getConversations', (chats) => {
        setConversations(chats)
      })
    }
  }, [connected])


  return { conversations, socketConnect }
}

export default useChat

