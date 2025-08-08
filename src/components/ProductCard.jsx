import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || ""
  );
  console.log("Rendering:", product?.title);
  return (
    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div className="card text-center h-100">
        <img
          className="card-img-top p-3"
          src={product.image}
          alt={product.title}
          height={300}
        />
        <div className="card-body">
          <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
          <p className="card-text">{product.description.substring(0, 90)}...</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item lead">$ {product.price}</li>
          {product.variants && (
            <li className="list-group-item">
              <select
                className="form-select"
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
              >
                {product.variants.map((variant) => (
                  <option key={variant} value={variant}>
                    {variant}
                  </option>
                ))}
              </select>
            </li>
          )}
        </ul>
        <div className="card-body">
          <Link to={"/product/" + product.id} className="btn btn-dark m-1">
            Buy Now
          </Link>
          {product.inStock ? (
            <button
              className="btn btn-dark m-1"
              onClick={() => {
                toast.success("Added to cart");
                onAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-secondary m-1" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
