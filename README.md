![image](https://github.com/CJThornburg/ButterFingers/assets/59716885/82015fc1-fbe5-45a3-a818-59262d5bac7c)



# ButterFingers

Engage in a dynamic typing game website that not only meticulously tracks your statistics but also offers the exciting feature of connecting with friends for added interactive enjoyment!



## Tech Stack

**Client:** React, Redux, CSS, Node

**Server:** Flask, SQLAlcemy, Alembic, postgreSQL


## Live Link

https://butterfingers.onrender.com/
## Demos

#### Typing Test
![Typing Test](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

#### User Profile/ Friends with user
![User/Friends Profile](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

#### Non-Friend Profile
![Not Friends Profile](https://via.placeholder.com/468x300?text=App+Screenshot+Here)
## Features

### Custom Texts
* Users can create a custom text to run
* Users can read/view and run other users texts
* Users can update their texts
* Users can delete their texts

### User Profiles
* Users can upload a profile picture
* Users can upload a cover picture
* Users can recieve and send friend request
* Users can view penning friend requests, either sent or recieving
* Users can view full profile of another user if they are friends
* Users can view part of other users profiles if the two users are not friends
* Users can delete friend connection
* Users can delete request or undo a decline

### Scores
* Create a score card, by running typing tests
* Read score card after completing a test
* Cancel the score card from being sumbitted
## Run Locally

Clone the project

```bash
    git clone https://github.com/CJThornburg/ButterFingers.git
```

Go to the project directory

```bash
    cd butterFingers
```

Install dependencies

```bash
    pipenv install -r requirements.txt
    pipenv run flask db init
    pipenv run flask db migrate
    pipenv run flask db upgrade
    pipenv run flask seed all

```

In seprate terminal
```bash
    cd react-frontend
    npm install
```



Start the servers


In root/ terminal
```bash
pipenv run flask run
```

In react-frontend/ terminal
```bash
    npm run start
```

## Environment Variables

To run this project locally, you will need to add the following environment variables to your .env file

`SECRET_KEY`

`DATABASE_URL`

`S3_BUCKET`

`S3_KEY`

`S3_SECRET`




## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Main | ![#323437](https://via.placeholder.com/10/323437?text=+) #323437 |
| Secondary | ![#2C2E31](https://via.placeholder.com/10/2C2E31?text=+) #f8f8f8 |
| Tertiary | ![#E2B714](https://via.placeholder.com/10/E2B714?text=+) #E2B714 |



## Roadmap

- Integrate More AWS capabilites
    - Update
    - Delete

- Add Web Sockets to allow to race friends


## Connect

- [Linkdin](https://www.linkedin.com/in/chris-thornburg-swe/)

- [Email Me](mailto:cjthronburg@thornburgsfamily.com)


## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

* Request: endpoints that require authentication
* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```


### Get the Current User

Returns the information about the current user that is logged in.

* Require Authentication: true
* Request
  * Method: GET
  * URL: /api/session
  * Body: none

* Successful Response when there is a logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "coverPhoto": "https://mechanicalkeyboards.com/shop/images/products/large_9315_large_DKON2161ST-USPHSFTPGC1U2Z_main.png",
        "profile_imageURL": "https://img.freepik.com/free-icon/user_318-826358.jpg"
        "email": "demo@aa.io",
        "username": "Demo",

      }
    }
    ```

* Successful Response when there is no logged in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

* Require Authentication: false
* Request

  * Method: POST
  * URL: /api/session
 
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "demo@aa.io",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "demo1",
        "lastName": "work1",
        "email": "demo@aa.io",
        "username": "Demo"
      }
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Email or username is required",
        "password": "Password is required"
      }
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/users
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "firstName": "demo2",
      "lastName": "work2",
      "email": "marnie@aa.io",
      "username": "marnie",
      "password": "secret password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": {
        "id": 1,
        "firstName": "demo2",
        "lastName": "work2",
        "email": "marnie@aa.io",
        "username": "marnie"
      }
    }
    ```

* Error response: User already exists with the specified email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "email": "User with that email already exists"
      }
    }
    ```

* Error response: User already exists with the specified username
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "User with that username already exists"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "email": "Invalid email",
        "username": "Username is required",
        "firstName": "First Name is required",
        "lastName": "Last Name is required"
      }
    }
    ```

## Products

### Get all Products

Returns all the products.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/products
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "itemName": "Spiked Collar",
          "price": 15.99,
          "description": "Black pleather spiked collar will attract the attention you seek!",
          "previewImage": "image url",
          "category": "jewelry"
        }
      ]
    }
    ```

### Get all Products owned by the Current User

Returns all the products owned (created) by the current user.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/products/current
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "ownerId": 1,
          "itemName": "Spiked Collar",
          "price": 15.99,
          "description": "Black pleather spiked collar will attract the attention you seek!",
          "previewImage": "image url",
          "category": "jewelry",
        }
      ]
    }
    ```

### Get details of a Product from an id

Returns the details of a product specified by its id.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/products/:productId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "itemName": "Spiked Collar",
      "price": 15.99,
      "description": "Black pleather spiked collar will attract the attention you seek!",
      "previewImage": "image url",
      "category": "jewelry",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "star": 4,
          "review": "looks so cute"
        },
        {
          "id": 2,
          "userId": 1,
          "star": 5,
          "review": "matches my outfit perfectly"
        }
      ],
      "Seller": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      }
    }
    ```

