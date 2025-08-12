openapi: 3.0.0
info:
  title: Near2Door Full API Contract
  description: A comprehensive API for all user roles (Customer, Shop Owner, Delivery Agent, Admin) in the Near2Door app.
  version: 1.0.0
servers:
  - url: /api
paths:
  # Customer Endpoints
  /auth/register:
    post:
      summary: Register a new customer
      description: Creates a new customer account.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CustomerRegistration'
      responses:
        '201':
          description: User registered successfully.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserAuthResponse'
        '400':
          description: Bad Request, e.g., username or email already exists.
  /auth/login:
    post:
      summary: User login
      description: Authenticates a user and returns a JWT token.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserLogin'
      responses:
        '200':
          description: Successful login.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserLoginResponse'
        '401':
          description: Unauthorized, invalid credentials.
  /shops:
    get:
      summary: Get all shops
      description: Retrieves a list of all local shops, with real-time status updates.
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
                $ref: '#/components/schemas/ShopDetails'
        '404':
          description: Shop not found.
  /orders:
    post:
      summary: Create a new order
      description: Places a new order from a customer. Requires authentication.
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
        '401':
          description: Unauthorized, authentication required.
  /users/{userId}/orders:
    get:
      summary: Get customer's orders
      description: Retrieves a list of all orders placed by the authenticated user.
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

  # Shop Owner Endpoints
  /shops/{shopId}/products:
    post:
      summary: Add a new product
      description: Allows a shop owner to add a new product to their shop.
      security:
        - bearerAuth: []
      parameters:
        - name: shopId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewProduct'
      responses:
        '201':
          description: Product added successfully.
    get:
      summary: Get a shop's products
      description: Retrieves all products for a specific shop, including stock status.
      parameters:
        - name: shopId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A list of products.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Product'
  /shops/{shopId}/products/{productId}:
    put:
      summary: Update a product
      description: Updates the details or inventory of a specific product.
      security:
        - bearerAuth: []
      parameters:
        - name: shopId
          in: path
          required: true
          schema:
            type: integer
        - name: productId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ProductUpdate'
      responses:
        '200':
          description: Product updated successfully.
  /shops/{shopId}/orders:
    get:
      summary: Get a shop's orders
      description: Retrieves all pending, active, and completed orders for a specific shop.
      security:
        - bearerAuth: []
      parameters:
        - name: shopId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A list of orders.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Order'
  /shops/{shopId}/orders/{orderId}/status:
    put:
      summary: Update order status
      description: Allows a shop owner to confirm or cancel an order.
      security:
        - bearerAuth: []
      parameters:
        - name: shopId
          in: path
          required: true
          schema:
            type: integer
        - name: orderId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                  enum: [accepted, cancelled]
      responses:
        '200':
          description: Order status updated.

  # Delivery Agent Endpoints
  /agents/{agentId}/orders:
    get:
      summary: Get delivery agent's assigned orders
      description: Retrieves a list of orders assigned to a specific delivery agent.
      security:
        - bearerAuth: []
      parameters:
        - name: agentId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A list of assigned orders.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/DeliveryOrder'
  /orders/{orderId}/delivery-status:
    put:
      summary: Update order delivery status
      description: Allows a delivery agent to update the status of an order (e.g., picked up, in transit, delivered).
      security:
        - bearerAuth: []
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                  enum: [picked_up, in_transit, delivered]
      responses:
        '200':
          description: Delivery status updated.
  /agents/{agentId}/earnings:
    get:
      summary: Get delivery agent's earnings
      description: Retrieves the earning history and performance metrics for a delivery agent.
      security:
        - bearerAuth: []
      parameters:
        - name: agentId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Agent earnings and performance metrics.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AgentEarnings'

  # Admin Endpoints
  /admin/auth/login:
    post:
      summary: Admin login
      description: Secure login for the admin panel.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                username:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: Successful login.
  /admin/shops:
    get:
      summary: Get all shops for admin review
      description: Retrieves a list of all shops with filter options.
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
            enum: [approved, pending, rejected]
        - name: subscription
          in: query
          schema:
            type: string
            enum: [active, inactive]
      responses:
        '200':
          description: A list of shops for the admin panel.
  /admin/shops/{shopId}/approve:
    put:
      summary: Approve a pending shop
      description: Approves a shop and sets its subscription to inactive.
      security:
        - bearerAuth: []
      parameters:
        - name: shopId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Shop approved successfully.
  /admin/agents:
    get:
      summary: Get all delivery agents
      description: Retrieves a list of all delivery agents for management.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: A list of delivery agents.
  /admin/orders:
    get:
      summary: Get all system orders
      description: Retrieves a list of all orders across the platform for tracking and management.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: A list of all orders.
  /admin/finances:
    get:
      summary: Get financial overview
      description: Retrieves financial data including revenue, payments, and commissions.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Financial data.

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    CustomerRegistration:
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
    UserLogin:
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
    UserAuthResponse:
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
    UserLoginResponse:
      type: object
      properties:
        token:
          type: string
          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
        userId:
          type: number
          example: 123
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
    ShopDetails:
      allOf:
        - $ref: '#/components/schemas/Shop'
        - type: object
          properties:
            products:
              type: array
              items:
                $ref: '#/components/schemas/Product'
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
    NewProduct:
      type: object
      required:
        - name
        - description
        - price
        - stock
      properties:
        name:
          type: string
          example: "Organic Apples"
        description:
          type: string
          example: "Fresh, locally sourced organic apples."
        price:
          type: number
          example: 120.50
        stock:
          type: integer
          example: 50
    Product:
      allOf:
        - $ref: '#/components/schemas/NewProduct'
        - type: object
          properties:
            id:
              type: number
              example: 501
            shopId:
              type: number
              example: 201
            createdAt:
              type: string
              format: date-time
    ProductUpdate:
      type: object
      properties:
        name:
          type: string
        description:
          type: string
        price:
          type: number
        stock:
          type: integer
    DeliveryOrder:
      allOf:
        - $ref: '#/components/schemas/Order'
        - type: object
          properties:
            pickupAddress:
              type: string
              example: "123 Shop St, Panaji"
            dropoffAddress:
              type: string
              example: "456 Customer Ave, Panaji"
            customerName:
              type: string
              example: "Jane Doe"
    AgentEarnings:
      type: object
      properties:
        totalEarnings:
          type: number
          example: 1500.00
        totalDeliveries:
          type: integer
          example: 25
        averageDeliveryTime:
          type: string
          example: "20 minutes"
