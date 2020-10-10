import React from 'react';
import s from './App.module.css';
import Auth from '../Pages/Auth';
import Main from '../Pages/Main';
import SocialMediaOauth from '../Pages/SocialMediaOauth';
import {connect} from 'react-redux';
import { fetchDataIfLoggedIn } from '../actions/getProfileActions';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

const mapStateToProps = state => {
  return {
    currentRoute: state.pageReducer.currentRoute,
    prevRoute: state.pageReducer.prevRoute
  }
}

class App extends React.Component {
  componentDidUpdate() {
    if (this.props.currentRoute !== this.props.prevRoute) {
      this.props.dispatch(fetchDataIfLoggedIn());
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className={s.wrapper}>
          <Switch>
            <Route exact path="/register" component={(props)=><Auth type="register" {...props} />} />
            <Route exact path="/login" component={(props)=><Auth type="login" {...props} />} />
            <Route exact path="/oauth/facebook/callback" render={()=><SocialMediaOauth type="facebook" />} />
            <Route exact path="/oauth/google/callback" render={()=><SocialMediaOauth type="google" />} />
            <Route exact path="/" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps)(App);
