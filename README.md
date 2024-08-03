## Overview

This project is a comprehensive Supermarket Management System developed as a mini-project for the Web Technologies and Applications (IT254) course. It's designed to manage various aspects of a supermarket, including inventory, customer interactions, and order processing.

## Features

- Supermarket Management: Manage categories, brands, vendors, products, and inventories
- Customer Experience: Browse products, add to cart, view order history, and place new orders
- Inventory Management: Track stock levels, update product quantities, and monitor low-stock items
- User Authentication: Secure sign-up and login functionality using Firebase Authentication

## Technology Stack

- Backend: Flask (Python web framework)
- Frontend: React.js with TailwindCSS
- Database: MySQL
- Authentication: Firebase

## System Architecture

The application follows a client-server architecture:
- Frontend: React.js with TailwindCSS, communicating with the backend via HTTP requests
- Backend: Flask application handling data processing and database interactions
- Database: MySQL storing data related to products, inventory, orders, and users

## Setup and Installation

### Prerequisites

- Python 3.7+
- Node.js and npm
- MySQL

### Backend Setup

1. Clone the repository:
git clone https://github.com/your-repo/supermarket-web-app.git
cd supermarket-web-app
Copy
2. Set up a virtual environment:
python -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
Copy
3. Install Python dependencies:
pip install -r requirements.txt
Copy
4. Set up the MySQL database:
- Create a new MySQL database
- Update the database configuration in `app.py` with your credentials

5. Initialize the database:
flask db upgrade

### Frontend Setup

1. Navigate to the frontend directory:
cd frontend
Copy
2. Install Node.js dependencies:
npm install
Copy
3. Set up Firebase:
- Create a new Firebase project
- Add a web app to your Firebase project
- Copy the Firebase configuration to `src/firebase-config.js`

## Running the Application

1. Start the Flask backend:
cd /path/to/supermarket-web-app
source venv/bin/activate  # On Windows use venv\Scripts\activate
flask run
Copy
2. In a new terminal, start the React frontend:
cd /path/to/supermarket-web-app/frontend
npm start
3. Access the application at `http://localhost:3000`

## Key Components

### Backend (Flask)

- Handles routes for various operations (categories, brands, vendors, products, cart, orders)
- Communicates with MySQL database using flask_mysqldb
- Implements modular approach for code organization and maintainability

### Frontend (React.js)

- Key components: Header, ProductDisplay, Cart, Orders, OrderDetailsModal
- Uses fetch API for backend communication
- Implements responsive design for various screen sizes

### Authentication

- Utilizes Firebase Authentication
- Implements sign-up and login functionality
- Uses react-firebase-hooks/auth for managing authentication state

## Future Enhancements

1. Advanced inventory management features (stock alerts, automatic reordering)
2. Integration with shipping providers for order fulfillment and tracking
3. Secure payment gateway integration
4. Performance optimizations (caching, query optimization, asynchronous processing)
5. Enhanced Firebase integration (Realtime Database or Cloud Firestore)

## Contributors

- Abhay Aniruddha (221IT001)
- Abhay Lejith (221IT002)
- Sudeep YM (221IT068)

## Institution

Department of Information Technology
National Institute of Technology Karnataka, Surathkal, Mangalore - 575025
