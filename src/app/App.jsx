import React from 'react';
import s from './App.module.css';
import Auth from '../Pages/Auth';
import Main from '../Pages/Main';
import SocialMediaOauth from '../Pages/SocialMediaOauth';
import {connect} from 'react-redux';
import { fetchDataIfLoggedIn } from '../actions/getProfileActions';

import {BrowserRouter, Route, Switch} from 'react-router-dom'


const getData = () => {
  return fetch('http://localhost:9000/api/v1/user/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })
}

class App extends React.Component {
  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.dispatch(fetchDataIfLoggedIn(getData));
    }
  }
  
  


  render() {
    return (
      <BrowserRouter>
        <div className={s.wrapper}>
          <Switch>
            <Route exact path="/register" render={()=><Auth type="reg" />} />
            <Route exact path="/login" render={()=><Auth type="login" />} />
            <Route exact path="/oauth/facebook/callback" render={()=><SocialMediaOauth type="facebook" />} />
            <Route exact path="/oauth/google/callback" render={()=><SocialMediaOauth type="google" />} />
            <Route exact path="/main" component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(undefined)(App);
