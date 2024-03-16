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
import Profile from './components/Profile';
import Orders from './components/Orders';
import Owner from './components/Owner';
import { auth } from "../src/firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const AuthenticatedRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  return user ? element : navigate("/");
};

const AuthenticatedRouteOwner = ({ element, ...rest }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  return user ? user.email==="admin@gmail.com"?element : navigate("/"):navigate("/");
};

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
    element:<AuthenticatedRoute element={<Cart />} />
  },
  {
    path: "/Orders",
    element: <AuthenticatedRoute element={<Orders/>} />
  },
  {
    path: "/Profile",
    element: <AuthenticatedRoute element={<Profile/>} />
  },
  {
    path: "/Owner",
    element: <AuthenticatedRouteOwner element={<Owner/>} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
