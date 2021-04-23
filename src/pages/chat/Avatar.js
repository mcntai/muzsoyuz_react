import React from "react"
import "antd/dist/antd.css"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { selectChat } from "../../reducers/chatReducer"

const AvatarOnly = ({ id }) => {
  const user = useSelector(selectChat(id))

  return (
    <>
      <Avatar
        src={user?.imageURL}
        size={72}
        shape="circle"
        icon={<UserOutlined/>}
      />
    </>
  )
}

export default AvatarOnly