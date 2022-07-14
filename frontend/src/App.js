import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { combineReducers, createStore } from "redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailProduct from './pages/admin/products/DetailProduct';
import FormProduct from './pages/admin/products/FormProduct';
import Product from './pages/admin/products/Product';
import Categories from './pages/admin/categories/Categories';
import FormCategories from './pages/admin/categories/FormCategories';
import Login from './pages/admin/login';
import ResetPassword from './pages/admin/reset';
import HomeAdmin from './pages/admin/home-admin';
import ManageUsers from "./pages/admin/Manage/manage-users";
import { GET_ADMIN_DATA } from './redux/actions/types'
import Home from "./pages/user/Home";
import Products from "./pages/user/Products";
import DetailProductUser from "./pages/user/DetailProductUser";


function App() {
  // const API_URL = process.env.REACT_APP_API_URL
  const loading = useSelector((state) => state.loading.loading)
  // console.log(`loading at MainApp:`, loading);
  const dispatch = useDispatch()
  const token = localStorage.getItem("tokenAdmin")

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/keep-login',
      { headers: { "authToken": token } })
      .then((resp) => {
        console.log(`respond when keep login:`, resp.data);
        dispatch({ type: GET_ADMIN_DATA, payload: resp.data })
      })
      .catch((err) => {
        console.log(`error when keep login:`, err);
      })
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/detail-product/:id" element={<DetailProductUser />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/reset/:adminname/reset/:emailAdmin" element={<ResetPassword />} />
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/edit-product/:id" element={<FormProduct />} />
        <Route path="/admin/add-product" element={<FormProduct />} />
        <Route path="/admin/detail-product/:id" element={<DetailProduct />} />
        <Route path="/admin/categories/" element={<Categories />} />
        <Route path="/admin/add-category/" element={<FormCategories />} />
      </Routes>
    </div>
  );
}

export default App;
