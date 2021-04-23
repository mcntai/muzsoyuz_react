import React, { memo } from "react"
import AvatarWithBadge from "./AvatarWithBadge"
import PersonName from "./PersonName"
import LastMessagePreview from "./LastMessagePreview"
import LastMessageTime from "./LastMessageTime"
import UnreadMessageCount from "./UnreadMessageCount"
import { Space } from "antd"
import { Row, Col } from "antd"
import s from './ChatPreview.module.css'

const ChatPreview = ({ id }) => {

  return (
    <div className={s.chatPreviewWrapper}>
      <Row align="middle">
        <Col span={5}>
          <AvatarWithBadge id={id}/>
        </Col>
        <Col
          span={16}
          style={{ padding: "0 12px" }}
        >
          <Space direction="vertical">
            <PersonName id={id} fontSize={"20px"}/>
            <LastMessagePreview id={id}/>
          </Space>
        </Col>
        <Col
          span={3}
          style={{ display: "flex", justifyContent: "center", textAlign: 'center' }}
        >
          <Space direction="vertical">
            <LastMessageTime id={id}/>
            <UnreadMessageCount id={id}/>
          </Space>
        </Col>
      </Row>
    </div>
  )
}

export default memo(ChatPreview)