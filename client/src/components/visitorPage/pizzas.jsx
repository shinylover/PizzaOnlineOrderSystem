import React, { Component, Fragment } from 'react'
import { Card, Avatar, Row, Col, Space, Dropdown, Button, Image } from 'antd';
import { DownOutlined, EuroCircleOutlined } from '@ant-design/icons';

import MenuS from '../../tools/dropDownForS'
import MenuM from '../../tools/dropDownForM'
import MenuL from '../../tools/dropDownForL'

const { Meta } = Card;

export default class Pizzas extends Component {
    render() {
        return (
            // TODO: add authUser
            <Fragment>
                <Row justify="start" >
                    <Space align='start' size = {100}>
                        <Col span={4}>
                            <Card
                                hoverable='true'
                                style={{ width: 300}
                                        }
                                cover={
                                    <Image
                                        alt="example"
                                        src="/pizza.jpg"
                                    />
                                }
                                actions={[
                                    <Space>
                                        <Dropdown overlay={MenuS} placement="bottomLeft" arrow>
                                            <Button>Toppings
                                                <DownOutlined/>
                                            </Button>
                                        </Dropdown>
                                        <Button>Available:10</Button>
                                        <Button><EuroCircleOutlined />4 </Button>
                                    </Space>
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} >S</Avatar>}
                                    title="Small Pizza"
                                    description="Small size pizaa only can choose 2 toppings(except Tomato, there is no Seafood)"
                                />
                            </Card>
                        </Col>
                    

                    
                        <Col span={4}>
                            <Card
                                hoverable='true'
                                style={{ width: 300 }}
                                cover={
                                    <Image
                                        alt="example"
                                        src="/pizza.jpg"
                                    />
                                }
                                actions={[
                                    <Space>
                                        <Dropdown overlay={MenuM} placement="bottomLeft" arrow>
                                            <Button>Toppings
                                                <DownOutlined/>
                                            </Button>
                                        </Dropdown>
                                        <Button>Available:8</Button>
                                        <Button><EuroCircleOutlined />6 </Button>
                                    </Space>
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} >M</Avatar>}
                                    title="Middle Pizza"
                                    description="Middle size pizaa only can choose 3 toppings(except Tomato, there is no Seafood)"
                                />
                            </Card>
                        </Col>
                    

                    
                        <Col span={4}>
                            <Card
                                hoverable='true'
                                style={{ width: 300 }}
                                cover={
                                    <Image
                                        alt="example"
                                        src="/pizza.jpg"
                                    />
                                }
                                actions={[
                                    <Space>
                                        <Dropdown overlay={MenuL} placement="bottomLeft" arrow>
                                            <Button>Toppings
                                                <DownOutlined/>
                                            </Button>
                                        </Dropdown>
                                        <Button>Available:6</Button>
                                        <Button><EuroCircleOutlined />10 </Button>
                                    </Space>
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} >L</Avatar>}
                                    title="Large Pizza"
                                    description="You can choose 6 (except Tomato, Seafood = 2 toppings(Price increase 10%))"
                                />
                            </Card>
                        </Col>
                    </Space>
                </Row>
            </Fragment>
        )
    }
}