* Error response: Couldn't find a Product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Create a Product

Creates and returns a new Product.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/products
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "itemName": "Spiked Collar",
      "price": 15.99,
      "description": "Black pleather spiked collar will attract the attention you seek!",
      "quantity": 3,
      "previewImage": "image url",
      "category": "jewelry",
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "sellerId": 1,
      "itemName": "Spiked Collar",
      "price": 15.99,
      "description": "Black pleather spiked collar will attract the attention you seek!",
      "quantity": 3,
      "previewImage": "image url",
      "category": "jewelry",
    }
    ```

* Error Response: Body validation error
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
      "itemName": "Item name is required",
      "price": "Price is required",
      "description": "Description is required",
      "quantity": "Quantity is required",
      "previewImage": "Preview image is required",
      "category": "Category is required",
      }
    }
    ```

### Add an Image to a Product based on the Products's id

Create and return a new image for a product specified by id.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/products/:productId/images
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "url": "image url",

    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "url": "image url",

    }
    ```

* Error response: Couldn't find a Product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Delete a Product

Deletes an existing product.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: DELETE
  * URL: /api/products/:productId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

## REVIEWS

### Get all Reviews of the Current User

Returns all the reviews written by the current user.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/reviews/current
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "User":{"id": 1,
            "firstName": "John",
            "lastName": "Smith"
      }
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "stars": 5,
          "review": "This was an awesome product!",
          "Product": {
            "id": 1,
            "sellerId": 1,
            "itemName": "Spiked Collar",
            "price": 15.99,
            "description": "Black pleather spiked collar will attract the attention you seek!",
            "previewImageURL": "https://m.media-amazon.com/images/S/mms-media-storage-prod/final/BrandPosts/brandPosts/a868ad77-879d-40d7-8bed-dad04be63a15/f43af8aa-0309-40d6-a244-87b52d0ef5df/media._SL480_.jpeg",
            "quantity": 3,
            "previewImage": "image url",
            "category": "jewelry",
          },
        }
      ]
    }
    ```

### Get all Reviews by a Products's id

Returns all the reviews that belong to a product specified by id.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/products/:productId/reviews
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "id": 1,
          "userId": 1,
          "stars": 5,
          "review": "This was an awesome product!",
          "createdAt": "2021-11-19 20:39:36",
          "updatedAt": "2021-11-19 20:39:36" ,
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
        }
      ]
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Create a Review for a Product based on the Product's id

Create and return a new review for a product specified by id.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/products/:productId/reviews
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome product!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "stars": 5,
      "review": "This was an awesome product!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

* Error response: Review from the current user already exists for the Product
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already has a review for this Product"
    }
    ```

### Edit a Review

Update and return an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: PUT
  * URL: /api/reviews/:reviewId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review": "This was an awesome product!",
      "stars": 5,
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "userId": 1,
      "stars": 5,
      "review": "This was an awesome product!",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review text is required",
        "stars": "Stars must be an integer from 1 to 5",
      }
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete a Review

Delete an existing review.

* Require Authentication: true
* Require proper authorization: Review must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: DELETE
  * URL: /api/reviews/:reviewId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

## Shopping Cart

### Get all of the Current User's Shopping Cart

Return all the shopping cart that the current user has made.

* Require Authentication: true
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/shopping_cart
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Shopping Cart": [
        {
          "id": 1,
          "userId": 2,
          "Products":
            {
            "id": 1,
            "sellerId": 1,
            "itemName": "Spiked Collar",
            "price": 15.99,
            "description": "Black pleather spiked collar will attract the attention you seek!",
            "quantity": 3,
            "previewImage": "image url",
            "category": "jewelry",
            },
        }
      ]
    }
    ```

