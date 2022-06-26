import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DetailProduct from './pages/admin/products/DetailProduct';
import FormProduct from './pages/admin/products/FormProduct';
import Product from './pages/admin/products/Product';
import Categories from './pages/admin/categories/Categories';
import FormCategories from './pages/admin/categories/FormCategories';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/product" element={<Product />} />
        <Route path="/admin/edit-product/:id" element={<FormProduct />} />
        <Route path="/admin/add-product" element={<FormProduct />} />
        <Route path="/admin/detail-product/:id" element={<DetailProduct />} />
        <Route path="/admin/categories/" element={<Categories />} />
        <Route path="/admin/add-category/" element={<FormCategories />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
