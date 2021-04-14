import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

const EnterTextField = () => {
  return (
    <>
      <
        TextArea
        autoSize={{ minRows: 1, maxRows: 12 }}
      />
    </>
  )
}

export default EnterTextField