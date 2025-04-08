// src/components/Body.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Body.css';

const Body = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    let url =
      selectedCat === 'all'
        ? 'https://fakestoreapi.com/products'
        : `https://fakestoreapi.com/products/category/${selectedCat}`;

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch('https://fakestoreapi.com/products/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCat]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="body-container">
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedCat}
          onChange={(e) => setSelectedCat(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <div className="info">
              <h4>{product.title.slice(0, 50)}...</h4>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
