import React, { Component, Fragment } from 'react'
import {  Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { Layout, Row, Col, Divider, Space, Tooltip, Button } from 'antd';
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import NavigationBar from '../NavigationBar'
import ClientOrders from './clientOrders'
import Pizzas from './pizzas'
import OrdersControl from './ordersControl'

const { Header, Footer,  Content } = Layout
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
const text = <span>If you order more than 3 pizzas(includes 3), you will get 10% discount of your total cost</span>;


export default class Client extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // TODO: add authUser
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
                                        <Pizzas />
                                        <Tooltip  placement="top" title={text}>
                                            <Button type="primary" danger>
                                                Discount Informations!
                                            </Button>
                                        </Tooltip>
                                        <OrdersControl/>
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
        )
    }
}
