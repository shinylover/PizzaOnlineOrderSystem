import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import {Switch} from 'react-router';

import logo from './logo.svg';
import '../src/styles/App.css';
import { AuthContext } from './auth/AuthContext';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {

    const value = {
      authUser: this.state.authUser,
      authErr: this.state.authErr,
      loginUser: this.login,
      logoutUser: this.logout
    }
    
    return (
      <AuthContext.Provider value={value}>
        <Header>
          Nothing
        </Header>
        <Router>
          <Switch>
            <Route exact path='/Login'>
              {/* TODO: loginPage */}
            </Route>
            <Route path='/Login'>
              {/* TODO: clientPage */}
            </Route>
            <Route  path='/Login'>
              {/* TODO: shopperPage */}
            </Route>
            <Route exact path='/'>
              <Redirect to= 'Login'/>
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    )
  }
}

export default App;
