import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css"

import App from './App'
import Login from './components/Login'
import SignUp  from './components/SignUp';
import ProductDisplay from './components/ProductDisplay';
import Cart from './components/Cart';
import Orders from './components/Orders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/SignUp",
    element: <SignUp/>
  },
  {
    path: "/products/:category",
    element: <ProductDisplay/>
  },
  {
    path: "/Cart",
    element: <Cart/>
  },
  {
    path: "/Orders",
    element: <Orders/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
