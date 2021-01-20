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
            console.log(pizzas);
            res.json(pizzas)
        })
        .catch( ( err)=>{
            res.status(500).json( {
                errors: [ {'message': err}]
            })
        } )
})


app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));