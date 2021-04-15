import React from "react"
import AvatarWithBadge from "./AvatarWithBadge"
import PersonName from "./PersonName"
import LastMessagePreview from "./LastMessagePreview"
import LastMessageTime from "./LastMessageTime"
import UnreadMessageCount from "./UnreadMessageCount"
import { Space } from "antd"
import { Row, Col } from "antd"
import s from './ChatPreview.module.css'

const ChatPreview = ({ chat }) => {
  const { imageURL, name, isActive, lastSeen } = chat.user

  return (
    <div className={s.chatPreviewWrapper}>
      <Row align="middle">
        <Col span={5}>
          <AvatarWithBadge isActive={isActive} imageURL={imageURL}/>
        </Col>
        <Col
          span={16}
          style={{ padding: "0 12px" }}
        >
          <Space direction="vertical">
            <PersonName name={name} fontSize={"20px"}/>
            <LastMessagePreview messages={chat.messages}/>
          </Space>
        </Col>
        <Col
          span={3}
          style={{ display: "flex", justifyContent: "center", textAlign: 'center' }}
        >
          <Space direction="vertical">
            <LastMessageTime messages={chat.messages}/>
            <UnreadMessageCount messages={chat.messages}/>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default ChatPreview