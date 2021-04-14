import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"

const { Text } = Typography

const PersonName = ({ name }) => {
  return (
    <>
      <Text
        strong
        style={{ color: "#262D33", fontSize: "20px", fontWeight: "600", lineHeight: "24px" }}
      >
        {name}
      </Text>
    </>
  )
}

export default PersonName