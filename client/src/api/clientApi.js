const PizzasE = require('../entities/PizzasE')


const baseURL = "/clientApi"

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

async function putMakeOrdine(ordine) {
    return new Promise((resolve, reject) => {
        fetch(baseURL + "/makeOrdine", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ordine: ordine})
        }).then((response) => {
            if (response.ok) {
                resolve(response)
            } else {
                //
                console.log( "error:  putMakeOrdine(ordine)" )
                response.json()
                        .then( ( obj ) => {
                            reject( obj )
                        } )
                        .catch( ( err ) => {
                            reject( {
                                        errors: [ {
                                            err: err,
                                            param: "Application",
                                            msg: "MakeOrdine Cannot parse server response"
                                        } ]
                                    } )
                        } );
            }
        })
    })
}

// get all the orders of a client 
async function getOrders(email) {
    const response = await fetch(baseURL + '/getOrders/' + email)
    const ordersJson = await response.json()
    if (response.ok) {
        return ordersJson;
    } else {
        console.log( "error:  getOrders(email)" )
        response.json()
                .then( ( obj ) => {
                    return( obj )
                } )
                .catch( ( err ) => {
                    return( {
                                errors: [ {
                                    err: err,
                                    param: "Application",
                                    msg: "MakeOrdine Cannot parse server response"
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

const ClientApi ={
    getPizzaInfos,
    putMakeOrdine,
    getOrders,
    getBookings

}

export default ClientApi