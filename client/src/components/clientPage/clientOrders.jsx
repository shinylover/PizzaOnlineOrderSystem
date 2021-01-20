import React, { Component, Fragment } from 'react'


import ClientApi from '../../api/clientApi'
import OrderItem from './orderItem';

  // const columns = [
  //   {
  //     title: 'Order Number',
  //     dataIndex: 'oid',
  //     // key: 'name',
  //     // render: text => <a>{text}</a>,
  //   },
  //   {
  //     title: 'Order Time',
  //     dataIndex: 'timestam'
  //   },
  //   {
  //     title: 'Actions',
  //     key: 'action',
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <a>Invite {record.name}</a>
  //         {/* <OrdersControl /> */}
  //       </Space>
  //     ),
  //   },
  // ];

export default class ClientOrders extends Component {
    constructor(props) {
      super(props);
      this.state = {
        orders: [],
        bookings:[],
        display: true
      }
    }

    // get all the orders of a client 
  getOrders = () => {
    ClientApi.getOrders(this.props.email)
        .then((result) => {
            this.setState({
                orders: result
            }, ()=> {
              for(let order of this.state.orders) {
                if(order.states === 1){
                  alert('Dear Client: '+ this.props.email +' There is on of your pizza is Delivering, Please ready to collect it')
                }
              }
            })
        })
        .catch((err) => {
          // alert(this.state.orders[0])
          this.setState({
            display: false
          })
          // alert(2222)
            this.handleErrors(err)
        })
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
    this.timeId = setInterval(() => {
      this.getOrders()
  }, 5000)
  }
    render() {
        return (
            
            <Fragment>
                {/* <Table columns={columns} 
                dataSource={this.state.orders}
                // onRow = { (record) => ({
                //   onClick: () => <OrdersControl/>
                // })} 
                /> */}
                <table border="1" cellspacing="1000"  width="800">
                  <thead>
                    <tr>
                      
                      <th>Order Number</th>
                      <th>Order Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                      
                      
                    </tr>
                  </thead>
                  <tbody>

                      {this.state.orders[0] !== undefined?  this.state.orders.map((o, key) =><OrderItem 
                                                          order ={o} 
                                                          num={key} 
                                                          pizzas={this.props.pizzas}
                                                          putMakeOrdine = {this.props.putMakeOrdine}
                                                          email = { this.props.email}
                                                          />): null}
                    
                    
                  </tbody>
                </table>
            </Fragment>
        )
    }
}
