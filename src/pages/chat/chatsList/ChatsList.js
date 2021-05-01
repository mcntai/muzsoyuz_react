import React from 'react'
import ChatPreview from './ChatPreview'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectChats } from '../../../redux/reducers/chatReducer'
import { ROUTES as r } from '../../../constants/routes'
import Footer from "../../../components/mainFooter/Footer"
import s from "./ChatsList.module.css"


function ChatsList() {
  const chats = useSelector(selectChats)

  return (
    <>
      <div style={{ listStyle: "none" }}>
        {
          Object.keys(chats)?.map(chatId => (
            <li key={chatId}>
              <NavLink to={{
                pathname: r.OPENED_CHAT,
                state   : { chatId: chatId },
              }}>
                <ChatPreview id={chatId}/>
              </NavLink>
            </li>
          ))
        }
      </div>
      <div className={s.footerWrapper}>
        <Footer/>
      </div>
    </>
  )
}

export default ChatsList