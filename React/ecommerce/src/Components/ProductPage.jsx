import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  let [data, setData] = useState(null);
  const { id } = useParams();
  

  

  let productData = async () => {
    let data = await fetch(`https://dummyjson.com/products/${id}`);
    let productData = await data.json();
    setData(productData)
  }

  useEffect(() => {
    productData();
  }, [])

  if( data == null ){
    return <div> ....loading </div>;
  }
  let { thumbnail , title , price , description , category , rating , brand  } = data ;
 

  return (
    <div>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={thumbnail}
            alt="Movie" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h2 className ="card-description">{description}</h2>
          <p1 className ="card-price">Price  {price}</p1>
          <p1 className ="card-category">Category : {category}</p1>
          <p1 className ="card-rating">Rating {rating}</p1>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage