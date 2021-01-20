import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import {Row, Col, Form, Input, Button, Checkbox, Alert} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import { AuthContext } from '../../auth/AuthContext';
import Background from '../../tools/pizzaBackground.jpeg'

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;
var sectionStyle = {
    width: "1800px",
    height:"1000px",
    backgroundImage: `url(${Background})`
}


export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {email: '', password:'', redirect: true, invalidCredentials: false}
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
            <div style={sectionStyle}>

                <Fragment>
                    <AuthContext.Consumer>
                        {(context)=>(
                            <Fragment>
                                {context.authUser && this.state.redirect ? 
                                <Redirect to={{ pathname: context.authUser.type === 0 ? '/client' :  '/shopper'}}/>: undefined}
                                <Row type="flex" justify="space-around" align="middle" style={{marginTop: '60px', marginBottom: '40px'}}>
                                    <Col span={4} >
                                        <DemoBox value={120}>
                                            <Form inline id='loginForm' method="POST" onFinish={(event)=> this.login(event, context.loginUser)}>
                                                <Form.Item
                                                label="Username"
                                                name="username"
                                                rules={[{ required: true, message: 'Please input your username!' }]}
                                                >
                                                    <Input placeholder="Please type your email" prefix={<UserOutlined />} isInvalid = { this.isEmailInvalid(this.state.email) } onChange={ (event)=> this.setState({email: event.target.value})}
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
                                                
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit" disabled={!this.state.email.includes('@') || this.state.password.length === 0} >Login</Button>
                                                </Form.Item>
                                                
                                                <Button type="primary" href="visitor">As a Visitor</Button>
                                                
                                            </Form>
    
                                        </DemoBox>
                                    </Col>
                                </Row>
                            
                            </Fragment>
                        )}
                    </AuthContext.Consumer>
                </Fragment>
           
            </div>
       )
    }
}
