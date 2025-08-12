openapi: 3.0.0
info:
  title: Near2Door Customer API
  description: API for customer-side functionalities of the Near2Door app, including authentication, Browse shops, and managing orders.
  version: 1.0.0
servers:
  - url: /api
paths:
  /auth/register:
    post:
      summary: Register a new customer
      description: Creates a new customer account.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - username
                - email
                - password
              properties:
                username:
                  type: string
                  example: jane_doe
                email:
                  type: string
                  format: email
                  example: jane.doe@example.com
                password:
                  type: string
                  format: password
                  example: mysecretpassword123
      responses:
        '201':
          description: User registered successfully.
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: number
                    example: 1
                  username:
                    type: string
                    example: jane_doe
                  email:
                    type: string
                    example: jane.doe@example.com
        '400':
          description: Bad Request, e.g., username or email already exists.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Username or email already exists.
  /auth/login:
    post:
      summary: User login
      description: Authenticates a user and returns a JWT token.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                  format: email
                  example: jane.doe@example.com
                password:
                  type: string
                  format: password
                  example: mysecretpassword123
      responses:
        '200':
          description: Successful login.
          content:
            application/json:
              schema:
                type: object
                properties:
                  token:
                    type: string
                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                  userId:
                    type: number
                    example: 123
        '401':
          description: Unauthorized, invalid credentials.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Invalid credentials.
  /shops:
    get:
      summary: Get all shops
      description: Retrieves a list of all local shops with their status and location.
      responses:
        '200':
          description: A list of shops.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Shop'
  /shops/{shopId}:
    get:
      summary: Get a single shop
      description: Retrieves details for a specific shop by its ID.
      parameters:
        - name: shopId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Details of the requested shop.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Shop'
        '404':
          description: Shop not found.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Shop not found.
  /orders:
    post:
      summary: Create a new order
      description: Places a new order from an authenticated customer.
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewOrder'
      responses:
        '201':
          description: Order placed successfully.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Order placed successfully.
                  orderId:
                    type: number
                    example: 301
        '401':
          description: Unauthorized, authentication required.
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Authentication required.
  /users/{userId}/orders:
    get:
      summary: Get customer's orders
      description: Retrieves all orders placed by the authenticated user.
      security:
        - bearerAuth: []
      parameters:
        - name: userId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A list of customer orders.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Order'
        '401':
          description: Unauthorized, authentication required.
  /orders/{orderId}/agents:
    get:
      summary: Get delivery agents for an order
      description: Retrieves a list of available delivery agents for a customer to select from.
      security:
        - bearerAuth: []
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A list of available delivery agents.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/DeliveryAgent'
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Shop:
      type: object
      properties:
        id:
          type: number
          example: 201
        name:
          type: string
          example: Local Grocery Store
        status:
          type: string
          enum: [open, closed]
          example: open
        location:
          type: object
          properties:
            latitude:
              type: number
              example: 15.2993
            longitude:
              type: number
              example: 74.1240
        description:
          type: string
          example: A popular local shop for daily essentials.
    NewOrder:
      type: object
      required:
        - shopId
        - items
        - deliveryFee
        - paymentMethod
      properties:
        shopId:
          type: number
          example: 201
        items:
          type: array
          items:
            type: object
            properties:
              name:
                type: string
                example: "milk"
              quantity:
                type: number
                example: 2
              price:
                type: number
                example: 30.00
        deliveryFee:
          type: number
          example: 50.00
        paymentMethod:
          type: string
          enum: [COD, UPI, wallet]
          example: COD
    Order:
      type: object
      properties:
        id:
          type: number
          example: 301
        customerId:
          type: number
          example: 123
        shopId:
          type: number
          example: 201
        agentId:
          type: number
          example: 401
        status:
          type: string
          enum: [pending, accepted, in_delivery, delivered, cancelled]
          example: in_delivery
        totalPrice:
          type: number
          example: 150.00
    DeliveryAgent:
      type: object
      properties:
        id:
          type: number
          example: 401
        name:
          type: string
          example: Rajesh
        location:
          type: object
          properties:
            latitude:
              type: number
              example: 15.2995
            longitude:
              type: number
              example: 74.1242
        proximity:
          type: string
          example: 1.2 km away
