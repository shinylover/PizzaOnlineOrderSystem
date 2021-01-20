import React, { Component, Fragment } from 'react'
import {  Route, Switch, BrowserRouter } from 'react-router-dom';
import { Layout, Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import NavigationBar from '../NavigationBar'
import ShopperOrders from './shopperOrders'
import ShopperApi from '../../api/shopperApi'


const { Header, Footer,  Content } = Layout

export default class Shopper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pizzas:[],
        }
    }

    getPizzaInfos = () =>{
        ShopperApi.getPizzaInfos()
            .then((result) => {
                
                this.setState({
                    pizzas: result
                })
            }).catch((err) => {
                this.handleErrors(err)
            })
    }

    handleErrors = (err) => {
        if (err) {
            if (err.status && err.status ===401) {
                this.setState({ authErr: err });
                this.props.history.push("/");
            } else {
                this.setState({
                    authErr: err
                })
            }
        } 
    }

    componentDidMount(){
        this.getPizzaInfos()
        for(let i = 0; i <10000; i++){
            let item = 1
            // cost cpu resource 
        }
        this.timeId = setInterval(() => {
            this.getPizzaInfos()
        }, 5000)
        
    }

    render() {

        return (
            <AuthContext.Consumer>
                {(context) => (
                    <Fragment>
                        {context.authUser && 
                        <Fragment>

                            <Layout>
                                <Header>
                                    <NavigationBar/>
                                </Header>
                                <Content style={{margin:50}}>
                                    <BrowserRouter>
                                        <Switch>
                                            <Route exact path={'/shopper/orders'} >
                                                
                                                <ShopperOrders 
                                                pizzas={this.state.pizzas}
                                                email = {context.authUser.email}
                                                />
                                                
                                            </Route>
                                        </Switch>
                                    
                                    </BrowserRouter>
                                </Content>
                                <Footer>
                                    
                                </Footer>
                            </Layout>
                            
                        </Fragment>
                        }

                    </Fragment>

                )}
            </AuthContext.Consumer>

        )
    }
}
