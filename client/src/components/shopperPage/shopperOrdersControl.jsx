import React, { Component, Fragment } from 'react'
import { Drawer, Button, Col, Row, Select, InputNumber, Collapse, Slider, Space} from 'antd';
import { PlusOutlined, EuroCircleOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Option } = Select;

const { Panel } = Collapse;

const optionsS = [
    { label: 'Olives', value: 1, disabled: false },
    { label: 'Ham', value: 1, disabled: false},
    { label: 'Bacon', value: 1, disabled: false },
    { label: 'Mushrooms', value: 1, disabled: false },
    { label: 'Egg', value: 1, disabled: false},
    { label: 'Artichokes', value: 1, disabled: false },
    { label: 'Chips', value: 1, disabled: false},
    { label: 'Vegetables', value: 1, disabled: false },
    { label: 'Seafood', value: 2, disabled: true },
    { label: 'Tomato', value: 0, disabled: false }
  ]

const optionsM = [
    { label: 'Olives', value: 1, disabled: false },
    { label: 'Ham', value: 1, disabled: false},
    { label: 'Bacon', value: 1, disabled: false },
    { label: 'Mushrooms', value: 1, disabled: false },
    { label: 'Egg', value: 1, disabled: false},
    { label: 'Artichokes', value: 1, disabled: false },
    { label: 'Chips', value: 1, disabled: false},
    { label: 'Vegetables', value: 1, disabled: false },
    { label: 'Seafood', value: 2, disabled: true },
    { label: 'Tomato', value: 0, disabled: false }
  ]

const optionsL = [
    { label: 'Olives', value: 1, disabled: false },
    { label: 'Ham', value: 1, disabled: false},
    { label: 'Bacon', value: 1, disabled: false },
    { label: 'Mushrooms', value: 1, disabled: false },
    { label: 'Egg', value: 1, disabled: false},
    { label: 'Artichokes', value: 1, disabled: false },
    { label: 'Chips', value: 1, disabled: false},
    { label: 'Vegetables', value: 1, disabled: false },
    { label: 'Seafood', value: 2, disabled: false },
    { label: 'Tomato', value: 0, disabled: false }
  ]

export default class ShopperOrdersControl extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false,
            optionsS :[
                { label: 'Olives', value: 1, disabled: false },
                { label: 'Ham', value: 1, disabled: false},
                { label: 'Bacon', value: 1, disabled: false },
                { label: 'Mushrooms', value: 1, disabled: false },
                { label: 'Egg', value: 1, disabled: false},
                { label: 'Artichokes', value: 1, disabled: false },
                { label: 'Chips', value: 1, disabled: false},
                { label: 'Vegetables', value: 1, disabled: false },
                { label: 'Seafood', value: 2, disabled: true },
                { label: 'Tomato', value: 0, disabled: false }
              ] ,
              inputValue: 1,
              price: 4,
            };
    }
    state = { visible: false };

    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
          visible: false,
        });
    }

    callback =(key)=> {
        console.log(key);
      }

    onChangeSlider = value => {
        this.setState({
          inputValue: value,
        });
      };

    render() {
        const { inputValue } = this.state;
        return (
            <Fragment>
                <Button type="primary" onClick={this.showDrawer}>
                    <PlusOutlined /> Order Now!
                </Button>
            <Drawer
                title="Create A New Order"
                width={600}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                    style={{
                        textAlign: 'right',
                    }}
                    >    
                        <Space >
                            <Button type="dashed" block>
                                <EuroCircleOutlined />
                                Price:
                                {this.state.price}
                            </Button>
                            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                                Cancel
                            </Button>
                            <Button onClick={this.onClose} type="primary">
                                Submit
                            </Button>
                        </Space>
                    </div>
                }
            >
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                    <Panel  header="S size" key="1">
                        <Row gutter={16}> 
                            <Col  span={24}>
                            Choose 2 toppings:
                            </Col>
                            <br/>
                            <br/>
                            {optionsS.map((s) => {return <Col span={7}><Checkbox onChange={this.onChange} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <br/>
                            <br/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <br/>
                            <br/>
                            <Col span={12}>
                                <Slider min={1} max={20} onChange={this.onChangeSlider} value={typeof inputValue === 'number' ? inputValue : 0} />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={20}
                                    style={{ margin: '0 16px' }}
                                    value={inputValue}
                                    onChange={this.onChangeSlider}
                                />
                            </Col>
                            
                        </Row>
                          
                        {/* </Form> */}
               
                    </Panel >
                    <Panel  header="M size" key="2">
                        <Row gutter={16}>
                            <Col  span={24}>
                            Chose 3 toppings:
                            </Col>
                            <br/>
                            <br/>
                            {optionsM.map((s) => {return <Col span={7}><Checkbox onChange={this.onChange} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <br/>
                            <br/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <br/>
                            <br/>
                            <Col span={12}>
                                <Slider min={1} max={20} onChange={this.onChangeSlider} value={typeof inputValue === 'number' ? inputValue : 0} />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={20}
                                    style={{ margin: '0 16px' }}
                                    value={inputValue}
                                    onChange={this.onChangeSlider}
                                />
                            </Col>
                            
                        </Row>   
                    </Panel >
                    <Panel  header="L size" key="3">
                        <Row gutter={16}>
                            <Col  span={24}>
                            Chose 6 toppings:
                            </Col>
                            <br/>
                            <br/>
                            {optionsL.map((s) => {return <Col span={7}><Checkbox onChange={this.onChange} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <br/>
                            <br/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <br/>
                            <br/>
                            <Col span={12}>
                                <Slider min={1} max={20} onChange={this.onChangeSlider} value={typeof inputValue === 'number' ? inputValue : 0} />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={20}
                                    style={{ margin: '0 16px' }}
                                    value={inputValue}
                                    onChange={this.onChangeSlider}
                                />
                            </Col>
                            
                        </Row> 
                    </Panel >
                </Collapse>
                         
            </Drawer>
                
            </Fragment>
        )
    }
}
