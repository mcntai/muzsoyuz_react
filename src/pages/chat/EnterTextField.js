import React, { useState } from 'react'
import { Input } from 'antd'
import { Button } from 'antd'
import { useDispatch } from "react-redux"
import { ACTIONS as t } from '../../constants/action-types'

const { TextArea } = Input

const EnterTextField = ({ id }) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  const handleSubmitMessage = () => {
    const message = { text, chatId: id }

    dispatch({ type: t.SEND_MESSAGE, message })
    setText('')
  }

  const handleChangeInput = e => {
    setText(e.target.value)
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
      <
        TextArea
        value={text}
        placeholder="Введіть повідомлення..."
        autoSize={{ minRows: 1, maxRows: 12 }}
        onChange={handleChangeInput}
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