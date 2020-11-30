import React from 'react'
import { fetchDataIfLoggedIn } from '../actions/getProfileActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Auth from '../Pages/Auth'
import Main from '../Pages/Main'
import SocialMediaOauth from '../Pages/SocialMediaOauth'
import Profile from '../Components/profile/Profile'
import OfferJob from '../Pages/OfferJob'
import FindJob from '../Pages/FindJob'
import Amigo from '../Pages/Amigo'
import s from './App.module.css'


const mapStateToProps = state => {
  return {
    currentRoute: state.pageReducer.currentRoute,
    prevRoute   : state.pageReducer.prevRoute,
  }
}

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
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
            <Route path="/amigo-happy-birthday" component={Amigo}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps)(App)
