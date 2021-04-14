import React from "react"
import "antd/dist/antd.css"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"

function AvatarOnly() {
  return (
    <>
      <Avatar
        src="https://gravatar.com/avatar/145a6d612a739c9fa89d283475e0d258?s=400&d=robohash&r=x"
        size={72}
        shape="circle"
        icon={<UserOutlined/>}
        style={{ borderRadius: "30px" }}
      />
    </>
  )
}

export default AvatarOnly