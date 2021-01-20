import React, { Component, Fragment } from 'react'
import { Drawer, Button, Col, Row, InputNumber, Collapse, Slider, Space, Divider } from 'antd';
import {EuroCircleOutlined} from '@ant-design/icons';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import moment from 'moment'

import ClientApi from '../../api/clientApi'

const { Panel } = Collapse;
var sumForSamll =0
var sumForMiddle = 0
var sumForLarge =0

export default class OrdersControlForTable extends Component {
    constructor(props) {
        super(props)
        this.state = { visible: false,
            optionsS :[
                { label: 'olives', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'ham', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'bacon', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'mushrooms', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'egg', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'artichokes', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'chips', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'vegetables', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'seafood', value: 2, disabled: true, selected:0, defaultChecked: false },
                { label: 'tomato', value: 0, disabled: false, selected:0 , defaultChecked: false}] ,
              optionsM :[
                { label: 'olives', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'ham', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'bacon', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'mushrooms', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'egg', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'artichokes', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'chips', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'vegetables', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'seafood', value: 2, disabled: true, selected:0, defaultChecked: false },
                { label: 'tomato', value: 0, disabled: false, selected:0, defaultChecked: false }
              ] ,
              optionsL :[
                { label: 'olives', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'ham', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'bacon', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'mushrooms', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'egg', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'artichokes', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'chips', value: 1, disabled: false, selected:0, defaultChecked: false},
                { label: 'vegetables', value: 1, disabled: false, selected:0, defaultChecked: false },
                { label: 'seafood', value: 2, disabled: false, selected:0, defaultChecked: false },
                { label: 'tomato', value: 0, disabled: false, selected:0, defaultChecked: false }
              ] ,
              ordine: {
                  order: null,
                  bookings: []
              },
              inputValueForS: 0,
              inputValueForM: 0,
              inputValueForL: 0,
              price: 0,
              bookings: [],
              maxNumForS: 10,
              maxNumForM: 8,
              maxNumForL: 6,
            };
    }
    state = { visible: false };

    makeOrdine = () => {
        let order = this.state.ordine.order
        let bookings = this.state.ordine.bookings
        let timeNow = moment().valueOf()
        order = {
            email: this.props.email,
            timestam: timeNow,
            states: 0,
            sum: this.state.price
        }
        let num =0 
        if (this.state.inputValueForS !==0){
            bookings[num] = {
                ref_pizza: 1,
                olives: this.state.optionsS[0].selected,
                ham: this.state.optionsS[1].selected,
                bacon: this.state.optionsS[2].selected,
                mushrooms: this.state.optionsS[3].selected,
                eggs: this.state.optionsS[4].selected,
                artichokes: this.state.optionsS[5].selected,
                seafood: this.state.optionsS[6].selected,
                chips: this.state.optionsS[7].selected,
                vegetables: this.state.optionsS[8].selected,
                tomato: this.state.optionsS[9].selected,
                availnum: this.props.pizzas[0].available,
                numpizza: this.state.inputValueForS,
                cost: 0
            }
            num = num + 1
        }
        if (this.state.inputValueForM !==0){
            bookings[num] = {
                ref_pizza: 1,
                olives: this.state.optionsM[0].selected,
                ham: this.state.optionsM[1].selected,
                bacon: this.state.optionsM[2].selected,
                mushrooms: this.state.optionsM[3].selected,
                eggs: this.state.optionsM[4].selected,
                artichokes: this.state.optionsM[5].selected,
                seafood: this.state.optionsM[6].selected,
                chips: this.state.optionsM[7].selected,
                vegetables: this.state.optionsM[8].selected,
                tomato: this.state.optionsM[9].selected,
                availnum: this.props.pizzas[1].available,
                numpizza: this.state.inputValueForM,
                cost: 0
            }
            num = num + 1
        }
        if (this.state.inputValueForL !==0) {
            bookings[num] = {
                ref_pizza: 1,
                olives: this.state.optionsL[0].selected,
                ham: this.state.optionsL[1].selected,
                bacon: this.state.optionsL[2].selected,
                mushrooms: this.state.optionsL[3].selected,
                eggs: this.state.optionsL[4].selected,
                artichokes: this.state.optionsL[5].selected,
                seafood: this.state.optionsL[6].selected,
                chips: this.state.optionsL[7].selected,
                vegetables: this.state.optionsL[8].selected,
                tomato: this.state.optionsL[9].selected,
                availnum: this.props.pizzas[2].available,
                numpizza: this.state.inputValueForL,
                cost: 0
            }
            num = num + 1
        }
        let count = 0 
        let countCostrian = 0
        for(let booking of bookings) {
            if(booking.ref_pizza === 1){
                const _options = this.state.optionsS
                countCostrian = countCostrian + 2 * booking.numpizza
                _options.map((s) => {
                    if(s.selected===1){
                        count = count + s.value * booking.numpizza
                    }
                })
            }
            if(booking.ref_pizza === 2){
                const _options = this.state.optionsM
                countCostrian = countCostrian + 3 * booking.numpizza
                _options.map((s) => {
                    if(s.selected===1){
                        count = count + s.value * booking.numpizza
                    }
                })
            }
            if(booking.ref_pizza === 3){
                const _options = this.state.optionsL
                countCostrian = countCostrian + 6 * booking.numpizza
                _options.map((s) => {
                    if(s.selected===1){
                        count = count + s.value * booking.numpizza
                    }
                })
            }
        }
        if( count !== countCostrian){
            alert('Please choose all of your toppings')
        } else{
            this.setState({
                ordine : {
                    order: order,
                    bookings: bookings
                },
                visible: false
            },()=>{
                this.changeStates()
                return this.props.putMakeOrdine(this.state.ordine)
            })
        }
    }

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
        let arr = this.state.optionsS
        arr[k] = JSON.parse(JSON.stringify(arr[k]))
        arr[k].selected = '1'
        console.log(arr)
        this.setState({
            optionsS: arr
        })
    }

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

    getBookings = ()=>{
        ClientApi.getBookings(this.props.order.oid)
            .then((bookings) => {
                this.setState({
                    bookings: bookings
                }, ()=>{
                    if(this.props.order.states===3 || this.props.order.states===2)
                    this.updateOptions()
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    changeStates = () => {
        ClientApi.changeStates(this.props.order.oid, 3)
            .then((response) => {
                // TODO: delete
                // alert('changeStates'+ response)
            })
            .catch((err) => {
                alert(err)
            })
    }

    updateOptions = ()=> {
        const {bookings, optionsL, optionsM, optionsS} = this.state;
        if(this.props.order.states>=2){
            this.setState({
                price: this.props.order.sum
            })
        }
        for(let booking of bookings){
            if(booking.ref_pizza === 1){
                const _options = optionsS
                if(booking.olives===1){
                    _options[0].selected = 1
                    _options[0].defaultChecked = true
                } if(booking.ham===1){
                    _options[1].selected = 1
                    _options[1].defaultChecked = true
                }if(booking.bacon===1){
                    _options[2].selected = 1
                    _options[2].defaultChecked = true
                }if(booking.mushrooms===1){
                    _options[3].selected = 1
                    _options[3].defaultChecked = true
                }if(booking.egg===1){
                    _options[4].selected = 1
                    _options[4].defaultChecked = true
                }if(booking.artichokes===1){
                    _options[5].selected = 1
                    _options[5].defaultChecked = true
                }if(booking.chips===1){
                    _options[6].selected = 1
                    _options[6].defaultChecked = true
                }if(booking.vegetables===1){
                    _options[7].selected = 1
                    _options[7].defaultChecked = true
                }if(booking.seafood===1){
                    _options[8].selected = 1
                    _options[8].defaultChecked = true
                }if(booking.tomato===1){
                    _options[9].selected = 1
                    _options[9].defaultChecked = true
                }
                // alert(_options[3].selected, _options[3].defaultChecked)
                console.log('----------------',_options[3].selected, _options[3].defaultChecked);
                this.setState({
                    optionsS: [..._options],
                    inputValueForS: booking.numpizza,
                    maxNumForS: booking.available
                })
            } else if(booking.ref_pizza === 2){
                const _options = optionsM
                if(booking.olives===1){
                    _options[0].selected = 1
                    _options[0].defaultChecked = true
                } if(booking.ham===1){
                    _options[1].selected = 1
                    _options[1].defaultChecked = true
                }if(booking.bacon===1){
                    _options[2].selected = 1
                    _options[2].defaultChecked = true
                }if(booking.mushrooms===1){
                    _options[3].selected = 1
                    _options[3].defaultChecked = true
                }if(booking.egg===1){
                    _options[4].selected = 1
                    _options[4].defaultChecked = true
                }if(booking.artichokes===1){
                    _options[5].selected = 1
                    _options[5].defaultChecked = true
                }if(booking.chips===1){
                    _options[6].selected = 1
                    _options[6].defaultChecked = true
                }if(booking.vegetables===1){
                    _options[7].selected = 1
                    _options[7].defaultChecked = true
                }if(booking.seafood===1){
                    _options[8].selected = 1
                    _options[8].defaultChecked = true
                }if(booking.tomato===1){
                    _options[9].selected = 1
                    _options[9].defaultChecked = true
                }
                this.setState({
                    optionsM:[..._options],
                    inputValueForM: booking.numpizza,
                    maxNumForM: booking.available
                })

            } else if(booking.ref_pizza === 3){
                const _options = optionsL
                if(booking.olives===1){
                    _options[0].selected = 1
                    _options[0].defaultChecked = true
                } if(booking.ham===1){
                    _options[1].selected = 1
                    _options[1].defaultChecked = true
                }if(booking.bacon===1){
                    _options[2].selected = 1
                    _options[2].defaultChecked = true
                }if(booking.mushrooms===1){
                    _options[3].selected = 1
                    _options[3].defaultChecked = true
                }if(booking.egg===1){
                    _options[4].selected = 1
                    _options[4].defaultChecked = true
                }if(booking.artichokes===1){
                    _options[5].selected = 1
                    _options[5].defaultChecked = true
                }if(booking.chips===1){
                    _options[6].selected = 1
                    _options[6].defaultChecked = true
                }if(booking.vegetables===1){
                    _options[7].selected = 1
                    _options[7].defaultChecked = true
                }if(booking.seafood===1){
                    _options[8].selected = 1
                    _options[8].defaultChecked = true
                }if(booking.tomato===1){
                    _options[9].selected = 1
                    _options[9].defaultChecked = true
                }
                
                this.setState({
                    optionsL:[..._options],
                    inputValueForL: booking.numpizza,
                    maxNumForL: booking.available
                })
            }
        }
    }

    componentDidMount(){
        this.getBookings()
        
    }

    render() {
        const { inputValueForS, inputValueForM, inputValueForL, maxNumForS, maxNumForM, maxNumForL } = this.state;
        const {order } = this.props;
        return (
            // <AuthContext.Consumer>
            //     <Fragment>
                    // {(context)=>

                        <Fragment>
                        <Button type="primary" onClick={this.showDrawer}
                         disabled={order.states >=2 ? false: true}
                         >
                            {order.states===0? "Waiting" : order.states===1 ? "Delivering" :  order.states===2 ? "Edit": "Details"}
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
                                    <Button onClick={this.makeOrdine} disabled={order.states===3 ? true: false} type="primary">
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
                                    {this.state.optionsS.map((s,kForSmall) => {return <Col span={7}><Checkbox 
                                                                                                    onChange={this.onChangeCheckBox.bind(this, kForSmall)} 
                                                                                                    disabled={s.disabled}
                                                                                                    defaultChecked={s.defaultChecked}
                                                                                                    >{s.label}</Checkbox></Col>})}
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
                                            max={order.states===2? this.props.pizzas[0].available: maxNumForS}
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
                                    {this.state.optionsM.map((s,kForMiddle) => {return <Col span={7}><Checkbox 
                                                                                                    onChange={this.onChangeCheckBoxForM.bind(this, kForMiddle)} 
                                                                                                    disabled={s.disabled}
                                                                                                    defaultChecked={s.defaultChecked}
                                                                                                    >{s.label}</Checkbox></Col>})}
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
                                            max={order.states===2? this.props.pizzas[1].available: maxNumForM}
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
                                    {this.state.optionsL.map((s,kForLarge) => {return <Col span={7}><Checkbox 
                                                                                                    onChange={this.onChangeCheckBoxForL.bind(this, kForLarge)} 
                                                                                                    disabled={s.disabled}
                                                                                                    defaultChecked={s.defaultChecked}
                                                                                                    >{s.label}</Checkbox></Col>})}
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
                                            max={order.states===2? this.props.pizzas[2].available: maxNumForL}
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
                    
            //         // }
            //     {/* </Fragment>
            // </AuthContext.Consumer> */}
        )
    }
}

