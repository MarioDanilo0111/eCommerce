import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCard from "./ProductCard";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      const products = await response.json();
      setData(products);
      setFilter(products);
      setLoading(false);
    };

    getProducts();
  }, []);

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>

      <div className="buttons text-center py-3">
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => setFilter(data)}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="btn btn-outline-dark btn-sm m-2"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>

      <div className="row justify-content-center">
        {loading ? (
          <div>Loading...</div>
        ) : (
          filter.map((product) => {
            const enhancedProduct = {
              ...product,
              variants: ["S", "M", "L"],
              inStock: product.rating?.count > 100,
            };

            return (
              <ProductCard
                key={product.id}
                product={enhancedProduct}
                onAddToCart={addProduct}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Products;
