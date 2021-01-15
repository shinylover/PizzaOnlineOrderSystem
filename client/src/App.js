import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import {Switch} from 'react-router';

import logo from './logo.svg';
import '../src/styles/App.css';
import { AuthContext } from './auth/AuthContext';
import Login from './components/loginPage/Login';
import Client from './components/clientPage/client';
import Shopper from './components/shopperPage/shopper';
import Visitor from './components/visitorPage/visitor';

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
        {/* <Header>
          Nothing
        </Header> */}
        <Router>
          <Switch>
            <Route exact path='/Login'>
              <Login/>
            </Route>
            <Route path='/client'>
              <Client/>
            </Route>
            <Route  path='/shopper'>
              <Shopper/>
            </Route>
            <Route  path='/visitor'>
              <Visitor/>
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
