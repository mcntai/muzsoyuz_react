import React, { useEffect } from 'react'
import Message from './Message'
import { useDispatch, useSelector } from "react-redux"
import { selectChat } from "../../../redux/reducers/chatReducer"
import { setMessagesViewed } from "../../../redux/actions/chat"
import { selectProfile } from "../../../redux/slice/user"

const Messages = ({ id }) => {
  const myId = useSelector(selectProfile('_id'))
  const chat = useSelector(selectChat(id))
  const dispatch = useDispatch()


  useEffect(() => {
    if (chat) {
      dispatch(setMessagesViewed(id, myId))
    }

    return () => {
      dispatch(setMessagesViewed(id, myId))
    }
  }, [])

  return (
    <div style={{
      marginTop    : "120px",
      paddingBottom: "60px",
      listStyle    : "none",
    }}>
      {
        chat?.messages?.map(msg => <Message key={msg._id} message={msg}/>)
      }
    </div>
  )
}

export default Messages