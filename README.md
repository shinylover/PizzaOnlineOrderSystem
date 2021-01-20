# Exam #4: "Pizza"

## Student: s274816 FEIHONG FIRSTNAME

## React client application routes

- Route `/loginApi/login`: Used to pass the email and password to backend, and check it
- Route `/loginApi/logout`: Used to logout current user
- Route `/loginApi/user`: Used to check current is authenticated, which makes sure unauthenticated user can not use this system
- Route `/clientApi/getPizzaInfos`: Get those three types pizzas' informations from DB
- Route `/clientApi/makeOrdine`: Used to make a ordine, insert some new rows into orders and bookings table
- Route `/clientApi/getOrders/:email`: By a given email, to get all the orders
- Route `/clientApi/getBookings/:orderId`: By a given order id to get all the bookings
- Route `/clientApi/changeStates/:orderId`: By a given order id to update the states
- Route `/shopperApi/getPizzaInfos`: Get those three types pizzas' informations from DB
- Route `/shopperApi/getOrders`: To get all the orders
- Route `/shopperApi/getBookings/:orderId`: By a given order id to get all the bookings
- Route `/shopperApi/changeStates/:orderId`: By a given order id and state to update the states
- Route `/visitorApi/getPizzaInfos`: Get those three types pizzas' informations from DB

## REST API server

- POST `/loginApi/login`

  - request body content: email, password
  - response body content: uid, email, type
- POST `/loginApi/logout`

  - just clean the cookie
- POST `/loginApi/changeStates/:orderId`

  - request parameters: orderId
  - request body: states
  - response: just a number
- POST `/shopperApi/changeStates/:orderId`

  - request parameters: orderId
  - request body: states
  - response: just a number
- GET `/loginApi/user`

  - response body content: req.user
- GET `/clientApi/getPizzaInfos`

  - response: rows of pizzas
- GET `/clientApi/getOrders/:email`

  - req parameters: email
  - res: rows of orders of current user
- GET `/clientApi/getBookings/:orderId`

  - req param: orderId
  - res: rows of bookings of current order
- GET `/shopperApi/getOrders`

  - res : rows of orders
- GET `/shopperApi/getBookings/:orderId`

  - req param: orderId
  - res: rows of bookings of current order
- GET `/shopperApi/getPizzaInfos`

  - response: rows of pizzas
- GET `/visitorApi/getPizzaInfos`

  - response: rows of pizzas
- PUT `/clientApi/makeOrdine`

  - request body content: all the informations for inserting into orders and bookings table
  - response : Just a number

## Server database

- Table `pizza` - contains pid, size, price, numbers, maxnum, available
- Table `user` - contains uid, password, type, email
- Table `orders` - contains oid, ref_user, timestam, sum
- Table `bookings` - contains bid, ref_order, ref_pizza, olives, ham, bacon, mushrooms, eggs, artichokes, seafood, chips, vegetables, tomato, availnum, numpizza, cost

## Main React Components

- `ordersControl.jsx` (in `client.js`): component used to make a ordine
- `ordersControlForTable.jsx` (in `orderItem.jsx`): component used to edite the order and check the histroy order's details
- `pizzas.jsx` (in `client.js`): component used to show all the pizza informations
- `shopperOrdersControl.jsx` (in `shopperOrderItem.jsx`): component used to display history order's details and updete the states of order
- `shopperOrders.jsx` (in `shopper.js`): component used to show all the orders
- `NavigationBar.jsx` (in `client.js`): component used to set routes

(only _main_ components, minor ones may be skipped)

## Screenshot

![Configurator Screenshot](./img/screenshot.jpg)

## Test users

* client1@gmail.com, password (frequent customer)
* client2@gmail.com, password
* client3@gmail.com, password
* client4@gmail.com, password
* shopper@gmail.com, password (frequent customer)
