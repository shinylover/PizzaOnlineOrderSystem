'use strict'

const db = require('../DB/OpenDB')

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

exports.getOrders = function (){
    return new Promise((resolve, reject) =>{
        let sql = `SELECT O.oid, O.ref_user, O.states, O.timestam, O.sum, U.email  FROM 
                            orders O,
                            user U
                            WHERE O.ref_user = U.uid`
        db.all(sql, [], (err, rows) =>{
            if(err){
                console.log('From shopperDao-----', err);
                reject(err)
            } else if(rows.length ==0 ){
                resolve(0)
            } else {
                resolve(rows)
            }
        })
    })
}

exports.getBookings = function (orderId) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM bookings WHERE ref_order = ?`
        db.all(sql, [orderId], (err, rows) => {
            if (err) {
                console.log('from shopperDao-- getBookings--',err)
                reject(-1)
            } else if (rows.length == 0){
                console.log('from shopperDao-- getBookings-- ', rows.length)
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
                console.log('from shopperDao-- changeStates--',err)
                reject(-1) 
            } else {
                resolve(1)
            }
        })
    })
}