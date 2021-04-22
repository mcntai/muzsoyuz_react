import React from "react"
import "antd/dist/antd.css"
import { Badge } from "antd"
import { useSelector } from "react-redux"
import { selectProfile } from "../../slice/user"
import { selectChat } from "../../reducers/chatReducer"

const UnreadMessageCount = ({ chatId }) => {
  const { messages } = useSelector(selectChat(chatId))
  const myId = useSelector(selectProfile('_id'))
  const myUnreadMessages = messages.filter(msg => msg.senderId !== myId && !msg.viewed)

  return (
    <>
      <Badge
        count={myUnreadMessages.length}
        style={{
          backgroundColor: "#6384EB",
          color          : "#FFFFFF",
          fontFamily     : 'Montserrat',
          fontSize       : '15px',
          fontHeight     : '18px',
          fontWeight     : '500'
        }}
      />
    </>
  )
}

export default UnreadMessageCount