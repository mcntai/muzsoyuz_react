import React from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectChat } from "../../reducers/chatReducer"

const { Text } = Typography

const ActivityStatus = ({ id }) => {
  const user = useSelector(selectChat(id))

  return (
    <>
      {
        user?.isActive
          ? <Text
            style={{
              color     : "#6384EB",
              fontFamily: 'Montserrat',
              fontSize  : '12px',
              fontHeight: '15px',
              fontWeight: '500',
            }}
          >
            Онлайн
          </Text>
          : <Text secondary="true">{user?.lastSeen}</Text>
      }
    </>
  )
}

export default ActivityStatus