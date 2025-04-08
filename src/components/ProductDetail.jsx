// src/components/ProductDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CardContext';
import './ProductDetail.css'; // Optional CSS for styling

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p style={{ padding: '1rem' }}>Loading...</p>;
  if (!product) return <p style={{ padding: '1rem' }}>Product not found.</p>;

  return (
    <div className="product-detail">
      <img src={product.image} alt={product.title} className="detail-img" />
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="desc">{product.description}</p>
        <button onClick={() => addToCart(product)} className="add-btn">
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
