'use strict';

const express = require('express');
const jwt = require('express-jwt');
const morgan = require('morgan');
const jsonwebtoken = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const clientDao = require('./client/clientDao');
const  shopperDao = require('./shopper/shopperDao');

const jwtSecret = '6xvL4xkAAbG49hcXf5GIYSvkDICiUAR6EdR5dLdwW7hMzUjjMUe9t6M5kSAYxsvX';
const expireTime = 300;
const authErrorObj = { errors: [{  'param': 'Server', 'msg': 'Authorization error' }] };

const app = new express();
const PORT = 3001;

app.use(morgan('tiny'));

app.use(express.json());

app.use(cookieParser());









app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));