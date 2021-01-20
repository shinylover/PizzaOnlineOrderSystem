import React, { Component, Fragment } from 'react'
import {  Route, Switch, BrowserRouter } from 'react-router-dom';
import { Layout, Row, Col, Divider, Space, Tooltip, Button } from 'antd';
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import NavigationBar from '../NavigationBar'
import ClientOrders from './clientOrders'
import Pizzas from './pizzas'
import OrdersControl from './ordersControl'
import ClientApi from '../../api/clientApi'

const { Header, Footer,  Content } = Layout
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
const text = <span>If you order more than 3 pizzas(includes 3), you will get 10% discount of your total cost</span>;


export default class Client extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pizzas:[],
        }
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

    getPizzaInfos = () =>{
        ClientApi.getPizzaInfos()
            .then((result) => {
                
                this.setState({
                    pizzas: result
                })
            }).catch((err) => {
                this.handleErrors(err)
            })
    }

    componentDidMount(){
        
        this.timeId = setInterval(() => {
            this.getPizzaInfos()
        }, 5000)
        this.getPizzaInfos()
    }

    render() {
        return (
            // TODO: add authUser
            <AuthContext.Consumer>
                {(context) => (
                    <Fragment>
                        {context.authUser && 
                        <Fragment>
                            <Layout >
                                <Header>
                                    <NavigationBar/>
                                </Header>
                                <Content style={{margin:50}}>
                                    <BrowserRouter>
                                        <Switch>
                                            <Route exact path={'/client/menu'} >
                                                <Space direction='vertical' size ='large'>
                                                    <Pizzas pizzas={this.state.pizzas}/>
                                                    <Tooltip  placement="top" title={text}>
                                                        <Button type="primary" danger>
                                                            Discount Informations!
                                                        </Button>
                                                    </Tooltip>
                                                    <OrdersControl pizzas={this.state.pizzas}/>
                                                </Space>
                                            </Route >
                                            <Route exact path={'/client/orders'}>
                                                <ClientOrders />
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
