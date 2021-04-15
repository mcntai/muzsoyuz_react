import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"

const { Text } = Typography

const LastMessageTime = ({ messages }) => {
  const date = new Date(messages[messages.length - 1]?.createdAt)
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const time = `${date.getHours()}:${minutes}`

  return (
    <>
      <Text
        secondary="true"
        style={{
          fontFamily: 'Montserrat',
          fontSize: '17px',
          fontHeight: '20px',
          fontWeight: '500'
        }}
      >
        {time}
      </Text>
    </>
  )
}

export default LastMessageTime