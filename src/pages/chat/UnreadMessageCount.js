import React from "react"
import "antd/dist/antd.css"
import { Badge } from "antd"

function UnreadMessageCount() {
  return (
    <>
      <Badge count={146} style={{ backgroundColor: "#6384EB" }}/>
    </>
  )
}

export default UnreadMessageCount