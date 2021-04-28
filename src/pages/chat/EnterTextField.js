import React, { useState, useCallback, useRef } from 'react'
import { Input } from 'antd'
import { Button } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { ACTIONS as t } from '../../constants/action-types'
import { debounce } from 'lodash'
import { typingEnd, typingStart } from "../../actions/chat"
import { selectChat } from "../../reducers/chatReducer"
import s from './EnterTextField.module.css'

const { TextArea } = Input

const EnterTextField = ({ id }) => {
  const myRef = useRef(null)
  const [text, setText] = useState('')
  const [startedTyping, setStartedTyping] = useState(false)
  const chat = useSelector(selectChat(id))
  const dispatch = useDispatch()

  const debounced = useCallback(
    debounce((value) => {
      setStartedTyping(false)

      dispatch(typingEnd(id))
    }, 1000),
    [startedTyping]
  )

  const handleTypingFinish = () => {
    debounced()
  }

  const handleSubmitMessage = () => {
    const message = { text, chatId: id }

    dispatch({ type: t.SEND_MESSAGE, message })
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

    if (/iPad|iPhone|iPod|Android/.test(userAgent) && !window.MSStream) return

    if (e.shiftKey || e.altKey || e.ctrlKey) return

    e.preventDefault()
    handleSubmitMessage()
  }

  return (
    <div style={{
      background: "#FFFFFF",
      width     : "calc(100vw - 30px)",
      position  : "fixed",
      bottom    : "0",
      display   : "flex",
      alignItems: "flex-end",
    }}>
      <span style={{ display: chat?.typing ? 'block' : 'none' }}>typing...</span>
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
        type="primary"
        shape="circle"
        size="large"
        onClick={handleSubmitMessage}
        style={{
          marginBottom: "10px",
          width       : "40px",
          height      : "40px"
        }}
      >
        <div className={s.send}/>
      </Button>
    </div>
  )
}

export default EnterTextField