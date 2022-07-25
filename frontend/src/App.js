import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from 'react-router-dom';
import DetailProduct from './pages/admin/products/DetailProduct';
import FormProduct from './pages/admin/products/FormProduct';
import Product from './pages/admin/products/Product';
import Categories from './pages/admin/categories/Categories';
import FormCategories from './pages/admin/categories/FormCategories';
import Login from './pages/admin/login';
import ResetPassword from './pages/admin/reset';
import HomeAdmin from './pages/admin/home-admin';
import ManageUsers from "./pages/admin/Manage/manage-users";
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import DetailProductUser from "./pages/user/DetailProductUser";
import AddAdmin from "./pages/admin/Manage/add-admin";
import NewOrder from "./pages/admin/orders/new-order";
import AllOrders from "./pages/admin/orders/all-orders";
import { GET_ADMIN_DATA, GET_USER_DATA, LOADING_END, LOADING_START } from './redux/actions/types'
import Reports from "./pages/admin/report";
import Stockopname from "./pages/admin/stockopname/Stockopname";
import AddStock from "./pages/admin/stockopname/AddStock";
import Cart from "./pages/user/Cart";
import About from "./pages/user/About";
import UserRegister from "./pages/user/Register"
import ForgotPassword from "./pages/user/component/ForgotPassword"
import ResetPasswordUser from "./pages/user/ResetPassword";
import UserLogin from "./pages/user/Login";
import Verification from "./pages/user/Verification";

function App() {
  const API_URL = process.env.REACT_APP_API_URL
  const dispatch = useDispatch()
  const token = localStorage.getItem("tokenAdmin")

  useEffect(() => {
    dispatch({ type: LOADING_START })
    axios.get(API_URL + '/admin/keep-login', { headers: { "authToken": token } })
      .then((resp) => {
        dispatch({ type: LOADING_END })
        dispatch({ type: GET_ADMIN_DATA, payload: resp.data })
      })
      .catch((err) => {
        dispatch({ type: LOADING_END })
        console.log(`error when keep login:`, err);
      })

    axios.get(API_URL + '/user', { headers: { "authorization": token } })
      .then((resp) => {
        dispatch({ type: LOADING_END })
        dispatch({ type: GET_USER_DATA, payload: resp.data })
      })
      .catch((err) => {
        dispatch({ type: LOADING_END })
        console.log(`error when keep login:`, err);
      })
  }, [0])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail-product/:id" element={<DetailProductUser />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPasswordUser />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/add-admin" element={<AddAdmin />} />
        <Route path="/admin/users-list" element={<ManageUsers />} />
        <Route path="/admin/orders/new-order" element={<NewOrder />} />
        <Route path="/admin/orders/all-orders" element={<AllOrders />} />
        <Route path="/admin/reset/:adminname/reset/:emailAdmin" element={<ResetPassword />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/edit-product/:id" element={<FormProduct />} />
        <Route path="/admin/add-product" element={<FormProduct />} />
        <Route path="/admin/detail-product/:id" element={<DetailProduct />} />
        <Route path="/admin/categories/" element={<Categories />} />
        <Route path="/admin/add-category/" element={<FormCategories />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/stockopname/" element={<Stockopname />} />
        <Route path="/admin/add-stock/" element={<AddStock />} />
      </Routes>
    </div>
  );
}

export default App;
