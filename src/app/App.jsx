import React from 'react'
import s from './App.module.css'
import Auth from '../pages/Auth'
import Main from '../pages/Main'
import SocialMediaOauth from '../pages/SocialMediaOauth'
import Profile from '../pages/Profile'
import OfferJob from "../pages/OfferJob"
import FindJob from "../pages/FindJob"
import { connect } from 'react-redux'
import { fetchDataIfLoggedIn } from '../actions/getProfileActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


const mapStateToProps = state => {
  return {
    currentRoute: state.pageReducer.currentRoute,
    prevRoute: state.pageReducer.prevRoute,
  }
}

class App extends React.Component {
  componentDidUpdate() {
    if (this.props.currentRoute !== this.props.prevRoute && localStorage.getItem('token') !== null) {
      this.props.dispatch(fetchDataIfLoggedIn())
    }
  }

  render() {
    return (
      <Router>
        <div className={s.wrapper}>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/login" render={() => <Auth type="login" />}/>
            <Route path="/register" render={() => <Auth type="register" />}/>
            <Route path="/oauth/facebook/callback" component={() => <SocialMediaOauth type="facebook"/>}/>
            <Route path="/oauth/google/callback" component={() => <SocialMediaOauth type="google"/>}/>
            <Route path="/offer-job" component={OfferJob}/>
            <Route path="/find-job" component={FindJob}/>
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps)(App)
