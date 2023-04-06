import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {imageUrl, price, rating, brand, title, id} = productData
  return (
    <Link to={`/products/${id}`} className="similar-product-link-item">
      <li className="similar-product-item">
        <img src={imageUrl} alt={title} className="similar-product-image" />
        <h1 className="similar-product-title">{title}</h1>
        <p className="similar-product-brand">{brand}</p>
        <div className="similar-product-price-and-rating-container">
          <p className="similar-product-price">Rs {price}/- </p>
          <div className="similar-product-rating-container">
            <p className="similar-product-rating">{rating}</p>
            <AiFillStar className="similar-rating-star" />
          </div>
        </div>
      </li>
    </Link>
  )
}

export default ProductCard
