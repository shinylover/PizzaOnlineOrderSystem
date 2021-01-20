'use strict';

const db = require('../DB/OpenDB')
const User = require('./user')
const bcrypt = require('bcrypt')

exports.getUserByEmail = function (email1) {
    console.log('email----------', email1);
    let email = 'client1@gmail.com'
    console.log('---------loginDao32----', email);
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM user WHERE email = ?`
        db.get(sql, [email1], (err, row) => {
            if( err ) {
                reject(err)
            } else if (row) {
                let user = new User(row.uid, row.email, row.password, row.type)
                console.log('------------- loginDao17---user',user)
                resolve(user)
            } else {
                resolve(undefined)
            }
        })
    })
}

exports.getUserById = function (id) { 
    return new Promise( (resolve, reject) => {
        let sql = `SELECT * FROM user WHERE uid = ${id}`
        db.get(sql, [], (err, row) => {
            if(err) {
                reject(err)
            } else if (row){
                let user = new User(row.id, row.email, row.password, row.type)
                resolve(row)
            } else {
                resolve(undefined)
            }
        })
    })
}

exports.checkPassword = function(user, password){
    console.log("hash of: " + password);
    let hash = bcrypt.hashSync(password, 10);
    console.log(hash);
    console.log("DONE");

    return bcrypt.compareSync(password, user.hash);
}