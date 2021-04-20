import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import keyBy from 'lodash/keyBy'
import cloneDeep from 'lodash/cloneDeep'


function useChat() {
  const socket = useRef(io('https://muzsoyuz.com/', {
    path : '/api/v2/chat',
    query: {
      token: localStorage.getItem("token"),
    },
  }))
  const [conversationsMap, setConversationsMap] = useState({})


  useEffect(() => {
    socket.current.on('connect', () => {
      socket.current.emit('connected')

      fetchConversations()

      socket.current.emit('getUsers', (users) => {
        // console.log(users)
      })
    })

    socket.current.on('createdConversation', (id) => {
      socket.current.emit('joinTheCreatedConversation', id, (newConversation) => {
        setConversationsMap(conversations => {
          const clonedMap = cloneDeep(conversations)
          clonedMap[id] = newConversation

          return clonedMap
        })
      })
    })

    socket.current.on('newMessage', (msg) => {
      console.log(msg)
      setConversationsMap(conversations => {
        const clonedMap = cloneDeep(conversations)
        const conversation = clonedMap[msg.chatId]

        conversation.messages.push(msg)

        return clonedMap
      })
    })

    socket.current.on('chatError', (error) => {
      console.log(error)
    })

    return () => socket.current.disconnect()
  }, [])

  const fetchConversations = () => {
    socket.current.emit('getConversations', (allConversations) => {
      setConversationsMap(keyBy(allConversations, '_id'))
    })
  }

  const createConversation = () => {
    socket.current.emit('createConversation', "60505857380b5441f62e584b")
  }

  const sendMessage = (text, chatId) => {
    socket.current.send({ text, chatId })
  }

  return {
    conversationsMap,
    createConversation,
    sendMessage,
  }
}

export default useChat

