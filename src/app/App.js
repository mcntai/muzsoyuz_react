import React from 'react';
import s from './App.module.css';
import Auth from '../Pages/Auth';
import Main from '../Pages/Main';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className={s.wrapper}>
          <Switch>
            <Route exact path="/register" render={()=><Auth type="reg" />} />
            <Route exact path="/login" render={()=><Auth type="login" />} />
            <Route exact path="/main" component={Main} />
          </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
