import React from 'react'
import { connect } from 'react-redux'
import { fetchDataIfLoggedIn } from '../actions/getProfileActions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from '../Pages/Auth'
import Main from '../Pages/Main'
import SocialMediaOauth from '../Pages/SocialMediaOauth'
import OfferJob from '../Pages/OfferJob'
import FindJob from '../Pages/FindJob'
import OpenJob from '../Components/common/OpenJob'
import Settings from '../Components/profile/Settings'
import StartPage from '../Components/questionary/StartPage'
import ChooseInstrumentPage from '../Components/questionary/ChooseInstrumentPage'
import ChooseFreeDaysPage from '../Components/questionary/ChooseFreeDaysPage'
import FilterPage from '../Components/buttons/filters/FilterPage'
import SortingPage from '../Components/buttons/sorting/SortingPage'
import Profile from '../Components/profile/Profile'
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
            <Route path="/open-job" component={OpenJob}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/quest-1" component={StartPage}/>
            <Route path="/quest-2" component={ChooseInstrumentPage}/>
            <Route path="/quest-3" component={ChooseFreeDaysPage}/>
            <Route path="/find-job-filter" component={FilterPage}/>
            <Route path="/find-job-sort" component={SortingPage}/>
          </Switch>
        </div>
      </Router>
    )
  }
}


export default connect(mapStateToProps)(App)
