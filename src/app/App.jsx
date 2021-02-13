import React from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions/user'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from '../pages/auth/Auth'
import Main from '../pages/main/Main'
import SocialMediaOauth from '../pages/auth/SocialMediaOauth'
import OfferJob from '../pages/offerJobs/OfferJob'
import FindJob from '../pages/findJobs/FindJob'
import OpenJob from '../pages/findJobs/OpenJob'
import StartPage from '../pages/questionary/StartPage'
import ChooseInstrumentPage from '../pages/questionary/ChooseInstrumentPage'
import ChooseExperiencePage from '../pages/questionary/ChooseExperiencePage'
import ChooseFreeDaysPage from '../pages/questionary/ChooseFreeDaysPage'
import FilterPage from '../pages/findJobs/filters/FilterPage'
import SortingPage from '../pages/findJobs/sorting/SortingPage'
import Profile from '../pages/profile/Profile'
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
      this.props.dispatch(fetchUser())
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
            <Route path="/open-job" component={OpenJob}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/quest-start" component={StartPage}/>
            <Route path="/quest-instrument" component={ChooseInstrumentPage}/>
            <Route path="/quest-experience" component={ChooseExperiencePage}/>
            <Route path="/quest-free-days" component={ChooseFreeDaysPage}/>
            <Route path="/find-job-filter" component={FilterPage}/>
            <Route path="/find-job-sort" component={SortingPage}/>
          </Switch>
        </div>
      </Router>
    )
  }
}


export default connect(mapStateToProps)(App)
