from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from db import users_col, shops_col, products_col, orders_col, agents_col, finances_col
import datetime

bp = Blueprint("routes", __name__)

# ---- helpers ----
def oid(id_str):
    """Convert a string to a MongoDB ObjectId, returns None if invalid."""
    try:
        return ObjectId(id_str)
    except Exception:
        return None

def to_jsonable(doc):
    """Recursively convert _id to id and remove internal fields for JSON response."""
    if isinstance(doc, list):
        return [to_jsonable(item) for item in doc]
    if isinstance(doc, dict):
        d = {}
        for key, value in doc.items():
            if key == '_id':
                d['id'] = str(value)
            elif isinstance(value, (list, dict)):
                d[key] = to_jsonable(value)
            else:
                d[key] = value
        return d
    return doc

# ---- AUTH ----
@bp.route("/auth/register", methods=["POST"])
def auth_register():
    try:
        payload = request.json or {}
        required = ["name", "email", "password"]
        for r in required:
            if r not in payload:
                return jsonify({"error": f"{r} is required"}), 400

        if users_col.find_one({"email": payload["email"]}):
            return jsonify({"error": "Email already registered"}), 409

        user = {
            "name": payload["name"],
            "email": payload["email"],
            "password": payload["password"],
            "role": payload.get("role", "customer"),
            "created_at": datetime.datetime.utcnow(),
            "meta": payload.get("meta", {}),
        }
        res = users_col.insert_one(user)
        # Add the ID to the user object before returning
        user['id'] = str(res.inserted_id)
        return jsonify({"message": "registered", "user": to_jsonable(user)}), 201
    except Exception as e:
        # Catch any exceptions and return a 500 error with a descriptive message
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@bp.route("/auth/login", methods=["POST"])
def auth_login():
    try:
        payload = request.json or {}
        email = payload.get("email")
        password = payload.get("password")
        if not email or not password:
            return jsonify({"error": "email and password required"}), 400

        user = users_col.find_one({"email": email})
        if not user or user.get("password") != password:
            return jsonify({"error": "invalid credentials"}), 401

        token = f"dummy-token-{str(user['_id'])}"
        return jsonify({"message": "ok", "token": token, "user": to_jsonable(user)}), 200
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

# ---- SHOPS ----
@bp.route("/shops", methods=["GET"])
def shops_get():
    status = request.args.get("status")
    q = {"status": "open"}
    if status:
        q["status"] = status
    docs = list(shops_col.find(q))
    return jsonify([to_jsonable(d) for d in docs]), 200

@bp.route("/shops", methods=["POST"])
def shops_post():
    payload = request.json or {}
    if not payload.get("name"):
        return jsonify({"error": "name is required"}), 400
    shop = {
        "name": payload["name"],
        "owner_id": payload.get("ownerId"),
        "location": payload.get("location"),
        "status": payload.get("status", "pending"),
        "subscription": payload.get("subscription", {}),
        "created_at": datetime.datetime.utcnow(),
        "meta": payload.get("meta", {}),
    }
    res = shops_col.insert_one(shop)
    new_shop_doc = shops_col.find_one({"_id": res.inserted_id})
    return jsonify(to_jsonable(new_shop_doc)), 201

@bp.route("/shops/<shop_id>", methods=["GET"])
def shops_get_by_id(shop_id):
    _id = oid(shop_id)
    if not _id:
        return jsonify({"error": "invalid shop id"}), 400
    shop = shops_col.find_one({"_id": _id})
    if not shop:
        return jsonify({"error": "not found"}), 404

    products_docs = list(products_col.find({"shop_id": shop_id}))
    shop['products'] = products_docs

    return jsonify(to_jsonable(shop)), 200

# shop's products
@bp.route("/shops/<shop_id>/products", methods=["GET"])
def shops_products_get(shop_id):
    _id = oid(shop_id)
    if not _id:
        return jsonify({"error": "invalid shop id"}), 400
    docs = list(products_col.find({"shop_id": shop_id}))
    return jsonify([to_jsonable(d) for d in docs]), 200

@bp.route("/shops/<shop_id>/products", methods=["POST"])
def shops_products_post(shop_id):
    _id = oid(shop_id)
    if not _id:
        return jsonify({"error": "invalid shop id"}), 400
    payload = request.json or {}
    if not payload.get("name") or payload.get("price") is None:
        return jsonify({"error": "name and price required"}), 400
    product = {
        "name": payload["name"],
        "description": payload.get("description"),
        "price": payload["price"],
        "stock": payload.get("stock"),
        "shop_id": shop_id,
        "created_at": datetime.datetime.utcnow()
    }
    res = products_col.insert_one(product)
    return jsonify(to_jsonable(product)), 201

@bp.route("/shops/<shop_id>/products/<product_id>", methods=["PUT"])
def shops_products_put(shop_id, product_id):
    p_oid = oid(product_id)
    if not p_oid:
        return jsonify({"error": "invalid product id"}), 400
    payload = request.json or {}
    update = {}
    for k in ("name", "description", "price", "stock"):
        if k in payload:
            update[k] = payload[k]
    if not update:
        return jsonify({"error": "nothing to update"}), 400

    result = products_col.update_one({"_id": p_oid, "shop_id": shop_id}, {"$set": update})
    if result.matched_count == 0:
        return jsonify({"error": "Product not found or does not belong to the shop"}), 404

    prod = products_col.find_one({"_id": p_oid})
    return jsonify(to_jsonable(prod)), 200

