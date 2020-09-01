import React from 'react';
import './App.css';
import Auth from '../Pages/Auth';

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
        <div className="wraper">
          <Switch>
            <Route exact path="/register" render={()=><Auth type="reg" />} />
            <Route exact path="/login" render={()=><Auth type="login" />} />
          </Switch>
        </div>
      </BrowserRouter> 
    );
  }
}

export default App;
