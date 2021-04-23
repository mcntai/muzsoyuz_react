import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectProfile } from "../../slice/user"
import { selectChat } from "../../reducers/chatReducer"

const { Text } = Typography

const LastMessagePreview = ({ id }) => {
  const { messages } = useSelector(selectChat(id))
  const myId = useSelector(selectProfile('_id'))
  const isMeLastSender = messages[messages.length - 1]?.senderId === myId

  return (
    <>
      <Text
        secondary="true"
        style={{
          fontFamily: 'Montserrat',
          fontSize  : '16px',
          fontHeight: '19px',
          fontWeight: '500'
        }}>
        {
          isMeLastSender
            ? "Я: " + messages[messages.length - 1]?.text
            : messages[messages.length - 1]?.text
        }
      </Text>
    </>
  )
}

export default LastMessagePreview