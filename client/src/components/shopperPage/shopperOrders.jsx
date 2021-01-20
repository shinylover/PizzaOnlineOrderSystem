import React, { Component, Fragment } from 'react'

import ShopperApi from '../../api/shopperApi'
import ShopperOrderItem from './shopperOrderItem'


export default class ShopperOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      display: false,
      rerender: null
    }
  }

  // get all the orders 
  getOrders=()=> {
    ShopperApi.getOrders()
      .then((result) => {
        this.setState({
            orders: result
        })
      })
      .catch((err) => {
        this.setState({
          display: false
        })
          this.handleErrors(err)
      })
  }

  handleRerender=(value)=> {
    this.setState({
      rerender: value
    })
    window.location.reload(); 
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
  componentDidMount(){
    this.getOrders();
  }
    render() {
        return (
            // TODO: add authUser
            <Fragment>
                <table border="1" cellspacing="1000"  width="800">
                  <thead>
                    <tr>
                      
                      <th>Order Number</th>
                      <th>Client</th>
                      <th>Order Time</th>
                      <th>Price</th>
                      <th>States</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>

                      {this.state.display ? null: this.state.orders.map((o, key) =><ShopperOrderItem 
                                                          order ={o} 
                                                          num={key} 
                                                          pizzas={this.props.pizzas}
                                                          putMakeOrdine = {this.props.putMakeOrdine}
                                                          email = { this.props.email}
                                                          handleRerender = {this.handleRerender}
                                                          />)}
                    
                    
                  </tbody>
                </table>
                
            </Fragment>
        )
    }
}
