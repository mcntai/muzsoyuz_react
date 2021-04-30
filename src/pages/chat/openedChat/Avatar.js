import React from "react"
import "antd/dist/antd.css"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { selectChat } from "../../../redux/reducers/chatReducer"

const AvatarOnly = ({ id }) => {
  const chat = useSelector(selectChat(id))

  return (
    <>
      <Avatar
        src={chat?.user?.imageURL}
        size={{ xs: 60, sm: 72, md: 72, lg: 72, xl: 72, xxl: 72 }}
        shape="circle"
        icon={<UserOutlined/>}
      />
    </>
  )
}

export default AvatarOnly