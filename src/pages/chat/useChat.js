import { useEffect, useState } from "react"
import { io } from "socket.io-client"


const socket = io('https://muzsoyuz.com/', {
  path: '/api/v2/chat',
  query: {
    token: localStorage.getItem("token"),
  },
})


function useChat() {
  const [connected, setConnected] = useState(false)
  const [conversations, setConversations] = useState()
  const [conversationCreated, setConversationCreated] = useState(false)
  const [chatId, setChatId] = useState()


  useEffect(() => {
    if (conversationCreated) {
      socket.on('createdConversation', (id) => {
        socket.emit('joinTheCreatedConversation', id)
        setChatId(id)
      })
    }
  }, [conversationCreated])


  const socketConnect = () => {
    socket.on('connect', () => {
      socket.emit('connected')

      setConnected(socket.connected)

      socket.emit('getUsers', (data) => {
        console.log(data)
      })

      // socket.emit('getMessages', (data) => {
      //   console.log(data)
      // })
    })
  }

  const getConversations = () => {
    socket.emit('getConversations', (chats) => {
      setConversations(chats)
    })
  }

  const createConversation = () => {
    socket.emit('createConversation', "60505857380b5441f62e584b")

    setConversationCreated(true)
  }

  return {
    connected,
    conversations,
    chatId,
    socketConnect,
    getConversations,
    createConversation,
  }
}

export default useChat

