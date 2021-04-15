import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"

const { Text } = Typography

const PersonName = ({ name, fontSize }) => {
  return (
    <>
      <Text
        style={{
          fontFamily: 'Montserrat',
          color: "#262D33",
          fontSize: fontSize,
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