import React, { useState } from 'react'
import { Input } from 'antd'
import { Button } from 'antd';

const { TextArea } = Input

const EnterTextField = ({chatId, sendMessage}) => {
  const [text, setText] = useState('')

  function handleSubmitMessage() {
    sendMessage(text, chatId)
    setText('')
  }

  function handleChangeInput(e) {
    setText(e.target.value)
  }

  return (
    <div style={{
      background: "#FFFFFF",
      width: "calc(100vw - 30px)",
      position: "fixed",
      bottom: "0",
      display: "flex",
      alignItems: "flex-end",
    }}>
      <
        TextArea
        value={text}
        placeholder="Введіть повідомлення..."
        autoSize={{ minRows: 1, maxRows: 12 }}
        style={{
          background: "#FAFAFA",
          padding: "24px 15px",
          borderRadius: "22px",
          fontSize: "16px",
          marginBottom: "20px"
        }}
        onChange={handleChangeInput}
      />
      <Button
        type="primary"
        shape="circle"
        size="large"
        style={{
          marginBottom: "20px"
        }}
        onClick={handleSubmitMessage}
      >
        Send
      </Button>
    </div>
  )
}

export default EnterTextField