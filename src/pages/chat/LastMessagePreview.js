import React, { useEffect, useState } from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectProfile } from "../../slice/user"

const { Text } = Typography

const LastMessagePreview = ({ messages }) => {
  // const myId = useSelector(selectProfile('_id'))
  const myId = '604cf51a6341ff5448f6abe1'
  const isMeLastSender = messages[messages.length-1]?.senderId === myId

  return (
    <>
      <Text
        secondary="true"
        style={{
          fontFamily: 'Montserrat',
          fontSize: '16px',
          fontHeight: '19px',
          fontWeight: '500'
        }}>
        {
          isMeLastSender
          ? "Я: " + messages[messages.length-1]?.text
          : messages[messages.length-1]?.text
        }
      </Text>
    </>
  )
}

export default LastMessagePreview