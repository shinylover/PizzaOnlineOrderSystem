import React from 'react'
import moment from 'moment';
import { Fragment } from 'react'
import { Button, Space } from 'antd';

import ShopperOrdersControl from './shopperOrdersControl'

const ShopperOrderItem = (props) => {
    let {order, num, pizzas, putMakeOrdine, email, handleRerender} = props
    return (
        <Fragment>
            <tr key={order.oid}>
                <td>{num}</td>
                <td>{order.email}</td>
                <td>{moment(new Date(order.timestam)).format("YYYY-MM-DD HH:mm:ss")}</td>
                <td>{order.sum}</td>
                <td>{order.states===0? "Waiting for confirm" : order.states===1 ? "Delivering" :  order.states===2 ? "Need change orders": "Finished"}</td>
                <td>
                    <Space>
                        <ShopperOrdersControl
                        pizzas = {pizzas} 
                        order = {order} 
                        putMakeOrdine={putMakeOrdine}
                        email = {email}
                        handleRerender = { handleRerender}
                        />

                    </Space>
                </td>

            </tr>
        </Fragment>
    )
}

export default ShopperOrderItem;