import React from "react"
import "antd/dist/antd.css"
import { Avatar, Badge } from "antd"
import { UserOutlined } from "@ant-design/icons"

const AvatarWithBadge = ({ isActive, imageURL }) => {

  return (
    <>
      <Badge
        status ={isActive ? "success" : "default"}
        offset={["-15%", "85%"]}
        style={{ width: "14px", height: "14px", boxShadow: "0 0 0 5px #fff" }}
        color="#6384EB"
      >
        <Avatar
          src={imageURL}
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