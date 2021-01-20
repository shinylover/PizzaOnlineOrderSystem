import React from 'react'
import moment from 'moment';
import { Fragment } from 'react'

import OrdersControlForTable from './ordersControlForTable'

const OrderItem = (props) => {
    let {order, num, pizzas} = props
    return (
        <Fragment>
            <tr key={order.oid}>
                <td>{num}</td>
                <td>{moment(new Date(order.timestam)).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>{order.states===0? "Waiting for confirm" : order.states===1 ? "Delivering" :  order.states===2 ? "Need change orders": "Finished"}</td>
                <td><OrdersControlForTable pizzas = {pizzas} order = {order}/></td>

            </tr>
        </Fragment>
    )
}

export default OrderItem;