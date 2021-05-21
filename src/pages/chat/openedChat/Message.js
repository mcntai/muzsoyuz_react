import React, { memo } from 'react'
import 'antd/dist/antd.css'
import { useSelector } from 'react-redux'
import { selectProfile } from '../../../redux/slice/user'
import { ReactComponent as ReadMsg } from '../../../assets/img/read-msg.svg'
import { ReactComponent as UnreadMsg } from '../../../assets/img/unread-msg.svg'
import s from './Message.module.css'

const Message = ({ message }) => {
  const myId = useSelector(selectProfile('_id'))
  const date = new Date(message.createdAt)
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const time = `${hours}:${minutes}`

  return (
    <>
      <div style={{
        textAlign: message.senderId === myId ? 'right' : 'left',
      }}>
        <div style={{
          display : 'inline-block',
          maxWidth: '80%',
        }}>
          <div
            className={s.msgContainer}
            style={{
              color       : message.senderId === myId ? '#FFFFFF' : '#000000',
              background  : message.senderId === myId ? '#6384EB' : '#F6F6F6',
              borderRadius: message.senderId === myId ? '30px 8px 30px 30px' : '30px 30px 30px 8px',
            }}
          >
            <div className={s.msgWrapper}
                 style={{
                   display : 'inline-block',
                   maxWidth: '100%'
                 }}>
              {message.text}
              <span style={{
                color: message.senderId === myId ? '#DADADA' : '#6A6A6A',
              }}>
                {time}
                {
                  message.senderId === myId
                    ? message.viewed
                    ? <ReadMsg className={s.img}/>
                    : <UnreadMsg className={s.img}/>
                    : null
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Message)