import React from "react"
import "antd/dist/antd.css"
import { Avatar, Badge } from "antd"
import { UserOutlined } from "@ant-design/icons"

function AvatarWithBadge() {
  return (
    <>
      <Badge
        status="success"
        offset={["-15%", "85%"]}
        style={{ width: "14px", height: "14px", boxShadow: "0 0 0 5px #fff" }}
        color="#6384EB"
      >
        <Avatar
          src="https://gravatar.com/avatar/145a6d612a739c9fa89d283475e0d258?s=400&d=robohash&r=x"
          size={72}
          shape="circle"
          icon={<UserOutlined/>}
          style={{ borderRadius: "30px" }}
        />
      </Badge>
    </>
  )
}

export default AvatarWithBadge