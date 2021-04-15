import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

const EnterTextField = () => {
  return (
    <div style={{
      background: "#FFFFFF",
      height: "100px",
      width: "calc(100vw - 30px)",
      position: "fixed",
      bottom: "0",
      display: "flex",
      alignItems: "center",
    }}>
      <
        TextArea
        autoSize={{ minRows: 1, maxRows: 12 }}
        style={{
          background: "#FAFAFA",
          padding: "24px 15px",
          borderRadius: "22px",
          fontSize: "16px",
        }}
      />
    </div>
  )
}

export default EnterTextField