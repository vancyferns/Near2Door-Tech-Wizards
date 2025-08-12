# backend/app.py
from __init__ import create_app

app = create_app()

if __name__ == "__main__":
    # debug True for development, set False for production
    app.run(host="0.0.0.0", port=5000, debug=True)
