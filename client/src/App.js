import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import {Switch} from 'react-router';

import '../src/styles/App.css';
import LoginApi from './api/loginApi'
import User from './entities/User'
import { AuthContext } from './auth/AuthContext';
import Login from './components/loginPage/Login';
import Client from './components/clientPage/client';
import Shopper from './components/shopperPage/shopper';
import Visitor from './components/visitorPage/visitor';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}

    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    LoginApi.isAuthenticated().then((user) => {
      this.setState({ authUser: user})
    }).catch( (err)=>{
      this.setState({ authErr: err})
    })
  }
  
  login = (email, password)=> {
    LoginApi.login(email, password).then((user)=> {
      this.setState({
        authUser: new User(user.id, user.email, user.type),
        authErr: null
      })
    }).catch( (err) => {
        this.setState({ authErr: err})
    })
  }

  logout = () =>{
    LoginApi.logout().then(() => {
      this.setState({authUser: null, authErr: null})
    })
  }

  render() {
    
    return (
      <AuthContext.Provider value={{
        authUser: this.state.authUser,
        authErr: this.state.authErr,
        loginUser: this.login,
        logoutUser: this.logout}}>
        {/* <Header>
          Nothing
        </Header> */}
        <Router>
          <Switch>
            <Route exact path='/Login'>
              <Login/>
            </Route>
            <Route path='/client'>
              <Client />
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
