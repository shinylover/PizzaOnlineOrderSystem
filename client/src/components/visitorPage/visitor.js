import React, { Component, Fragment } from 'react'
import {  Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { Layout, Space, Tooltip, Button } from 'antd';
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import NavigationBar from '../NavigationBar'
import Pizzas from './pizzas'
import VisitorApi from '../../api/visitorApi'



const { Header, Footer,  Content } = Layout
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
const text = <span>If you order more than 3 pizzas(includes 3), you will get 10% discount of your total cost</span>;

class Visitor extends Component {
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
        VisitorApi.getPizzaInfos()
            .then((result) => {
                
                this.setState({
                    pizzas: result
                })
            }).catch((err) => {
                this.handleErrors(err)
            })
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
            // TODO: add authUser
            <Fragment>
                <Layout>
                    <Header>
                        <NavigationBar/>
                    </Header>
                    <Content style={{margin:50}}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path={'/visitor/menu'} >
                                    <Space direction='vertical' size ='large'>
                                        <Pizzas  pizzas={this.state.pizzas}/>
                                        <Tooltip  placement="top" title={text}>
                                            <Button type="primary" danger>
                                                Discount Informations!
                                            </Button>
                                        </Tooltip>
                                        
                                    </Space>
                                    
                                    
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