### Add Item to Cart

Adds an item to the cart for the current user

* Require Authentication: True
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/products/:productId/add_to_cart
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "You've successfully added this item to cart."
    }
    ```

* Error response: Couldn't find item
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Item couldn't be found"
    }
    ```

* Error response: Current user Id matches product sellerId
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "You may not add your own product to your cart"
    }
    ```

### Delete a Shopping Cart Item

Delete an existing cartId.

* Require Authentication: true
* Require proper authorization: Shopping Cart must belong to the current user or the
  cart item must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: DELETE
  * URL: /api/shopping_cart/:productId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find an item with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Item couldn't be found"
    }
    ```

## IMAGES

### Delete a Product Image

Delete an existing image for a Product.

* Require Authentication: true
* Require proper authorization: Product must belong to the current user
* Request
  <!--!!START SILENT -->
  * Method: DELETE
  * URL: /api/product-image/:imageId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a Product Image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product Image couldn't be found"
    }
    ```

## Add Query Filters to Get All Products

Return products filtered by query parameters.

* Require Authentication: false
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/products
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Query Parameters
    * page: integer, minimum: 1, maximum: 10, default: 1
    * size: integer, minimum: 1, maximum: 20, default: 20
    * minPrice: decimal, optional, minimum: 0
    * maxPrice: decimal, optional, minimum: 0
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "id": 1,
          "itemName": "Spiked Collar",
          "price": 15.99,
          "description": "Black pleather spiked collar will attract the attention you seek!",
          "previewImage": "image url",
          "category": "jewelry"
        }
      ],
      "page": 2,
      "size": 25
    }
    ```

* Error Response: Query parameter validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "page": "Page must be greater than or equal to 1",
        "size": "Size must be greater than or equal to 1",
        "minPrice": "Minimum price must be greater than or equal to 0",
        "maxPrice": "Maximum price must be greater than or equal to 0",
        "itemName": "Item name is required",
        "price": "Price is required",
        "description": "Description is required",
        "quantity": "Quantity is required",
        "previewImage": "Preview image is required",
        "category": "Category is required",
      }
    }
    ```
### Get all Favorites by Current User

Returns all the Favorite Items that belong to the Current User

* Require Authentication: True
* Request
  <!--!!START SILENT -->
  * Method: GET
  * URL: /api/favorites/current
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Favorites": [
        {
          "User": {
            "id": 1,
            "firstName": "John",
            "lastName": "Smith"
          },
            "Product": [
            {
              "id": 1,
              "productId": 1,
              "itemName": "Spiked Collar",
              "price": 15.99,
              "description": "Black pleather spiked collar will attract the attention you seek!",
              "previewImage": "image url",
              "category": "jewelry"
            },
            {
              "id": 1,
              "productId": 1,
              "itemName": "Spiked Collar",
              "price": 15.99,
              "description": "Black pleather spiked collar will attract the attention you seek!",
              "previewImage": "image url",
              "category": "jewelry"
            }
          ]
        }
      ]
    }
    ```

* Error response: Couldn't find a favorite item belonging to the current user
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Favorites couldn't be found"
    }
    ```


### Favorite an Item

Favorites an item for the current user

* Require Authentication: True
* Request
  <!--!!START SILENT -->
  * Method: POST
  * URL: /api/products/:productId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "You've successfully favorited this item."
    }
    ```

* Error response: Couldn't find a favorite item belonging to the current user
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Item couldn't be found"
    }
    ```


### Delete a Favorite by Current User

Delete a Favorite by Current User

* Require Authentication: True
* Request
  <!--!!START SILENT -->
  * Method: DELETE
  * URL: /api/favorites/:productId
  <!--!!END -->
  <!--!!ADD -->
  <!-- * Method: ? -->
  <!-- * URL: ? -->
  <!--!!END_ADD -->
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a favorite item belonging to the current user
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Favorite couldn't be found"
    }
    ```
