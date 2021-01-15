import React, { Component, Fragment } from 'react'
import {  Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { Layout, Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import NavigationBar from '../NavigationBar'
import Pizzas from './pizzas'

const { Header, Footer,  Content } = Layout
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

class Visitor extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            // TODO: add authUser
            <Fragment>
                <Layout>
                    <Header>
                        <NavigationBar/>
                    </Header>
                    <Content>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path={'/visitor/menu'} >
                                    <h2>worker</h2>
                                    <Pizzas />
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

export default withRouter(Visitor)