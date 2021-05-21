import { createBrowserHistory } from 'history'
import ReactGA from "react-ga"

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_NO)

const history = createBrowserHistory()
history.listen((location) => {
  ReactGA.pageview(location.pathname)
})

const nav = performance.getEntriesByType("navigation")

if (window.performance && (nav === nav.TYPE_NAVIGATE)) {
  ReactGA.pageview("/")
}

export default history