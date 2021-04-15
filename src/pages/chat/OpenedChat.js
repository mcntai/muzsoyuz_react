import React from "react"
import "antd/dist/antd.css"
import AvatarOnly from "./Avatar"
import PersonName from "./PersonName"
import ActivityStatus from "./ActivityStatus"
import EnterTextField from "./EnterTextField"
import Messages from "./Messages"


const OpenedChat = ({ chat }) => {

  return (
    <>
      <AvatarOnly/>
      <div>
        <PersonName />
        <ActivityStatus/>
      </div>
      <Messages />
      <EnterTextField />
    </>
  )
}

export default OpenedChat
