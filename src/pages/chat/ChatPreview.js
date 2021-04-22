import React from "react"
import AvatarWithBadge from "./AvatarWithBadge"
import PersonName from "./PersonName"
import LastMessagePreview from "./LastMessagePreview"
import LastMessageTime from "./LastMessageTime"
import UnreadMessageCount from "./UnreadMessageCount"
import { Space } from "antd"
import { Row, Col } from "antd"
import s from './ChatPreview.module.css'

const ChatPreview = ({chatId}) => {

  return (
    <div className={s.chatPreviewWrapper}>
      <Row align="middle">
        <Col span={5}>
          <AvatarWithBadge chatId={chatId}/>
        </Col>
        <Col
          span={16}
          style={{ padding: "0 12px" }}
        >
          <Space direction="vertical">
            <PersonName chatId={chatId} fontSize={"20px"}/>
            <LastMessagePreview chatId={chatId}/>
          </Space>
        </Col>
        <Col
          span={3}
          style={{ display: "flex", justifyContent: "center", textAlign: 'center' }}
        >
          <Space direction="vertical">
            <LastMessageTime chatId={chatId}/>
            <UnreadMessageCount chatId={chatId}/>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default ChatPreview