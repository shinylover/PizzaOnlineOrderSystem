import React, { Component, Fragment } from 'react'
import { Drawer, Button, Col, Row, Select, InputNumber, Collapse, Slider, Space, Divider } from 'antd';
import { PlusOutlined, EuroCircleOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Option } = Select;

const { Panel } = Collapse;
const optionsS = [
    { label: 'Olives', value: 1, disabled: false, selected:0},
    { label: 'Ham', value: 1, disabled: false, selected:0},
    { label: 'Bacon', value: 1, disabled: false, selected:0 },
    { label: 'Mushrooms', value: 1, disabled: false, selected:0 },
    { label: 'Egg', value: 1, disabled: false, selected:0},
    { label: 'Artichokes', value: 1, disabled: false, selected:0 },
    { label: 'Chips', value: 1, disabled: false, selected:0},
    { label: 'Vegetables', value: 1, disabled: false, selected:0 },
    { label: 'Seafood', value: 2, disabled: true, selected:0 },
    { label: 'Tomato', value: 0, disabled: false, selected:0 }
  ]

export default class OrdersControl extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false,
            optionsS :[
                { label: 'Olives', value: 1, disabled: false, selected:0},
                { label: 'Ham', value: 1, disabled: false, selected:0},
                { label: 'Bacon', value: 1, disabled: false, selected:0 },
                { label: 'Mushrooms', value: 1, disabled: false, selected:0 },
                { label: 'Egg', value: 1, disabled: false, selected:0},
                { label: 'Artichokes', value: 1, disabled: false, selected:0 },
                { label: 'Chips', value: 1, disabled: false, selected:0},
                { label: 'Vegetables', value: 1, disabled: false, selected:0 },
                { label: 'Seafood', value: 2, disabled: true, selected:0 },
                { label: 'Tomato', value: 0, disabled: false, selected:0 }] ,
              optionsM :[
                { label: 'Olives', value: 1, disabled: false, selected:0},
                { label: 'Ham', value: 1, disabled: false, selected:0},
                { label: 'Bacon', value: 1, disabled: false, selected:0 },
                { label: 'Mushrooms', value: 1, disabled: false, selected:0 },
                { label: 'Egg', value: 1, disabled: false, selected:0},
                { label: 'Artichokes', value: 1, disabled: false, selected:0 },
                { label: 'Chips', value: 1, disabled: false, selected:0},
                { label: 'Vegetables', value: 1, disabled: false, selected:0 },
                { label: 'Seafood', value: 2, disabled: true, selected:0 },
                { label: 'Tomato', value: 0, disabled: false, selected:0 }
              ] ,
              optionsL :[
                { label: 'Olives', value: 1, disabled: false, selected:0},
                { label: 'Ham', value: 1, disabled: false, selected:0},
                { label: 'Bacon', value: 1, disabled: false, selected:0 },
                { label: 'Mushrooms', value: 1, disabled: false, selected:0 },
                { label: 'Egg', value: 1, disabled: false, selected:0},
                { label: 'Artichokes', value: 1, disabled: false, selected:0 },
                { label: 'Chips', value: 1, disabled: false, selected:0},
                { label: 'Vegetables', value: 1, disabled: false, selected:0 },
                { label: 'Seafood', value: 2, disabled: false, selected:0 },
                { label: 'Tomato', value: 0, disabled: false, selected:0 }
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
    
    selectToppings = (k)=>{
        // TODO: slected
        let arr = this.state.optionsS
        arr[k] = JSON.parse(JSON.stringify(arr[k]))
        arr[k].selected = '1'
        console.log(arr)
        this.setState({
            optionsS: arr
        })
        // for(let os of this.state.optionsS){
        //     if(s == os){
        //         os = JSON.parse(JSON.stringify(os))
        //         os.selected = 1
        //     }
        // }
        // this.componentDidMount()
    }
    // componentDidMount(){

    // }

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
                            <Divider dashed={true}/>
                            {this.state.optionsS.map((s, k) => {return <Col span={7}><Checkbox  onChange={this.selectToppings} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <Divider/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <Divider dashed={true}/>
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
                            <Divider/>
                            
                        </Row>
                          
                        {/* </Form> */}
               
                    </Panel >
                    <Panel  header="M size" key="2">
                        <Row gutter={16}>
                            <Col  span={24}>
                            Chose 3 toppings:
                            </Col>
                            <Divider dashed={true}/>
                            {this.state.optionsM.map((s) => {return <Col span={7}><Checkbox onChange={this.onChange} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <Divider/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <Divider dashed={true}/>
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
                            <Divider/>
                            
                        </Row>   
                    </Panel >
                    <Panel  header="L size" key="3">
                        <Row gutter={16}>
                            <Col  span={24}>
                            Chose 6 toppings:
                            </Col>
                            <Divider dashed={true}/>
                            {this.state.optionsL.map((s) => {return <Col span={7}><Checkbox onChange={this.onChange} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <Divider/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <Divider dashed={true}/>
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
                            <Divider/>
                            
                        </Row> 
                    </Panel >
                </Collapse>
                         
            </Drawer>
                
            </Fragment>
        )
    }
}