# shop's orders
@bp.route("/shops/<shop_id>/orders", methods=["GET"])
def shops_orders_get(shop_id):
    _id = oid(shop_id)
    if not _id:
        return jsonify({"error": "invalid shop id"}), 400
    docs = list(orders_col.find({"shop_id": shop_id}))
    return jsonify([to_jsonable(d) for d in docs]), 200

@bp.route("/shops/<shop_id>/orders/<order_id>/status", methods=["PUT"])
def shops_shop_order_status_put(shop_id, order_id):
    o_oid = oid(order_id)
    if not o_oid:
        return jsonify({"error": "invalid order id"}), 400
    payload = request.json or {}
    status = payload.get("status")
    if not status:
        return jsonify({"error": "status required"}), 400

    result = orders_col.update_one({"_id": o_oid, "shop_id": shop_id}, {"$set": {"status": status, "updated_at": datetime.datetime.utcnow()}})
    if result.matched_count == 0:
        return jsonify({"error": "Order not found or does not belong to the shop"}), 404

    o = orders_col.find_one({"_id": o_oid})
    return jsonify(to_jsonable(o)), 200

# ---- ORDERS ----
@bp.route("/orders", methods=["POST"])
def orders_post():
    payload = request.json or {}
    required = ["customer_id", "shop_id", "items"]
    for r in required:
        if r not in payload:
            return jsonify({"error": f"{r} required"}), 400

    shop = shops_col.find_one({'_id': oid(payload.get('shop_id'))})
    if not shop:
        return jsonify({"error": "Shop not found"}), 404

    total_price = payload.get('delivery_fee', 0)
    for item in payload.get("items", []):
        total_price += item.get("price", 0) * item.get("quantity", 0)

    order = {
        "customer_id": payload["customer_id"],
        "shop_id": payload["shop_id"],
        "items": payload["items"],
        "total_price": total_price,
        "status": "pending",
        "created_at": datetime.datetime.utcnow()
    }
    res = orders_col.insert_one(order)
    return jsonify(to_jsonable(order)), 201

@bp.route("/orders/<order_id>/delivery-status", methods=["PUT"])
def orders_delivery_status_put(order_id):
    o_oid = oid(order_id)
    if not o_oid:
        return jsonify({"error": "invalid order id"}), 400
    payload = request.json or {}
    status = payload.get("status")
    if not status:
        return jsonify({"error": "status required"}), 400

    result = orders_col.update_one({"_id": o_oid}, {"$set": {"status": status, "updated_at": datetime.datetime.utcnow()}})
    if result.matched_count == 0:
        return jsonify({"error": "Order not found"}), 404

    o = orders_col.find_one({"_id": o_oid})
    return jsonify(to_jsonable(o)), 200

# ---- AGENTS ----
@bp.route("/agents/<agent_id>/earnings", methods=["GET"])
def agents_agent_earnings(agent_id):
    docs = list(finances_col.find({"agent_id": agent_id}))
    # Simplified mock data for earnings, as no finance data is stored in DB
    return jsonify({"totalEarnings": 1000, "totalDeliveries": len(docs), "averageDeliveryTime": "30 minutes"}), 200

@bp.route("/agents/<agent_id>/orders", methods=["GET"])
def agents_agent_orders(agent_id):
    docs = list(orders_col.find({"agent_id": agent_id}))
    return jsonify([to_jsonable(d) for d in docs]), 200

# ---- ADMIN ----
@bp.route("/admin/agents", methods=["GET"])
def admin_agents_get():
    docs = list(agents_col.find({}))
    return jsonify([to_jsonable(d) for d in docs]), 200

@bp.route("/admin/shops", methods=["GET"])
def admin_shops_get():
    status = request.args.get("status")
    subscription = request.args.get("subscription")
    q = {}
    if status:
        q["status"] = status
    if subscription:
        q["subscription.status"] = subscription
    docs = list(shops_col.find(q))
    return jsonify([to_jsonable(d) for d in docs]), 200

@bp.route("/admin/shops/<shop_id>/approve", methods=["PUT"])
def admin_shops_approve(shop_id):
    _id = oid(shop_id)
    if not _id:
        return jsonify({"error": "invalid shop id"}), 400

    result = shops_col.update_one({"_id": _id}, {"$set": {"status": "open", "updated_at": datetime.datetime.utcnow()}})
    if result.matched_count == 0:
        return jsonify({"error": "Shop not found"}), 404

    s = shops_col.find_one({"_id": _id})
    return jsonify(to_jsonable(s)), 200

# ---- USER ORDERS ----
@bp.route("/users/<user_id>/orders", methods=["GET"])
def users_user_orders_get(user_id):
    docs = list(orders_col.find({"customer_id": user_id}))
    return jsonify([to_jsonable(d) for d in docs]), 200

# ---- MISC / ADMIN FINANCES ----
@bp.route("/admin/finances", methods=["GET"])
def admin_finances_get():
    total_orders = orders_col.count_documents({})
    total_revenue = sum(o.get('total_price', 0) for o in orders_col.find({}))
    total_commission = total_revenue * 0.1 # Example commission rate
    return jsonify({"totalOrders": total_orders, "totalRevenue": total_revenue, "totalCommission": total_commission}), 200

# ---- fallback for unimplemented routes: helpful response ----
@bp.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Near2Door minimal API (subset implemented). See /api documentation."}), 200