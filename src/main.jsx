import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BlogList from './components/BlogList.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BlogDetailPage from './components/BlogDetailPage.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><BlogList/></ProtectedRoutes>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/blog-detail",
    element:<ProtectedRoutes><BlogDetailPage/></ProtectedRoutes> ,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
   <RouterProvider router={router} />
  </React.StrictMode>,
)
