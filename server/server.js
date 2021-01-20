'use strict';

const express = require('express');
const jwt = require('express-jwt');
const morgan = require('morgan');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require( 'bcrypt' );

const clientDao = require('./client/clientDao');
const  shopperDao = require('./shopper/shopperDao');
const loginDao = require('./login/loginDao');

const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 30000;
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };

const app = new express();
const PORT = 3001;

app.use(morgan('tiny'));

app.use(express.json());

// Login page


app.post('/loginApi/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    loginDao.getUserByEmail(email)
        .then((user) => {
            console.log(user);
            if (user === undefined){
                res.statuses(404).send({
                    errors: [ {'param': 'Server', 'message': 'Invalid e-mail'} ]
                })
            } else {
                if (!loginDao.checkPassword(user, password)){
                    res.status(401).send({errors: [ {'param': 'Server', 'message': 'Wrong password'}]})
                } else {
                    const token = jsonwebtoken.sign( {user: user.id}, jwtSecret, {expiresIn: expireTime} );
                          res.cookie( 'token', token, {httpOnly: true, sameSite: true, maxAge: 1000 * expireTime} );
                          res.json( {
                                        id: user.id,
                                        email: user.email,
                                        type: user.type,
                                        token: token
                                    } );
                }
            }
        }).catch(
            // Delay response when wrong user/pass is sent to avoid fast guessing attempts
            ( err ) => {
                console.log( err );
                new Promise( ( resolve ) => {
                    setTimeout( resolve, 1000 )
                } ).then( () => res.status( 401 ).json( authErrorObj ) )
            }
        )
})

app.use(cookieParser());

app.post('/loginApi/logout', (req, res) => {
    res.clearCookie('token').end();
});

app.use(
    jwt({
      secret: jwtSecret,
      getToken: req => req.cookies.token
    })
  );


app.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {
    console.log('----------------test use----------');
    res.status(401).json(authErrorObj);
}
});
    
//API for check authenticated User
app.get( '/loginApi/user', ( req, res ) => {
    const userRequest = req.user && req.user.user;
    console.log('----------------test /loginApi/user----------');
    loginDao.getUserById( userRequest )
              .then( ( user ) => {
                  res.json( {
                                id: user.id,
                                email: user.email,
                                type: user.type
                            } );
              } ).catch(
        () => {
            res.status( 404 ).json( authErrorObj );
        }
    );
} );


// To get the informations of each type pizza
app.get( '/clientApi/getPizzaInfos', (req, res) => {
    clientDao.getAvailableNums()
        .then( ( pizzas ) => {
            
            res.json(pizzas)
        })
        .catch( ( err)=>{
            res.status(500).json( {
                errors: [ {'message': err}]
            })
        } )
})

// To make a ordine in DB
app.put( '/clientApi/makeOrdine', (req, res) => {
    let body = req.body
    clientDao.makeOrdine(body)
        .then( () =>{
            res.status(200).json({
                message: '/clientApi/makeOrdine OK!'
            })
        })
        .catch( ( err)=>{
            console.log('From server', err);
            res.status(500).json( {
                errors: 'Server err /clientApi/makeOrdine'
            })
        } )
})

// To get all the orders of a client 
app.get('/clientApi/getOrders/:email', (req, res) => {
    const email = req.params.email
    clientDao.getOrders(email)
        .then( (rows) => {
            res.status(200).json(rows)
        })
        .catch( ( err)=>{
            console.log('From server', err);
            res.status(500).json( {
                errors: 'Server err, /clientApi/getOrders'
            })
        } )
})

// To get all bookings of a order
app.get('/clientApi/getBookings/:orderId', (req, res) =>{
    const orderId = req.params.orderId
    clientDao.getBookings(orderId)
        .then( (rows) => {
            res.status(200).json(rows)
        })
        .catch( ( err)=>{
            console.log('From server', err);
            res.status(500).json( {
                errors: 'Server err, /clientApi/getOrders'
            })
        } )
})

// To update the status of a given order
app.post('/clientApi/changeStates/:orderId', (req, res) =>{
    const orderId = req.params.orderId
    const states  = req.body.states
    clientDao.changeStates(orderId, states)
        .then( (results) => {
            res.status(200).json(results)
        })
        .catch( ( err)=>{
            console.log('From server', err);
            res.status(500).json( {
                errors: 'Server err, /clientApi/getOrders'
            })
        } )
})


// ## shopper page

// To get all the orders 
app.get('/shopperApi/getOrders', (req, res) =>{
    shopperDao.getOrders()
        .then( (rows) => {
            res.status(200).json(rows)
        })
        .catch( ( err)=>{
            console.log('From server', err);
            res.status(500).json( {
                errors: 'Server err, /shopperApi/getOrders'
            })
        } )
})

app.get('/shopperApi/getBookings/:orderId', (req, res) =>{
    const orderId = req.params.orderId
    shopperDao.getBookings(orderId)
        .then( (rows) => {
            res.status(200).json(rows)
        })
        .catch( ( err)=>{
            console.log('From server', err);
            res.status(500).json( {
                errors: 'Server err, /shopperApi/getBookings/:orderId'
            })
        } )
})

// To get the informations of each type pizza
app.get( '/shopperApi/getPizzaInfos', (req, res) => {
    shopperDao.getAvailableNums()
        .then( ( pizzas ) => {
            
            res.json(pizzas)
        })
        .catch( ( err)=>{
            res.status(500).json( {
                errors: [ {'message': err}]
            })
        } )
})

// To update the status of a given order
app.post('/shopperApi/changeStates/:orderId', (req, res) =>{
    const orderId = req.params.orderId
    const states  = req.body.states
    shopperDao.changeStates(orderId, states)
        .then( (results) => {
            res.status(200).json(results)
        })
        .catch( ( err)=>{
            console.log('From server', err);
            res.status(500).json( {
                errors: 'Server err, /shopperApi/getOrders'
            })
        } )
})


// ## Visitor page

app.get( '/visitorApi/getPizzaInfos', (req, res) => {
    console.log('/visitorApi/getPizzaInfos-------------', );
    clientDao.getAvailableNums()
        .then( ( pizzas ) => {
            res.json(pizzas)
        })
        .catch( ( err)=>{
            res.status(500).json( {
                errors: [ {'message': err}]
            })
        } )
})


app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));