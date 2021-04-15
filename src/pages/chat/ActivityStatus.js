import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"

const { Text } = Typography

const ActivityStatus = ({ isActive, lastSeen }) => {

  return (
    <>
      {
        isActive
          ? <Text
            style={{
              color: "#6384EB",
              fontFamily: 'Montserrat',
              fontSize: '12px',
              fontHeight: '15px',
              fontWeight: '500',
            }}
          >
            Онлайн
          </Text>
          : <Text secondary="true">53 хв тому</Text>
      }
    </>
  )
}

export default ActivityStatus