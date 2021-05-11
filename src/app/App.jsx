import React, { useEffect } from 'react'
import Routes from '../routes/Routes'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'
import s from './App.module.css'

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_NO)
const browserHistory = createBrowserHistory()
browserHistory.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search)
})

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <div className={s.wrapper}>
      <Routes/>
    </div>
  )
}

export default App