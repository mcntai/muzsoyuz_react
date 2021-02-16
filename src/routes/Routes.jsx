import React from 'react'
import Auth from '../pages/auth/Auth'
import FilterPage from '../pages/findJobs/filters/FilterPage'
import SortingPage from '../pages/findJobs/sorting/SortingPage'
import Main from '../pages/main/Main'
import SocialMediaOauth from '../pages/auth/SocialMediaOauth'
import FindJob from '../pages/findJobs/FindJob'
import OpenJob from '../pages/findJobs/OpenJob'
import OfferJob from '../pages/offerJobs/OfferJob'
import Profile from '../pages/profile/Profile'
import StartPage from '../pages/questionary/StartPage'
import ChooseInstrumentPage from '../pages/questionary/ChooseInstrumentPage'
import ChooseExperiencePage from '../pages/questionary/ChooseExperiencePage'
import ChooseFreeDaysPage from '../pages/questionary/ChooseFreeDaysPage'
import UserProvider from './UserProvider'
import { Router, Switch, Route } from 'react-router-dom'
import history from '../history/history'


export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login">
          <Auth type="login"/>
        </Route>
        <Route path="/register">
          <Auth type="register"/>
        </Route>

        <Route path="/find-job-filter" component={FilterPage}/>
        <Route path="/find-job-sort" component={SortingPage}/>

        <Route path="/oauth/facebook/callback">
          <SocialMediaOauth type="facebook"/>
        </Route>

        <Route path="/oauth/google/callback">
          <SocialMediaOauth type="google"/>
        </Route>

        <Route path="/find-job" component={FindJob}/>
        <Route path="/open-job" component={OpenJob}/>

        <UserProvider>
          <Route exact path="/" component={Main}/>
          <Route path="/offer-job" component={OfferJob}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/quest-start" component={StartPage}/>
          <Route path="/quest-instrument" component={ChooseInstrumentPage}/>
          <Route path="/quest-experience" component={ChooseExperiencePage}/>
          <Route path="/quest-free-days" component={ChooseFreeDaysPage}/>
        </UserProvider>
      </Switch>
    </Router>
  )
}