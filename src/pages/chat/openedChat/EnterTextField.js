import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Input } from 'antd'
import { Button } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { ACTIONS as t } from '../../../constants/action-types'
import { debounce } from 'lodash'
import { typingEnd, typingStart } from "../../../redux/actions/chat"
import { selectChat } from "../../../redux/reducers/chatReducer"
import s from './EnterTextField.module.css'

const { TextArea } = Input

const EnterTextField = ({ id }) => {
  const myRef = useRef(null)
  const mounted = useRef(true)
  const [text, setText] = useState('')
  const [startedTyping, setStartedTyping] = useState(false)
  const chat = useSelector(selectChat(id))
  const userName = chat?.user?.name?.split(' ').slice(0, 1)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(typingEnd(id))
      mounted.current = false
    }
  }, [])

  const debounced = useCallback(
    debounce(() => {
      if (mounted.current) {

        setStartedTyping(false)

        dispatch(typingEnd(id))
      }
    }, 5000),
    [startedTyping]
  )

  const handleTypingFinish = () => {
    debounced()
  }

  const handleSubmitMessage = () => {
    const message = { text, chatId: id }

    dispatch({ type: t.SEND_MESSAGE, message })
    dispatch(typingEnd(id))
    setText('')

    myRef.current.focus()
  }

  const handleChangeInput = e => {
    setText(e.target.value)

    if (startedTyping) return

    setStartedTyping(true)

    dispatch(typingStart(id))
  }

  const handlePressEnter = e => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera

    if (/iPhone|Android/.test(userAgent) && !window.MSStream) return

    if (e.shiftKey || e.altKey || e.ctrlKey) return

    e.preventDefault()
    handleSubmitMessage()
  }

  return (
    <>
      <div style={{
        width        : "calc(100vw - 30px)",
        position     : "fixed",
        bottom       : "0",
        display      : "flex",
        flexDirection: "column",
      }}>
        <span style={{
          display   : chat?.typing ? "block" : "none",
          color     : "#6A6A6A",
          fontFamily: "Montserrat",
          fontSize  : "12px",
          lineHeight: "14px",
          fontWeight: "400",
          marginLeft: "15px",
        }}>
          {userName} пише...
        </span>
        <div style={{
          background    : "#FFFFFF",
          display       : "flex",
          alignItems    : "flex-end",
          justifyContent: "space-between",
        }}>
          <
            TextArea
            value={text}
            placeholder="Введіть повідомлення..."
            autoSize={{ minRows: 1, maxRows: 12 }}
            onChange={handleChangeInput}
            onKeyUp={handleTypingFinish}
            onPressEnter={handlePressEnter}
            ref={myRef}
            style={{
              background  : "#FAFAFA",
              padding     : "6px 15px",
              borderRadius: "22px",
              fontSize    : "16px",
              marginTop   : "5px",
              marginBottom: "10px"
            }}
          />
          <Button
            className={s.btn}
            shape="circle"
            size="large"
            onClick={handleSubmitMessage}
            style={{
              marginBottom: "10px",
              marginLeft  : "5px",
              width       : "40px",
              height      : "40px",
              background  : "#6384EB",
              border      : "none",
            }}
          >
            <div className={s.send}/>
          </Button>
        </div>
      </div>
    </>
  )
}

export default EnterTextField