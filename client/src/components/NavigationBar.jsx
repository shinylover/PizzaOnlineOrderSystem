import React, { Component, Fragment } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import {Menu} from 'antd'
import { MenuOutlined, BookTwoTone} from '@ant-design/icons';
import 'antd/dist/antd.css';


import { AuthContext } from '../auth/AuthContext'


export default class NavigationBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current:'mail'
        }
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
      }
    render() {
        const { current } = this.state;
        return (
            <AuthContext.Consumer>
                {(context)=>(
                    <Fragment>
                        <Switch>
                            <Route path='/client'>
                                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                                    <Menu.Item key="mail" icon={<MenuOutlined />}>
                                        Menu
                                        <a href="/client/menu"/>
                                    </Menu.Item>
                                    <Menu.Item key="app" icon={<BookTwoTone />}>
                                        Orders
                                        <a href="/client/orders"/>
                                    </Menu.Item>
                                
                                    <Menu.Item key="alipay">
                                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                        Navigation Four - Link
                                    </a>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                            <Route path='/shopper'>
                            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                                    <Menu.Item key="mail" icon={<MenuOutlined />}>
                                        Menu
                                        <a href="/shopper/menu"/>
                                    </Menu.Item>
                                    <Menu.Item key="app" icon={<BookTwoTone />}>
                                        Orders
                                        <a href="/shopper/orders"/>
                                    </Menu.Item>
                                
                                    <Menu.Item key="alipay">
                                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                        Navigation Four - Link
                                    </a>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                            <Route path='/visitor'>
                                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                                    <Menu.Item key="mail" icon={<MenuOutlined />}>
                                        Menu
                                        <a href="/visitor/menu"/>
                                    </Menu.Item>
                                    
                                
                                    <Menu.Item key="alipay">
                                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                        Navigation Four - Link
                                    </a>
                                    </Menu.Item>
                                </Menu>
                            </Route>
                        </Switch>
                        
                    </Fragment>
                )

            }
            </AuthContext.Consumer>
        )
    }
}
