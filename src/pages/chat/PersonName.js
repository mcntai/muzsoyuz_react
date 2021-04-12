import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"

const { Text } = Typography

function PersonName() {
  return (
    <>
      <Text
        strong
        style={{ color: "#262D33" }}
      >
        Makentai Yoo
      </Text>
    </>
  )
}

export default PersonName