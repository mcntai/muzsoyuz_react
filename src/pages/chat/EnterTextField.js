import React, { useState, useCallback } from 'react'
import { Input } from 'antd'
import { Button } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { ACTIONS as t } from '../../constants/action-types'
import { debounce } from 'lodash'
import { typingEnd, typingStart } from "../../actions/chat"
import { selectChat } from "../../reducers/chatReducer"

const { TextArea } = Input

const EnterTextField = ({ id }) => {
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
  }

  const handleChangeInput = e => {
    setText(e.target.value)

    if (startedTyping) return

    setStartedTyping(true)

    dispatch(typingStart(id))
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
      <span style={{display: chat?.typing ? 'block': 'none'}}>typing...</span>
      <
        TextArea
        value={text}
        placeholder="Введіть повідомлення..."
        autoSize={{ minRows: 1, maxRows: 12 }}
        onChange={handleChangeInput}
        onKeyUp={handleTypingFinish}
        style={{
          background  : "#FAFAFA",
          padding     : "24px 15px",
          borderRadius: "22px",
          fontSize    : "16px",
          marginBottom: "20px"
        }}
      />
      <Button
        type="primary"
        shape="circle"
        size="large"
        onClick={handleSubmitMessage}
        style={{
          marginBottom: "20px"
        }}
      >
        Send
      </Button>
    </div>
  )
}

export default EnterTextField