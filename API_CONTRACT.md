<div style="max-width: 900px; margin: auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
    <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; font-size: 2.5em;">Near2Door Full API Contract</h1>
    <p>A comprehensive API for all user roles (Customer, Shop Owner, Delivery Agent, Admin) in the Near2Door app.</p>

    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; font-size: 2em;">Customer Endpoints</h2>
    <hr style="border: 0; height: 1px; background-color: #ddd;">
    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #27ae60;">POST</span> /auth/register</h3>
    <p><strong>Summary:</strong> Register a new customer</p>
    <p><strong>Description:</strong> Creates a new customer account.</p>
    <p><strong>Request Body:</strong> <code>CustomerRegistration</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>201 Created:</strong> User registered successfully. Returns <code>UserAuthResponse</code>.</li>
        <li><strong>400 Bad Request:</strong> Bad Request, e.g., username or email already exists.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #27ae60;">POST</span> /auth/login</h3>
    <p><strong>Summary:</strong> User login</p>
    <p><strong>Description:</strong> Authenticates a user and returns a JWT token.</p>
    <p><strong>Request Body:</strong> <code>UserLogin</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Successful login. Returns <code>UserLoginResponse</code>.</li>
        <li><strong>401 Unauthorized:</strong> Unauthorized, invalid credentials.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /shops</h3>
    <p><strong>Summary:</strong> Get all shops</p>
    <p><strong>Description:</strong> Retrieves a list of all local shops, with real-time status updates.</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of shops. Returns an array of <code>Shop</code> objects.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /shops/{shopId}</h3>
    <p><strong>Summary:</strong> Get a single shop</p>
    <p><strong>Description:</strong> Retrieves details for a specific shop by its ID.</p>
    <p><strong>Parameters:</strong> <code>shopId</code> (path, integer)</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Details of the requested shop. Returns a <code>ShopDetails</code> object.</li>
        <li><strong>404 Not Found:</strong> Shop not found.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #27ae60;">POST</span> /orders</h3>
    <p><strong>Summary:</strong> Create a new order</p>
    <p><strong>Description:</strong> Places a new order from a customer. Requires authentication.</p>
    <p><strong>Request Body:</strong> <code>NewOrder</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>201 Created:</strong> Order placed successfully.</li>
        <li><strong>401 Unauthorized:</strong> Unauthorized, authentication required.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /users/{userId}/orders</h3>
    <p><strong>Summary:</strong> Get customer's orders</p>
    <p><strong>Description:</strong> Retrieves a list of all orders placed by the authenticated user.</p>
    <p><strong>Parameters:</strong> <code>userId</code> (path, integer)</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of customer orders. Returns an array of <code>Order</code> objects.</li>
    </ul>

    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; font-size: 2em;">Shop Owner Endpoints</h2>
    <hr style="border: 0; height: 1px; background-color: #ddd;">
    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #27ae60;">POST</span> /shops/{shopId}/products</h3>
    <p><strong>Summary:</strong> Add a new product</p>
    <p><strong>Description:</strong> Allows a shop owner to add a new product to their shop. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>shopId</code> (path, integer)</p>
    <p><strong>Request Body:</strong> <code>NewProduct</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>201 Created:</strong> Product added successfully.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /shops/{shopId}/products</h3>
    <p><strong>Summary:</strong> Get a shop's products</p>
    <p><strong>Description:</strong> Retrieves all products for a specific shop, including stock status.</p>
    <p><strong>Parameters:</strong> <code>shopId</code> (path, integer)</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of products. Returns an array of <code>Product</code> objects.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #f39c12;">PUT</span> /shops/{shopId}/products/{productId}</h3>
    <p><strong>Summary:</strong> Update a product</p>
    <p><strong>Description:</strong> Updates the details or inventory of a specific product. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>shopId</code>, <code>productId</code> (path, integer)</p>
    <p><strong>Request Body:</strong> <code>ProductUpdate</code> schema</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Product updated successfully.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /shops/{shopId}/orders</h3>
    <p><strong>Summary:</strong> Get a shop's orders</p>
    <p><strong>Description:</strong> Retrieves all pending, active, and completed orders for a specific shop. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>shopId</code> (path, integer)</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of orders. Returns an array of <code>Order</code> objects.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #f39c12;">PUT</span> /shops/{shopId}/orders/{orderId}/status</h3>
    <p><strong>Summary:</strong> Update order status</p>
    <p><strong>Description:</strong> Allows a shop owner to confirm or cancel an order. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>shopId</code>, <code>orderId</code> (path, integer)</p>
    <p><strong>Request Body:</strong> Object with a `status` field (`accepted` or `cancelled`).</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Order status updated.</li>
    </ul>

    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; font-size: 2em;">Delivery Agent Endpoints</h2>
    <hr style="border: 0; height: 1px; background-color: #ddd;">
    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /agents/{agentId}/orders</h3>
    <p><strong>Summary:</strong> Get delivery agent's assigned orders</p>
    <p><strong>Description:</strong> Retrieves a list of orders assigned to a specific delivery agent. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>agentId</code> (path, integer)</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of assigned orders. Returns an array of <code>DeliveryOrder</code> objects.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #f39c12;">PUT</span> /orders/{orderId}/delivery-status</h3>
    <p><strong>Summary:</strong> Update order delivery status</p>
    <p><strong>Description:</strong> Allows a delivery agent to update the status of an order (e.g., picked up, in transit, delivered). Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>orderId</code> (path, integer)</p>
    <p><strong>Request Body:</strong> Object with a `status` field (`picked_up`, `in_transit`, or `delivered`).</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Delivery status updated.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /agents/{agentId}/earnings</h3>
    <p><strong>Summary:</strong> Get delivery agent's earnings</p>
    <p><strong>Description:</strong> Retrieves the earning history and performance metrics for a delivery agent. Requires authentication.</p>
    <p><strong>Parameters:</strong> <code>agentId</code> (path, integer)</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Agent earnings and performance metrics. Returns an <code>AgentEarnings</code> object.</li>
    </ul>

    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; font-size: 2em;">Admin Endpoints</h2>
    <hr style="border: 0; height: 1px; background-color: #ddd;">
    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #27ae60;">POST</span> /admin/auth/login</h3>
    <p><strong>Summary:</strong> Admin login</p>
    <p><strong>Description:</strong> Secure login for the admin panel.</p>
    <p><strong>Request Body:</strong> Object with `username` and `password`.</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Successful login.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /admin/shops</h3>
    <p><strong>Summary:</strong> Get all shops for admin review</p>
    <p><strong>Description:</strong> Retrieves a list of all shops with filter options.</p>
    <p><strong>Parameters:</strong> <code>status</code> (query, optional), `subscription` (query, optional).</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of shops for the admin panel.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #f39c12;">PUT</span> /admin/shops/{shopId}/approve</h3>
    <p><strong>Summary:</strong> Approve a pending shop</p>
    <p><strong>Description:</strong> Approves a shop and sets its subscription to inactive.</p>
    <p><strong>Parameters:</strong> <code>shopId</code> (path, integer)</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Shop approved successfully.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /admin/agents</h3>
    <p><strong>Summary:</strong> Get all delivery agents</p>
    <p><strong>Description:</strong> Retrieves a list of all delivery agents for management.</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of delivery agents.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /admin/orders</h3>
    <p><strong>Summary:</strong> Get all system orders</p>
    <p><strong>Description:</strong> Retrieves a list of all orders across the platform for tracking and management.</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> A list of all orders.</li>
    </ul>

    <h3 style="font-size: 1.5em; margin-top: 2em;"><span style="font-weight: bold; padding: 5px 10px; border-radius: 4px; color: white; display: inline-block; background-color: #3498db;">GET</span> /admin/finances</h3>
    <p><strong>Summary:</strong> Get financial overview</p>
    <p><strong>Description:</strong> Retrieves financial data including revenue, payments, and commissions.</p>
    <p><strong>Responses:</strong></p>
    <ul style="list-style-type: none; padding-left: 20px;">
        <li><strong>200 OK:</strong> Financial data.</li>
    </ul>

    <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px; font-size: 2em;">API Data Models (Schemas)</h2>
    <hr style="border: 0; height: 1px; background-color: #ddd;">
    <p>These are the data structures used throughout the API.</p>

    <pre style="background-color: #f4f4f4; border: 1px solid #ddd; border-radius: 4px; padding: 10px; overflow-x: auto; font-family: 'Courier New', Courier, monospace;"><code>
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
