import React from 'react'
import "antd/dist/antd.css"
import { Typography } from "antd"

const { Paragraph } = Typography

const Messages = () => {
  return (
    <div style={{height: '80vh'}}>
      <div style={{ textAlign: 'left' }}>
        <div style={{ display: 'inline-block', width: "45%" }}>
          <Paragraph
            style={{ color: "#FFFFFF", background: "#6384EB", textAlign: "left" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Commodi consequuntur nihil nisi possimus quam, rem.
          </Paragraph>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ display: 'inline-block', width: "45%" }}>
          <Paragraph
            style={{ color: "#000000", background: "#F6F6F6", textAlign: "right" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            quam, rem.
          </Paragraph>
        </div>
      </div>
    </div>
  )
}

export default Messages