import React from 'react'
import Routes from '../routes/Routes'
import s from './App.module.css'
import usePageTracking from "../routes/usePageTracking"

function App() {
  usePageTracking()

  return (
    <div className={s.wrapper}>
      <Routes/>
    </div>
  )
}

export default App