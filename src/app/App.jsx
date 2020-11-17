import React from 'react'
import s from './App.module.css'
import Auth from '../Pages/Auth'
import Main from '../Pages/Main'
import SocialMediaOauth from '../Pages/SocialMediaOauth'
import Profile from '../Pages/Profile'
import OfferJob from '../Pages/OfferJob'
import FindJob from '../Pages/FindJob'
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
  componentDidMount() {
    if(localStorage.getItem('token') !== null) {
      this.props.dispatch(fetchDataIfLoggedIn())
    }
  }

  render() {
    return (
      <Router>
        <div className={s.wrapper}>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/login" render={() => <Auth type="login"/>}/>
            <Route path="/register" render={() => <Auth type="register"/>}/>
            <Route path="/oauth/facebook/callback" component={() => <SocialMediaOauth type="facebook"/>}/>
            <Route path="/oauth/google/callback" component={() => <SocialMediaOauth type="google"/>}/>
            <Route path="/offer-job" component={OfferJob}/>
            <Route path="/find-job" component={FindJob}/>
            <Route path="/profile" component={Profile}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps)(App)
