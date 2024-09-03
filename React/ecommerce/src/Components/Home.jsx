import React, { useEffect, useState, useContext } from "react";
import Card from "./Card.jsx";
import ShimmerUI from "./ShimmerUI.jsx";
import { ThemeStore } from "./ThemeContext.jsx";

const Home = () => {
  const [allProducts, setAllProducts] = useState(null);
  const [products, setProducts] = useState(null);
  const [query, setQuery] = useState("");

  const { theme, setTheme } = useContext(ThemeStore);

  let handleTopRated = () => {
    let filteredData = allProducts.filter((obj) => obj.rating > 4);
    setProducts(filteredData);
  };

  let handleCategory = (category) => {
    let filteredData = allProducts.filter((obj) => obj.category === category);
    setProducts(filteredData);
  };

  let handleSearch = () => {
    let filteredData = allProducts.filter((obj) =>
      obj.title.toLowerCase().includes(query.toLowerCase().trim())
    );
    setProducts(filteredData);
    setQuery("");
  };

  let handleLowest_Highest = () => {
    let sortedData = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedData);
  };
  let handleHighest_Lowest = () => {
    let sortedData = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedData);
  };

  let getdata = async () => {
    let data = await fetch("https://dummyjson.com/products");
    let productData = await data.json();
    setAllProducts(productData.products);
    setProducts(productData.products);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className={theme === "light" ? "bg-gray-100" : "bg-slate-400"}>
      <div className="flex justify-around items-center w-full h-16">
        
        <button
          className="btn btn-active btn-accent"
          onClick={() => handleCategory("furniture")}
        >
          Furniture
        </button>
        <button
          className="btn btn-active btn-accent"
          onClick={() => handleCategory("groceries")}
        >
          Groceries
        </button>
        
        <button
          className="btn btn-active btn-accent"
          onClick={() => handleCategory("beauty")}
        >
          Beauty
        </button>

        <button onClick={handleTopRated} className="btn btn-active btn-accent">
          Top rated
        </button>
        <button
          className="btn btn-active btn-accent"
          onClick={handleLowest_Highest}
        >
          Lowest-Highest
        </button>
        <button
          className="btn btn-active btn-accent"
          onClick={handleHighest_Lowest}
        >
          Highest-Lowest
        </button>
        <div className="search flex justify-around items-center w-1/5">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn btn-info" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-around flex-wrap">
        {products === null ? (
          <ShimmerUI />
        ) : (
          products.map((obj) => (
            <Card key={obj.id} productObj={obj} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
