# Store Manager

[![Build Status](https://travis-ci.org/ebenezerdon/Store-Manager.svg?branch=develop)](https://travis-ci.org/ebenezerdon/Store-Manager)
[![Coverage Status](https://coveralls.io/repos/github/ebenezerdon/Store-Manager/badge.svg?branch=develop)](https://coveralls.io/github/ebenezerdon/Store-Manager?branch=develop)

Store Manager is a web application that helps store owners manage sales and product inventory
records. This application is meant for use in a single store.

## Github Pages

[Index](https://ebenezerdon.github.io/Store-Manager/UI/index.html) |
 [User Dashboard](https://ebenezerdon.github.io/Store-Manager/UI/pages/attendantdashboard.html) |
 [Admin Dashboard](https://ebenezerdon.github.io/Store-Manager/UI/pages/admindashboard.html)

## Server side hosted on Heroku

https://newstoremanager.herokuapp.com/

## Getting Started

### Prerequisites to use this api

1. Postman
2. Any web browser

### Prerequisites to get this api running on your local system

1. Node js/express
2. Any text editor
3. Git

### Installation
1. Clone this repository into your local machine:

```
e.g git clone https://github.com/ebenezerdon/Store-Manager
```
2. Install dependencies 
```
- npm install.
```
3. Start the application by running the start script.

- npm start

4. Install postman to test all endpoints on port 5001.

### Test

run test using 'npm test'.

## Features

 ### Required Features
- Store attendant can search and add products to buyer’s cart.
- Store attendant can see his/her sale records but can’t modify them.
- App should show available products, quantity and price.
- Store owner can see sales and can filter by attendants.

### Current Features

- Store attendant can add product to buyer's cart.
- Store attendant can search for products by id.
- Store attendant/admin can see available products.
- Store owner can see sales and can get sale record by id.

### API End Points Test Using Postman

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>/api/v1/login/</td>  <td>User login</td></tr>

<tr><td>POST</td> <td>/api/v1/sales</td>  <td>Create a sale record (Only store attendant)</td></tr>

<tr><td>POST</td> <td>/api/v1/users</td>  <td>Create a user (Only admin)</td></tr>

<tr><td>GET</td> <td>/api/v1/sales</td>  <td>Get all sale records (Only admin)</td></tr>

<tr><td>GET</td> <td>/api/v1/sales/:id</td>  <td>Get a sale record by id (Onlyadmin)</td></tr>

<tr><td>GET</td> <td>/api/v1/products</td>  <td>Gets all products</td></tr>

<tr><td>GET</td> <td>/api/v1/products/:id</td>  <td>Gets a product by id</td></tr>

<tr><td>GET</td> <td>/api/v1/users</td>  <td>Gets all users</td></tr>

<tr><td>GET</td> <td>/api/v1/users/:id/</td>  <td>Gets a user by id</td></tr>

</table>

## Author

- Ebenezer Don

## License

ISC

## Acknowledgement

- Andela
