const baseURL = "/shopperApi"

async function getPizzaInfos() {
    const response = await fetch(baseURL + "/getPizzaInfos")
    const pizzasJson = await response.json()
    if (response.ok) {
        // return pizzasJson.map((p)=> new PizzasE( p.pid, p.size, p.price, p.numbers, p.maxnum, p.available))
        return pizzasJson
    } else {
        throw('response err, at function getPizzaInfo in clientApi file')
    }
}

async function getOrders() {
    const response = await fetch(baseURL + "/getOrders")
    const ordersJson = await response.json()
    if (response.ok) {
        return ordersJson;
    } else {
        console.log( "error:  getOrders()" )
        response.json()
                .then( ( obj ) => {
                    return( obj )
                } )
                .catch( ( err ) => {
                    return( {
                                errors: [ {
                                    err: err,
                                    param: "Application",
                                    msg: "getOrders() Cannot parse server response"
                                } ]
                            } )
                } );
    }
}

async function getBookings(orderId) {
    const response = await fetch(baseURL +'/getBookings/' + orderId)
    const bookingsJson = await response.json()
    if (response.ok) {
        return bookingsJson;
    } else {
        console.log( "error:  getBookings(orderId)" )
        response.json()
                .then( ( obj ) => {
                    return( obj )
                } )
                .catch( ( err ) => {
                    return( {
                                errors: [ {
                                    err: err,
                                    param: "Application",
                                    msg: "getBookings(orderId) Cannot parse server response"
                                } ]
                            } )
                } );
    }
}

async function changeStates(orderId, states) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + '/changeStates/' + orderId, {
            method: 'POST',
           headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( {
                orderId: orderId,
                states: states
                                   } ) 
        }).then((response) => {
            if (response.ok) {
                resolve(response)
            } else {
                //
                console.log( "error:  changeStates(orderId)" )
                response.json()
                        .then( ( obj ) => {
                            reject( obj )
                        } )
                        .catch( ( err ) => {
                            reject( {
                                        errors: [ {
                                            err: err,
                                            param: "Application",
                                            msg: "changeStates(orderId) Cannot parse server response"
                                        } ]
                                    } )
                        } );
            }
        })
    })
}


const ShopperApi ={
    getOrders,
    getBookings,
    getPizzaInfos,
    changeStates

}

export default ShopperApi