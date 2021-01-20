'use strict';

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