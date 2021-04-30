import React, { memo } from "react"
import AvatarWithBadge from "./AvatarWithBadge"
import PersonName from "./PersonName"
import LastMessagePreview from "./LastMessagePreview"
import LastMessageTime from "./LastMessageTime"
import UnreadMessageCount from "./UnreadMessageCount"
import { Space } from "antd"
import { Row, Col } from "antd"

const ChatPreview = ({ id }) => {

  return (
    <div style={{
      marginTop: "18px",
      padding  : "0 10px",
      overflow : "hidden"
    }}>
      <Row align="middle">
        <Col xs={4} sm={4} md={3} lg={2} xl={2} xxl={2}>
          <AvatarWithBadge id={id}/>
        </Col>
        <Col xs={17} sm={17} md={18} lg={19} xl={19} xxl={19}
             style={{
               padding: "0 12px",
               width  : "100%",
             }}
        >
          <Space
            direction="vertical"
            style={{
              width   : "100%",
              overflow: "hidden"
            }}
          >
            <PersonName id={id} fontSize={"18px"}/>
            <LastMessagePreview id={id}/>
          </Space>
        </Col>
        <Col
          span={3}
          style={{
            display       : "flex",
            justifyContent: "center",
            textAlign     : 'center'
          }}
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