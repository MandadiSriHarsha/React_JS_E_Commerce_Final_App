import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-view-bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      alt="empty cart"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-heading">Your Cart Is Empty</h1>
    <Link to="/products" className="empty-cart-link-item">
      <button className="empty-cart-button" type="button">
        Shop Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
