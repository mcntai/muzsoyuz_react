import React from "react"
import AvatarWithBadge from "./AvatarWithBadge"
import PersonName from "./PersonName"
import LastMessagePreview from "./LastMessagePreview"
import LastMessageTime from "./LastMessageTime"
import UnreadMessageCount from "./UnreadMessageCount"
import { Space } from "antd"
import { Row, Col } from "antd"
import s from './ChatPreview.module.css'

function ChatPreview() {
  return (
    <div className={s.chatPreviewWrapper}>
      <Row align="middle">
        <Col span={5}>
          <AvatarWithBadge/>
        </Col>
        <Col
          span={16}
          style={{ padding: "0 12px" }}
        >
          <Space direction="vertical">
            <PersonName/>
            <LastMessagePreview/>
          </Space>
        </Col>
        <Col
          span={3}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Space direction="vertical">
            <LastMessageTime/>
            <UnreadMessageCount/>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default ChatPreview