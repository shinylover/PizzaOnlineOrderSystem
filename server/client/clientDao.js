'use strict';

const { resume } = require('npmlog');
const db = require('../DB/OpenDB')

const getUserId = function (email) {
    let sql = `SELECT uid FROM user WHERE email = ?`
    db.get(sql, [email], (err, row)=> {
        if (err) {
            return -1
        } else {
            console.log('------row-----', row.uid);
            return row.uid
        }
    })
}

exports.getAvailableNums = function (){
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM pizza`
        db.all(sql, [], (err, rows) => {
            if (err) { 
                console.log('------', err);
                reject(err)
            } else if (rows.length>=1){
                resolve(rows)
            } else {
                reject(0)
            }
        })
    })
}

// make a ordine in table bookings and orders  
exports.makeOrdine = function (body) {
    return new Promise( (resolve, reject) => {
        const order = body.ordine.order
        const bookings = body.ordine.bookings
        
        let findIdSql = `SELECT uid FROM user WHERE email = ?`
        db.get(findIdSql, [order.email], (err, row) => {
            if (err) {
                console.log(err);
                reject(-1)
            } else {
                
                const id = row.uid
                let makeOrder = `INSERT INTO orders (ref_user, timestam, states, sum) VALUES (?, ?, ?, ?)`
                db.run(makeOrder, [id, order.timestam, order.states, order.sum], (err2) => {
                    if (err2) {
                        console.log(err2);
                        reject(-2) }
                })
                let findRef_orderSql =`SELECT oid FROM orders WHERE ref_user =? AND timestam = ?`
                db.get(findRef_orderSql, [id, order.timestam], (err3, orderRow) => {
                    if (err3) {
                        console.log(err3);
                        reject(-3)
                    } else {
                        const ref_order = orderRow.oid
                        let makeBookingSql = `INSERT INTO bookings 
                                            (ref_order, ref_pizza, olives,
                                             ham, bacon, mushrooms, eggs, 
                                             artichokes, seafood, chips,
                                             vegetables, tomato, availnum,
                                             numpizza, cost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                        for( let booking of bookings ) {
                            console.log('------------booking.ref_pizza', booking.ref_pizza);
                            db.run(makeBookingSql, [ref_order, booking.ref_pizza, booking.olives,
                                            booking.ham, booking.bacon, booking.mushrooms, booking.eggs,
                                            booking.artichokes, booking.seafood, booking. chips,
                                            booking.vegetables, booking.tomato, booking.availnum,
                                            booking.numpizza, 0], (err4) => {
                                                if( err4) {
                                                    console.log('-------err4', err4);
                                                    reject(-4)
                                                }
                                            } )
                            // let availableNum = 
                            const pid = booking.ref_pizza
                            let getNum = `SELECT available FROM pizza WHERE pid = ?`
                            db.get(getNum, [pid], (err5, row5) => {
                                if(err5){
                                    console.log('-------err5', err5);
                                    reject(-5)
                                } else {
                                    let availableNum = row5.available - booking.numpizza
                                    let updatePizza = `UPDATE pizza SET available = ? WHERE pid = ?`
                                    db.run(updatePizza, [availableNum, pid], (err6) =>{
                                        if (err6) {
                                            console.log('-------err6', err6);
                                            reject(-6)
                                        }
                                    })
                                }
                            })
                        }
                        resolve(1)
                    }
                })
            }
        })
    })
}

// get all the orders of a client 
exports.getOrders = function(email) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT uid FROM user WHERE email = ?`
        db.get(sql, [email], (err, row)=> {
        if (err) {
            reject(-1)
        } else {
            // console.log('------row-----', row.uid);
            let ref_user =  row.uid
            if(ref_user != -1) {
                let sql = `SELECT * FROM orders WHERE ref_user = ?`
                db.all(sql, [ref_user], (err1, rows) => {
                    if(err1) {
                        console.log('from clientDao----', err1);
                        reject(-1)
                    } else if (rows.length == 0){
                        // console.log('from clientDao ', rows.length)
                        resolve(0)
                    } else {
                        // console.log('from clientDao ', rows)
                        resolve(rows)
                    }
                })
            } else {
                console.log('Email problem ');
                reject (-2)
            }
        }
    })

    })
}


exports.getBookings = function (orderId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM bookings WHERE ref_order = ?`
        db.all(sql, [orderId], (err, rows) => {
            if (err) {
                console.log('from clientDao-- getBookings--',err)
                reject(-1)
            } else if (rows.length == 0){
                console.log('from clientDao-- getBookings-- ', rows.length)
                reject(0)
            } else {
                // console.log('from clientDao-- getBookings-- ', rows)
                resolve(rows)
            }
        })
    })
}

exports.changeStates = function (orderId, states) {
    return new Promise( (resolve, reject) => {
        let sql = `UPDATE orders SET states = ? WHERE oid = ?`
        db.run(sql, [states, orderId], (err) => {
            if (err){
                console.log('from clientDao-- changeStates--',err)
                reject(-1) 
            } else {
                resolve(1)
            }
        })
    })
}