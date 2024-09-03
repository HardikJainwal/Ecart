import { useState } from "react";
import { useParams } from "react-router-dom";
import useProductData from "../useProductData";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { addCart } from "../Store/CartSlice";
import PpShimmer from "./PpShimmer"; // Import ShimmerUI component

const ProductPage = () => {
  const { id } = useParams();
  const [openIdx, setOpenIdx] = useState(null);

  let data = useProductData(id);
  let dispatch = useDispatch(); 

  if (data == null) {
    return <PpShimmer/>; // Use ShimmerUI component for loading state
  }

  let { thumbnail, title, price, category, rating, brand, reviews, description } = data;

  return (
    <div className="w-screen h-screen">
      <div>
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img src={thumbnail} alt="Product" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl">{title}</h2>
            <p className="card-text text-2xl">{description}</p>
            <p className="card-text text-2xl">Price: {price}</p>
            <p className="card-text text-2xl">Rating: {rating}</p>
            <p className="card-text text-2xl">Brand: {brand}</p>
            <p className="card-text text-2xl">Category: {category}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => dispatch(addCart(data))}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-400 max-w-full h-1/2 mx-auto my-2">
        {reviews.map((review, idx) => (
          <Comment
            key={idx}
            review={review}
            openIdx={openIdx}
            setOpenIdx={setOpenIdx}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
