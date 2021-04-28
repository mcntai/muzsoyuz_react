import React, { memo } from 'react'
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectProfile } from "../../slice/user"
import s from './Messages.module.css'

const { Paragraph } = Typography

const Message = ({ message }) => {
  const myId = useSelector(selectProfile('_id'))

  return (
    <>
      <div style={{
        textAlign: message.senderId === myId ? "right" : "left",
      }}>
        <div className={s.messageWidth}>
          <Paragraph
            style={{
              color       : message.senderId === myId ? "#FFFFFF" : "#000000",
              background  : message.senderId === myId ? "#6384EB" : "#F6F6F6",
              textAlign   : "left",
              padding     : "10px 15px",
              borderRadius: message.senderId === myId ? "30px 8px 30px 30px" : "30px 30px 30px 8px",
              fontFamily  : 'Montserrat',
              fontSize    : '14px',
              fontWeight  : "400",
              lineHeight  : "21px",
            }}
          >
            {message.text}
          </Paragraph>
        </div>
      </div>
    </>
  )
}

export default memo(Message)