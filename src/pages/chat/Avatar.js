import React from "react"
import "antd/dist/antd.css"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"

const AvatarOnly = ({ imageURL }) => {
  return (
    <>
      <Avatar
        src={imageURL}
        size={72}
        shape="circle"
        icon={<UserOutlined/>}
      />
    </>
  )
}

export default AvatarOnly