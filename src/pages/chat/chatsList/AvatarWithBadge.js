import React from "react"
import "antd/dist/antd.css"
import { Avatar, Badge } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { selectChat } from "../../../redux/reducers/chatReducer"

const AvatarWithBadge = ({ id }) => {
  const { user: { imageURL, isActive } } = useSelector(selectChat(id))

  return (
    <>
      <Badge
        offset={["-15%", "85%"]}
        style={{ width: "14px", height: "14px", boxShadow: "0 0 0 5px #fff", backgroundColor: '#6384EB' }}
        dot={isActive}
      >
        <Avatar
          src={imageURL}
          size={{ xs: 60, sm: 72, md: 72, lg: 72, xl: 72, xxl: 72 }}
          shape="circle"
          icon={<UserOutlined/>}
          style={{ borderRadius: "30px" }}
        />
      </Badge>
    </>
  )
}

export default AvatarWithBadge