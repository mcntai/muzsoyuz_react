import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectChat } from "../../reducers/chatReducer"

const { Text } = Typography

const PersonName = ({ chatId, fontSize }) => {
  const { user: { name } } = useSelector(selectChat(chatId))

  return (
    <>
      <Text
        style={{
          fontFamily: 'Montserrat',
          color     : "#262D33",
          fontSize  : fontSize,
          fontWeight: "600",
          lineHeight: "24px"
        }}
      >
        {name}
      </Text>
    </>
  )
}

export default PersonName