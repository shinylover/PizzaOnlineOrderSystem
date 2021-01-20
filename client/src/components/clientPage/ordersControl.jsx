import React, { Component, Fragment } from 'react'
import { Drawer, Button, Col, Row, InputNumber, Collapse, Slider, Space, Divider } from 'antd';
import { PlusOutlined, EuroCircleOutlined } from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { Panel } = Collapse;
var sumForSamll =0
var sumForMiddle = 0
var sumForLarge =0

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
              inputValueForS: 0,
              inputValueForM: 0,
              inputValueForL: 0,
              price: 0,
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

    onChangeSliderForS = value => {
        
        this.setState({
          inputValueForS: value,
        }, ()=>{
            this.costToal()
        });
      };

    onChangeSliderForM = value => {
        this.setState({
          inputValueForM: value,
        }, ()=>{
            this.costToal()
        });
      };

    onChangeSliderForL = value => {
        this.setState({
          inputValueForL: value,
        }, ()=>{
            this.costToal()
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
    }
    // componentDidMount(){

    // }

    onChangeCheckBoxForM =(key)=>{
        const _options = this.state.optionsM
        let num = 0
        console.log('before equal sumForMiddle',sumForMiddle);
        if(_options[key].selected === 0){
            num =1
            sumForMiddle = sumForMiddle +_options[key].value
            console.log('sumForMiddle',sumForMiddle, '  num', num);
        } 
        else {
            num = 0
            sumForMiddle = sumForMiddle -_options[key].value
        }
        _options[key] = {
            ..._options[key], selected: num
        }
        console.log('-------',sumForMiddle);
        if(sumForMiddle >= 3){
            _options.map((s)=>{
                if(s.selected !== 1 && s.value !==0 ){
                    s.disabled = true
                }
                return 0
            })
        } else {
            _options.map((s)=>{
                
                if(s.value !==0 && s.value !==2) s.disabled = false
                return 0
            })
            return 0
        }
        this.setState({
            optionsM:[..._options]
        })
    }

    onChangeCheckBoxForL =(key)=>{
        const _options = this.state.optionsL
        var num = 0
        console.log('++++++',key);
        if(_options[key].selected === 0){
            num =1
            sumForLarge = sumForLarge +_options[key].value
        } 
        else {
            num = 0
            sumForLarge = sumForLarge -_options[key].value
        }
        _options[key] = {
            ..._options[key], selected: num
        }
        console.log('-------',sumForLarge);
        if(sumForLarge === 5 && _options[8].selected === 0){
            _options.map((s)=>{    
                if(s.value !==0) s.disabled = false  
                return 0
            })
            _options[8].disabled = true
        }else if(sumForLarge === 6 ){
            _options.map((s)=>{
                if(s.selected !== 1 && s.value !== 0 ){
                    s.disabled = true
                }
                return 0
            })
        } else {
            _options.map((s)=>{
                
                if(s.value !== 0) s.disabled = false
                return 0
                
            })
        }
        this.setState({
            optionsL:[..._options]
        })
    }

    onChangeCheckBox =(key)=>{
        const _options = this.state.optionsS
        var num = 0
        console.log('sumForSamll',sumForSamll);
        if(_options[key].selected === 0){
            num =1
            sumForSamll = sumForSamll +_options[key].value
        } 
        else {
            num = 0
            sumForSamll = sumForSamll -_options[key].value
        }
        _options[key] = {
            ..._options[key], selected: num
        }
        console.log('-------',sumForSamll);
        if(sumForSamll >= 2){
            _options.map((s)=>{
                if(s.selected !== 1 && s.value !==0 ){
                    s.disabled = true
                }
                return 0
            })
        } else {
            _options.map((s)=>{
                
                if(s.value !== 0 && s.value !== 2) s.disabled = false
                return 0
            })
        }

        this.setState({
            optionsS:[..._options]
        })
    }

    costToal=()=>{
        const {inputValueForS, inputValueForM, inputValueForL, optionsL} = this.state
        const priceForS = this.props.pizzas[0].price
        const priceForM = this.props.pizzas[1].price
        const priceForL = this.props.pizzas[2].price
        var costForS = 0
        var costForM = 0
        var costForL = 0
        var totalCost = 0
        var orderNum = inputValueForS + inputValueForM + inputValueForL
        if(inputValueForS !==0 ){
            costForS = inputValueForS*priceForS
        } 
        if(inputValueForM !==0 ){
            costForM = inputValueForM*priceForM
        }
        if (inputValueForL !==0 ){
            if(optionsL[8].selected === 1){
                costForL = inputValueForL*priceForL*1.1
            } else{
                costForL = inputValueForL*priceForL
            }
        }
        if (orderNum >=3) {
            totalCost = (costForS + costForM + costForL)*0.9
        } else {
            totalCost = costForS + costForM + costForL
        }
        console.log('totalCost: ', totalCost);
        this.setState({
            price: totalCost
        })
    }

    // componentDidUpdate(){
    //     this.costToal()
    //     console.log('I am just a didMount Test');
    // }

    // shouldComponentUpdate(){
    //     this.costToal()
    //     console.log('I am just a didMount Test');
    //     return true
        
    // }

    render() {
        const { inputValueForS, inputValueForM, inputValueForL } = this.state;
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
                                Cost:
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
                            <Divider/>
                            {this.state.optionsS.map((s,kForSmall) => {return <Col span={7}><Checkbox onChange={this.onChangeCheckBox.bind(this, kForSmall)} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <Divider/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <Divider dashed={true}/>
                            <Col span={12}>
                                <Slider min={0} max={this.props.pizzas[0].available} onChange={this.onChangeSliderForS} value={typeof inputValueForS === 'number' ? inputValueForS : 0} />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={this.props.pizzas[0].available}
                                    style={{ margin: '0 16px' }}
                                    value={inputValueForS}
                                    onChange={this.onChangeSliderForS}
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
                            {this.state.optionsM.map((s,kForMiddle) => {return <Col span={7}><Checkbox onChange={this.onChangeCheckBoxForM.bind(this, kForMiddle)} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <Divider/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <Divider dashed={true}/>
                            <Col span={12}>
                                <Slider min={0} max={this.props.pizzas[1].available} onChange={this.onChangeSliderForM} value={typeof inputValueForM === 'number' ? inputValueForM : 0} />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={this.props.pizzas[1].available}
                                    style={{ margin: '0 16px' }}
                                    value={inputValueForM}
                                    onChange={this.onChangeSliderForM}
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
                            {this.state.optionsL.map((s,kForLarge) => {return <Col span={7}><Checkbox onChange={this.onChangeCheckBoxForL.bind(this, kForLarge)} disabled={s.disabled}>{s.label}</Checkbox></Col>})}
                            <Divider/>
                            <Col  span={24}>
                            Pizza number:
                            </Col>
                            <Divider dashed={true}/>
                            <Col span={12}>
                                <Slider min={0} max={this.props.pizzas[2].available} onChange={this.onChangeSliderForL} value={typeof inputValueForL === 'number' ? inputValueForL : 0} />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={0}
                                    max={this.props.pizzas[2].available}
                                    style={{ margin: '0 16px' }}
                                    value={inputValueForL}
                                    onChange={this.onChangeSliderForL}
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
