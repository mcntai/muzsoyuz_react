import React from "react"
import "antd/dist/antd.css"
import AvatarOnly from "./Avatar"
import PersonName from "./PersonName"
import ActivityStatus from "./ActivityStatus"


const OpenedChat = () => {

  return (
    <>
      <AvatarOnly/>
      <div>
        <PersonName />
        <ActivityStatus/>
      </div>

    </>
  )
}

export default OpenedChat
