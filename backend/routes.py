# backend/routes.py
from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from __init__ import users_col, shops_col, products_col, orders_col, agents_col, finances_col, db
import datetime

bp = Blueprint("routes", __name__)

# ---- helpers ----
def oid(id_str):
    try:
        return ObjectId(id_str)
    except Exception:
        return None

def to_jsonable(doc):
    """Convert _id to string and remove internal fields for JSON response."""
    if not doc:
        return doc
    d = dict(doc)
    if "_id" in d:
        d["id"] = str(d["_id"])
        del d["_id"]
    return d

# ---- AUTH ----
@bp.route("/auth/register", methods=["POST"])
def auth_register():
    payload = request.json or {}
    required = ["name", "email", "password"]  # minimal
    for r in required:
        if r not in payload:
            return jsonify({"error": f"{r} is required"}), 400

    # Simple uniqueness check on email
    if users_col.find_one({"email": payload["email"]}):
        return jsonify({"error": "Email already registered"}), 409

    user = {
        "name": payload["name"],
        "email": payload["email"],
        "password": payload["password"],  # NOTE: store hashed in production
        "role": payload.get("role", "customer"),
        "created_at": datetime.datetime.utcnow(),
        "meta": payload.get("meta", {}),
    }
    res = users_col.insert_one(user)
    user["id"] = str(res.inserted_id)
    del user["_id"] if "_id" in user else None
    return jsonify({"message": "registered", "user": to_jsonable(user)}), 201

@bp.route("/auth/login", methods=["POST"])
def auth_login():
    payload = request.json or {}
    email = payload.get("email")
    password = payload.get("password")
    if not email or not password:
        return jsonify({"error": "email and password required"}), 400

    user = users_col.find_one({"email": email})
    if not user or user.get("password") != password:
        return jsonify({"error": "invalid credentials"}), 401

    # NOTE: return a dummy token for now — replace with JWT in production
    token = f"dummy-token-{str(user['_id'])}"
    return jsonify({"message": "ok", "token": token, "user": to_jsonable(user)}), 200

# ---- SHOPS ----
@bp.route("/shops", methods=["GET"])
def shops_get():
    # optional query params could be status/ subscription etc.
    status = request.args.get("status")
    q = {}
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
        "owner": payload.get("owner"),
        "location": payload.get("location"),
        "status": payload.get("status", "pending"),
        "subscription": payload.get("subscription", {}),
        "created_at": datetime.datetime.utcnow(),
        "meta": payload.get("meta", {}),
    }
    res = shops_col.insert_one(shop)
    shop["id"] = str(res.inserted_id)
    return jsonify(to_jsonable(shop)), 201

@bp.route("/shops/<shop_id>", methods=["GET"])
def shops_get_by_id(shop_id):
    _id = oid(shop_id)
    if not _id:
        return jsonify({"error": "invalid shop id"}), 400
    shop = shops_col.find_one({"_id": _id})
    if not shop:
        return jsonify({"error": "not found"}), 404
    return jsonify(to_jsonable(shop)), 200

# shop's products
@bp.route("/shops/<shop_id>/products", methods=["GET"])
def shops_products_get(shop_id):
    _id = oid(shop_id)
    if not _id:
        return jsonify({"error": "invalid shop id"}), 400
    docs = list(products_col.find({"shop_id": str(shop_id)}))
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
        "price": payload["price"],
        "shop_id": str(shop_id),
        "meta": payload.get("meta", {}),
        "created_at": datetime.datetime.utcnow()
    }
    res = products_col.insert_one(product)
    product["id"] = str(res.inserted_id)
    return jsonify(to_jsonable(product)), 201

@bp.route("/shops/<shop_id>/products/<product_id>", methods=["PUT"])
def shops_products_put(shop_id, product_id):
    p_oid = oid(product_id)
    if not p_oid:
        return jsonify({"error": "invalid product id"}), 400
    payload = request.json or {}
    update = {}
    for k in ("name", "price", "meta"):
        if k in payload:
            update[k] = payload[k]
    if not update:
        return jsonify({"error": "nothing to update"}), 400
    products_col.update_one({"_id": p_oid, "shop_id": str(shop_id)}, {"$set": update})
    prod = products_col.find_one({"_id": p_oid})
    return jsonify(to_jsonable(prod)), 200

