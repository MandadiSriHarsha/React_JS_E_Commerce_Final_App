import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {imageUrl, price, rating, brand, title, id} = productData
  return (
    <Link to={`/products/${id}`} className="product-link-item">
      <li className="product-item">
        <img src={imageUrl} alt={title} className="product-image" />
        <h1 className="product-title">{title}</h1>
        <p className="product-brand">{brand}</p>
        <div className="product-price-and-rating-container">
          <p className="product-price">Rs {price}/- </p>
          <div className="product-rating-container">
            <p className="product-rating">{rating}</p>
            <AiFillStar className="rating-star" />
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ProductCard
