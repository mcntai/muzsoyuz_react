import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"


function useChat() {
  const socket = useRef(io())
  const [conversations, setConversations] = useState()
  const [chatId, setChatId] = useState()

  useEffect(() => {
    socket.current = io('https://muzsoyuz.com/', {
      path : '/api/v2/chat',
      query: {
        token: localStorage.getItem("token"),
      },
    })

    socket.current.on('connect', () => {
      socket.current.emit('connected')

      fetchConversations()
    })

    return () => socket.current.emit('disconnect')
  }, [])

  socket.current.on('createdConversation', (id) => {
    socket.current.emit('joinTheCreatedConversation', id, (conversation) => {

    })
    //  need to add conversation to all conversations array
    setChatId(id)
  })

  const fetchConversations = () => {
    socket.current.emit('getConversations', (convs) => {
      setConversations(convs)
      console.log(convs)
    })
  }

  const getConversations = () => conversations

  const createConversation = () => {
    socket.current.emit('createConversation', "604ce62a8bbf395d1b7fbd94")
  }

  socket.current.on('chatError', (error) => {
    console.log(error)
  })

  return {
    conversations,
    chatId,
    getConversations,
    createConversation,
  }
}

export default useChat