# shop's orders
@bp.route("/shops/<shop_id>/orders", methods=["GET"])
def shops_orders_get(shop_id):
    docs = list(orders_col.find({"shop_id": str(shop_id)}))
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
    orders_col.update_one({"_id": o_oid, "shop_id": str(shop_id)}, {"$set": {"status": status, "updated_at": datetime.datetime.utcnow()}})
    o = orders_col.find_one({"_id": o_oid})
    return jsonify(to_jsonable(o)), 200

# ---- ORDERS ----
@bp.route("/orders", methods=["POST"])
def orders_post():
    payload = request.json or {}
    required = ["user_id", "shop_id", "items"]
    for r in required:
        if r not in payload:
            return jsonify({"error": f"{r} required"}), 400
    order = {
        "user_id": str(payload["user_id"]),
        "shop_id": str(payload["shop_id"]),
        "items": payload["items"],  # list of {product_id, qty, price}
        "total": payload.get("total", 0),
        "status": payload.get("status", "placed"),
        "created_at": datetime.datetime.utcnow()
    }
    res = orders_col.insert_one(order)
    order["id"] = str(res.inserted_id)
    return jsonify(to_jsonable(order)), 201

@bp.route("/orders/<order_id>/delivery-status", methods=["PUT"])
def orders_delivery_status_put(order_id):
    o_oid = oid(order_id)
    if not o_oid:
        return jsonify({"error": "invalid order id"}), 400
    payload = request.json or {}
    status = payload.get("delivery_status")
    if not status:
        return jsonify({"error": "delivery_status required"}), 400
    orders_col.update_one({"_id": o_oid}, {"$set": {"delivery_status": status, "updated_at": datetime.datetime.utcnow()}})
    o = orders_col.find_one({"_id": o_oid})
    return jsonify(to_jsonable(o)), 200

# ---- AGENTS ----
@bp.route("/agents/<agent_id>/earnings", methods=["GET"])
def agents_agent_earnings(agent_id):
    # for simplicity: read from finances collection where agent_id matches
    docs = list(finances_col.find({"agent_id": str(agent_id)}))
    return jsonify([to_jsonable(d) for d in docs]), 200

@bp.route("/agents/<agent_id>/orders", methods=["GET"])
def agents_agent_orders(agent_id):
    docs = list(orders_col.find({"agent_id": str(agent_id)}))
    return jsonify([to_jsonable(d) for d in docs]), 200

# ---- ADMIN ----
@bp.route("/admin/agents", methods=["GET"])
def admin_agents_get():
    docs = list(agents_col.find({}))
    return jsonify([to_jsonable(d) for d in docs]), 200

@bp.route("/admin/shops", methods=["GET"])
def admin_shops_get():
    # optional filters
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
    shops_col.update_one({"_id": _id}, {"$set": {"status": "approved", "subscription.active": False, "updated_at": datetime.datetime.utcnow()}})
    s = shops_col.find_one({"_id": _id})
    return jsonify(to_jsonable(s)), 200

# ---- USER ORDERS ----
@bp.route("/users/<user_id>/orders", methods=["GET"])
def users_user_orders_get(user_id):
    docs = list(orders_col.find({"user_id": str(user_id)}))
    return jsonify([to_jsonable(d) for d in docs]), 200

# ---- MISC / ADMIN FINANCES ----
@bp.route("/admin/finances", methods=["GET"])
def admin_finances_get():
    docs = list(finances_col.find({}))
    return jsonify([to_jsonable(d) for d in docs]), 200

# ---- fallback for unimplemented routes: helpful response ----
@bp.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Near2Door minimal API (subset implemented). See /api documentation."}), 200
