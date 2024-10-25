import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
import Layout from "./layouts/Layout/Layout";
import Calculator from "./pages/Calculator/Calculator"; // ใช้ชื่อโฟลเดอร์แทน index.js

import Components from "./pages/Components/Components";
import Product from "./pages/Products/Products";
import Carts from "./pages/Carts/Carts";
import Animation from "./pages/Animation/Animation";
import Login from "./pages/Login/Login";

import { fetchProducts } from "./data/products";

import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(fetchProducts());
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (token === "") {
    return <Login setToken={setToken} />;
  } else {
    return (
      <div className="app-container">
        <HashRouter>
          <Routes>
            <Route element={<Layout products={products} setToken={setToken} />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/animation" element={<Animation />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/components" element={<Components />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cart" element={<Carts />} />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
