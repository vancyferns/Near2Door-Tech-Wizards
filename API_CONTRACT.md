<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333; }
        .container { max-width: 900px; margin: auto; }
        h1, h2, h3 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; }
        h1 { font-size: 2.5em; }
        h2 { font-size: 2em; }
        h3 { font-size: 1.5em; margin-top: 2em; }
        pre, code { background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; padding: 10px; overflow-x: auto; font-family: "Courier New", Courier, monospace; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #3498db; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .method { font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; }
        .post { background-color: #27ae60; }
        .get { background-color: #3498db; }
        .put { background-color: #f39c12; }
        .delete { background-color: #e74c3c; }
    </style>
</head>
<body>
<div class="container">
    <h1>Near2Door Full API Contract</h1>
    <p>A comprehensive API for all user roles (Customer, Shop Owner, Delivery Agent, Admin) in the Near2Door app.</p>

    <h2>Customer Endpoints</h2>
    <hr>
    <h3><span class="method post">POST</span> /auth/register</h3>
    <p><strong>Summary:</strong> Register a new customer</p>
    <p><strong>Description:</strong> Creates a new customer account.</p>
    <p><strong>Request Body:</strong> <code>CustomerRegistration</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li><strong>201 Created:</strong> User registered successfully. Returns <code>UserAuthResponse</code>.</li>
        <li><strong>400 Bad Request:</strong> Bad Request, e.g., username or email already exists.</li>
    </ul>

    <h3><span class="method post">POST</span> /auth/login</h3>
    <p><strong>Summary:</strong> User login</p>
    <p><strong>Description:</strong> Authenticates a user and returns a JWT token.</p>
    <p><strong>Request Body:</strong> <code>UserLogin</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li><strong>200 OK:</strong> Successful login. Returns <code>UserLoginResponse</code>.</li>
        <li><strong>401 Unauthorized:</strong> Unauthorized, invalid credentials.</li>
    </ul>

    <h3><span class="method get">GET</span> /shops</h3>
    <p><strong>Summary:</strong> Get all shops</p>
    <p><strong>Description:</strong> Retrieves a list of all local shops, with real-time status updates.</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li><strong>200 OK:</strong> A list of shops. Returns an array of <code>Shop</code> objects.</li>
    </ul>
    
    <h2>Shop Owner Endpoints</h2>
    <hr>
    <h3><span class="method post">POST</span> /shops/{shopId}/products</h3>
    <p><strong>Summary:</strong> Add a new product</p>
    <p><strong>Description:</strong> Allows a shop owner to add a new product to their shop. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>shopId</code> (path)</p>
    <p><strong>Request Body:</strong> <code>NewProduct</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li><strong>201 Created:</strong> Product added successfully.</li>
    </ul>

    <h2>Delivery Agent Endpoints</h2>
    <hr>
    <h3><span class="method get">GET</span> /agents/{agentId}/orders</h3>
    <p><strong>Summary:</strong> Get delivery agent's assigned orders</p>
    <p><strong>Description:</strong> Retrieves a list of orders assigned to a specific delivery agent. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>agentId</code> (path)</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li><strong>200 OK:</strong> A list of assigned orders. Returns an array of <code>DeliveryOrder</code> objects.</li>
    </ul>

    <h2>Admin Endpoints</h2>
    <hr>
    <h3><span class="method post">POST</span> /admin/auth/login</h3>
    <p><strong>Summary:</strong> Admin login</p>
    <p><strong>Description:</strong> Secure login for the admin panel.</p>
    <p><strong>Request Body:</strong> Object with <code>username</code> and <code>password</code>.</p>
    <p><strong>Responses:</strong></p>
    <ul>
        <li><strong>200 OK:</strong> Successful login.</li>
    </ul>
    
    <h2>API Data Models (Schemas)</h2>
    <hr>
    <p>These are the data structures used throughout the API.</p>
    
    <pre><code>
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
    </code></pre>
</div>
</body>
