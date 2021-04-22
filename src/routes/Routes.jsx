import React from "react"
import Auth from "../pages/auth/Auth"
import FilterPage from "../pages/findJobs/filters/FilterPage"
import SortingPage from "../pages/findJobs/sorting/SortingPage"
import Main from "../pages/main/Main"
import FindJob from "../pages/findJobs/FindJob"
import OpenJob from "../pages/findJobs/OpenJob"
import OfferJob from "../pages/offerJobs/OfferJob"
import Profile from "../pages/profile/Profile"
import StartPage from "../pages/questionary/StartPage"
import ChooseInstrumentPage from "../pages/questionary/ChooseInstrumentPage"
import ChooseExperiencePage from "../pages/questionary/ChooseExperiencePage"
import ChooseFreeDaysPage from "../pages/questionary/ChooseFreeDaysPage"
import UserProvider from "./providers/UserProvider"
import { Router, Switch, Route } from "react-router-dom"
import history from "../history/history"
import OauthCallBackListener from "./OauthCallBackListener"
import Preloader from "./providers/Preloader"
import ImageEasyCrop from "../components/common/ImageEasyCrop"
import ChatsList from "../pages/chat/ChatsList"
import OpenedChat from "../pages/chat/OpenedChat"


export default function Routes() {

  return (
    <Preloader>
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

          <Route path="/oauth/facebook/callback" component={OauthCallBackListener}/>
          <Route path="/oauth/google/callback" component={OauthCallBackListener}/>

          <Route path="/find-job" component={FindJob}/>
          <Route path="/open-job" component={OpenJob}/>

          <Route path="/image" component={ImageEasyCrop}/>

          <UserProvider>
            <Route exact path="/" component={Main}/>
            <Route path="/offer-job" component={OfferJob}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/chat" component={ChatsList}/>
            <Route path="/opened-chat" component={OpenedChat}/>
            <Route path="/quest-start" component={StartPage}/>
            <Route path="/quest-instrument" component={ChooseInstrumentPage}/>
            <Route path="/quest-experience" component={ChooseExperiencePage}/>
            <Route path="/quest-free-days" component={ChooseFreeDaysPage}/>
          </UserProvider>
        </Switch>
      </Router>
    </Preloader>
  )
}