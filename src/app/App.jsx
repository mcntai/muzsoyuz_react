import React from 'react'
import s from './App.module.css'
import Auth from '../Pages/Auth'
import Main from '../Pages/Main'
import SocialMediaOauth from '../Pages/SocialMediaOauth'
import Profile from '../Pages/Profile'
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

  renderLogAuth() {
    return <Auth type={"login"}/>
  }

  renderRegAuth() {
    return <Auth type={"register"}/>
  }


  render() {
    return (
      <Router>
        <div className={s.wrapper}>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route path="/login" component={this.renderLogAuth}/>
            <Route path="/register" component={this.renderRegAuth}/>
            <Route path="/oauth/facebook/callback" component={() => <SocialMediaOauth type="facebook"/>}/>
            <Route path="/oauth/google/callback" component={() => <SocialMediaOauth type="google"/>}/>
            <Route path="/profile" component={Profile} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default connect(mapStateToProps)(App)
