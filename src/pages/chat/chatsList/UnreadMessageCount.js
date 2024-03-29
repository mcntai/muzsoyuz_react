import React from "react"
import "antd/dist/antd.css"
import { Badge } from "antd"
import { useSelector } from "react-redux"
import { selectProfile } from "../../../redux/slice/user"
import { selectChat } from "../../../redux/reducers/chatReducer"

const UnreadMessageCount = ({ id }) => {
  const { messages } = useSelector(selectChat(id))
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