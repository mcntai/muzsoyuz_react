import React from 'react'
import "antd/dist/antd.css"
import { Typography } from "antd"
import { useSelector } from "react-redux"
import { selectProfile } from "../../slice/user"
import s from './Messages.module.css'

const { Paragraph } = Typography

const Messages = ({ messages }) => {
  // const myId = useSelector(selectProfile('_id'))
  const myId = '604cf51a6341ff5448f6abe1'

  return (
    <div className={s.messageWrapper}>
      {
        messages?.map(msg => (
          <li key={msg._id}>
            <div style={{
              textAlign: msg.senderId === myId ? "right" : "left",
            }}>
              <div className={s.messageWidth}>
                <Paragraph
                  style={{
                    color: msg.senderId === myId ? "#FFFFFF" : "#000000",
                    background: msg.senderId === myId ? "#6384EB" : "#F6F6F6",
                    textAlign: msg.senderId === myId ? "right" : "left",
                    padding: "20px 25px",
                    borderRadius: msg.senderId === myId ? "30px 8px 30px 30px" : "30px 30px 30px 8px",
                    fontFamily: 'Montserrat',
                    fontSize: '14px',
                    fontWeight: "400",
                    lineHeight: "21px",
                  }}
                >
                  {msg.text}
                </Paragraph>
              </div>
            </div>
          </li>
        ))
      }
    </div>
  )
}

export default Messages