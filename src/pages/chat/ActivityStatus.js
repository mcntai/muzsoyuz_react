import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"

const { Text } = Typography

function ActivityStatus(isActive) {
  return (
    <>
      {
        isActive
          ? <Text secondary="true">Онлайн</Text>
          : <Text secondary="true">53 хв тому</Text>
      }
    </>
  )
}

export default ActivityStatus