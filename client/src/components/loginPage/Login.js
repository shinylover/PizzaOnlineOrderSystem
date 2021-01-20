import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import {Row, Col, Form, Input, Button, Checkbox, Alert} from 'antd'
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {email: '', password:'', redirect: false, invalidCredentials: false}
    }

    isEmailInvalid(email) {
        if (!email.localeCompare('')) return undefined;
        else return !email.includes('@');
    }

    login = (event, logIn) => {
        // event.preventDefault();
        logIn(this.state.email, this.state.password);
        this.setState({ redirect: true, invalidCredentials: false });
    }

    


    render() {
        return (
            <Fragment>
                <AuthContext.Consumer>
                    {(context)=>(
                        <Fragment>
                            {context.authUser && this.state.redirect ? 
                            <Redirect to={{ pathname: context.authUser.type == 0 ? '/client/menu' :  '/shopper/orders'}}/>: undefined}
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4} >
                                    <DemoBox value={120}>
                                        <Form inline id='loginForm' method="POST" onFinish={(event)=> this.login(event, context.loginUser)}>
                                            <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                            >
                                                <Input placeholder="Please type your email" isInvalid = { this.isEmailInvalid(this.state.email) } onChange={ (event)=> this.setState({email: event.target.value})}
                                                    // {...getFieldProps('userName')}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}>
                                                <Input type="password" placeholder="please type password" onChange= { event => this.setState({password: event.target.value})}
                                                    // {...getFieldProps('password')}
                                                />
                                            </Form.Item>
                                            {
                                                context.authErr && 
                                                    <Alert message="Can not login, please check you email or password"
                                                    type="warning"
                                                    closable/>
                                            
                                            }
                                            <Form.Item>
                                                <Button type="primary" htmlType="submit" disabled={!this.state.email.includes('@') || this.state.password.length === 0} >登录</Button>
                                            </Form.Item>
                                            
                                            <Button href="visitor">As a Visitor</Button>
                                            
                                        </Form>

                                    </DemoBox>
                                </Col>
                            </Row>
                        </Fragment>
                    )}
                </AuthContext.Consumer>
            </Fragment>
        )
    }
}
