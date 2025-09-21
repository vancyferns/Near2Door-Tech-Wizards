# Near2Door-Tech-Wizards

## Project Overview

**Near2Door-Tech-Wizards** is a hyperlocal e-commerce platform designed to connect customers, local shops, and delivery agents within Goa, India. The project aims to solve the challenges faced by small local businesses in reaching nearby customers, streamline the delivery process, and provide a seamless shopping experience for users.

### What Problem Does It Solve?

- **Local Shop Visibility:** Many small shops struggle to reach customers online. Near2Door provides a digital storefront for these shops, increasing their visibility and sales.
- **Efficient Local Delivery:** By connecting local delivery agents, the platform ensures fast and reliable delivery within neighborhoods, reducing wait times and supporting local employment.
- **Customer Convenience:** Customers can browse nearby shops, compare products, and place orders for quick delivery, all from a single platform.
- **Admin Oversight:** The platform includes admin tools for approving shops and agents, monitoring activity, and ensuring quality service.

### Who Is It For?

- **Customers:** Wanting to shop locally and get fast delivery.
- **Shop Owners:** Looking to expand their reach and manage orders online.
- **Delivery Agents:** Seeking flexible work delivering goods in their area.
- **Admins:** Overseeing platform operations and quality.

## Features

- **User Authentication:** Register and login as customer, shop, agent, or admin.
- **Shop Management:** Add/edit products, manage orders, update shop profile.
- **Order Management:** Place orders, assign delivery agents, track status.
- **Delivery Tracking:** Live map tracking for agents and customers.
- **Admin Dashboard:** Approve shops/agents, view platform statistics.

## Project Structure

```
.
├── backend/           # Flask backend API
│   ├── __init__.py
│   ├── app.py
│   ├── db.py
│   ├── routes.py
│   ├── requirements.txt
│   └── .env
├── frontend/          # React frontend (Vite)
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── API_CONTRACT.md    # API documentation
├── instructions.md    # Setup and troubleshooting guide
└── README.md          # This file
```

## Getting Started

### Backend (Flask)

1. **Install dependencies:**
   ```sh
   cd backend
   pip install -r requirements.txt
   ```
2. **Start the server:**
   ```sh
   python app.py
   ```
   The backend runs at `http://127.0.0.1:5000`.

### Frontend (React + Vite)

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The frontend runs at `http://localhost:5173`.

3. **Open in browser:**
   ```sh
   $BROWSER http://localhost:5173
   ```

### API Documentation

See [API_CONTRACT.md](API_CONTRACT.md) for endpoint details.

## Troubleshooting

See [instructions.md](instructions.md) for setup steps and common issues.

## License

This project is for educational purposes.