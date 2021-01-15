import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import {Row, Col, Form, Input, Button, Checkbox} from 'antd'
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import Visitor from '../visitorPage/visitor'

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
        event.preventDefault();
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
                            <Redirect to={{ pathname: context.authUser.type == 0 ? '/client' :  '/shopper'}}/>: undefined}
                            <Row type="flex" justify="space-around" align="middle">
                                <Col span={4} >
                                    <DemoBox value={120}>
                                        <Form inline onSubmit={this.handleSubmit}>
                                            <Form.Item label="Account">
                                                <Input placeholder="Please type your email"
                                                    // {...getFieldProps('userName')}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Password">
                                                <Input type="password" placeholder="please type password"
                                                    // {...getFieldProps('password')}
                                                />
                                            </Form.Item>
                                            <Form.Item>
                                                <Checkbox 
                                                // {...getFieldProps('agreement')}
                                                >记住我</Checkbox>
                                            </Form.Item>
                                            <Button type="primary" htmlType="submit">登录</Button>
                                            
                                                <a href="visitor">As a Visitor</a>
                                            
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
