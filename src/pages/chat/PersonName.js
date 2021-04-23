import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectChat } from "../../reducers/chatReducer"

const { Text } = Typography

const PersonName = ({ id, fontSize }) => {
  const chat = useSelector(selectChat(id))

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
        {chat?.user?.name}
      </Text>
    </>
  )
}

export default PersonName