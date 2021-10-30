# staudio-backend
Backend project for AAD

# Installing
Before starting you must have Node and mongodb installed

For windows download links
- [NodeJS](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/products/compass)

Other OS search online for installation guide on Node and MongoDB.

Install all packages using the following command:

`npm i`

If there are no errors you are ready to use this software.

# Docker install
Before installing with docker you must have docker installed on your OS.

When docker is installed you can use the following command to install all dependencies for this project

`docker-compose up`

# How to use it
To start the server you can either run it in development mode or just run the server.

To run it on development you must have nodemon installed.
` npm install -g nodemon`

If nodemon is installed and you want to run in on development mode you can run the following command:
`npm run dev`

If you just want to start the server in production mode you can run the following command without nodemon installed:
`npm run prod`

You can navigate to `localhost:8000/api-doc` to find out what API calls are available.

## Add existing test data
To add existing test data which is included in the `test_data` folder, you must open MongoDB or any client that allows to add/edit mongo databases. 

navigate to the `staudio` database and import all files in the `test_data` folder as a collection.

# How to run tests
To run tests cypress must be installed and the server must be running.

After cypress is installed you can use the following command to run all tests 
`npm run cy:run`

# API calls

| API-Call           | Params                                        | API-Type | Description                       | Authentication                     | Error-handling                                                                 |
| ------------------ | --------------------------------------------- | -------- | --------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| user               | \-                                            | GET      | Get all user                      | Admin                              | Not authorized                                                                 |
| user/{id}          | \-                                            | GET      | Get specific user                 | Admin<br>User with same id         | Not authorized<br>ID does not exist                                            |
| user/{id}          | Password<br>New-password<br>Email<br>location | UPDATE   | Change user details               | Admin<br>User with same id         | Not authorized<br>Old password incorrect<br>Email invalid<br>ID does not exist |
| user/{id}          | \-                                            | DELETE   | Remove user from database         | Admin<br>User with same id         | Not authorized<br>ID does not exist                                            |
| order              | \-                                            | GET      | Get all orders                    | Admin                              | Not authorized                                                                 |
| order/user/{id}    | \-                                            | GET      | Get all orders from specific user | Admin<br>User with same id         | Not authorized<br>ID does not exist<br>User has no orders                      |
| order/{id}         | \-                                            | GET      | Get specific order                | Admin<br>User with same id         | Not authorized<br>ID does not exist                                            |
| order/{id}         | paid-status                                   | UPDATE   | Update paid status of order       | Admin                              | Not authorized<br>ID does not exist                                            |
| product            | \-                                            | GET      | Get all products                  | Any                                | \-                                                                             |
| product            | Title<br>Description<br>Type<br>Price         | ADD      | Add new product                   | Admin                              | Not authorized                                                                 |
| product/{id}       | \-                                            | GET      | Get specific product              | Any                                | ID does not exist                                                              |
| product/{id}       | Title<br>Description<br>Type<br>Price         | UPDATE   | Update existing product           | Admin                              | Not authorized<br>ID does not exist                                            |
| product/review{id} | Description<br>Star                           | ADD      | Add review to product             | Admin<br>User with bought order id | Not authorized<br>ID does not exist<br>No stars given                          |
| product/type/{id}  | \-                                            | GET      | Get all specific type of products | Any                                | ID does not exist                                                              |
| deal               | \-                                            | GET      | Get all deals                     | User                               | \-                                                                             |
| deal/{id}          | \-                                            | GET      | Get specific deal                 | User                               | ID does not exist<br>Not authorized                                            |
| deal/type/{id}     | \-                                            | GET      | Get deal with specific type       | User                               | ID does not exist<br>Not authorized                                            |

# Database
| User | Type |
|--|--|
| id | string |
| username | string |
| password | string |
| Email | string |
| Location | string |

| Order | Type |
|--|--|
| id | string |
| user_id | string |
| qr_code | string |
| paid_status | string |
| reserved_date | string |

| Order_items | Type |
|--|--|
| id | string |
| order_id | string |
| item_id | string |
| amount | number |
| price | double |

| Product | Type |
|--|--|
| id | string |
| title | string |
| description | string |
| type | string |
| price | double |

| Review | Type |
|--|--|
| id | string |
| user_id | string |
| product_id | string |
| description | string |
| star | number |

| Picture | Type |
|--|--|
| id | string |
| product_id | string |
| file_name | string |

| Deal | Type |
|--|--|
| id | string |
| name | string |
| description | string |

| Deal_product | Type |
|--|--|
| id | string |
| product_id | string |
| deal_id | string |
| price | double |