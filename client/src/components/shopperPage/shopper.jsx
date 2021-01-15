import React, { Component, Fragment } from 'react'
import {  Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { Layout, Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import NavigationBar from '../NavigationBar'
import shopperOrders from './shopperOrders'

const { Header, Footer,  Content } = Layout
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class Shopper extends Component {
    render() {
        return (
            <Fragment>
                <Layout>
                    <Header>
                        <NavigationBar/>
                    </Header>
                    <Content>
                        <BrowserRouter>
                            <Switch>
                                <Route example={'/shopper/menu'}>
                                    <h2>Shopper Menu</h2>
                                </Route>
                                <Route exact path={'/shopper/orders'} >
                                    <h2>Shopper Order</h2>
                                    <shopperOrders />
                                    {/* <Divider orientation="left">Align Middle</Divider>
                                    <Row justify="space-around" align="middle">
                                        <Col span={4}>
                                            <DemoBox value={100}>

                                            </DemoBox>

                                        </Col>
                                    </Row> */}
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
