# staudio-backend
Backend project for AAD

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

| Deal | Type |
|--|--|
| id | string |
| product_id | string |
| deal_id | string |
| price | double |