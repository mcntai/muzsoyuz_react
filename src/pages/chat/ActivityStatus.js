import React, { useEffect, useRef, useState } from "react"
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectChat, selectUserLastSeenTime } from "../../reducers/chatReducer"
import { calculateLastSeenStatus, dateFormatter } from "../../utils/date"

const { Text } = Typography

const ActivityStatus = ({ id }) => {
  const chat = useSelector(selectChat(id))
  const lastSeen = useSelector(selectUserLastSeenTime(id))
  const [lastActive, setLastActive] = useState('')
  const myRef = useRef(null)

  useEffect(() => {
    setLastActive(dateFormatter(lastSeen))
  }, [lastSeen])

  return (
    <>
      {
        chat?.user?.isActive
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
          : <Text
            secondary="true"
            style={{
              fontFamily: 'Montserrat',
              fontSize  : '12px',
              fontHeight: '15px',
              fontWeight: '500',
            }}
          >
            Був(ла) в мережі - {lastActive}
          </Text>
      }
    </>
  )
}

export default ActivityStatus