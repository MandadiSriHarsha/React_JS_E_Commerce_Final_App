import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <nav className="navbar">
            <div className="navbar-mobile-header-card">
              <Link to="/home" className="link-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                  className="navbar-website-logo"
                />
              </Link>
              <button
                className="navbar-mobile-logout-button"
                type="button"
                onClick={onClickLogout}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                  alt="logout"
                  className="navbar-mobile-image"
                />
              </button>
            </div>
            <div className="navbar-mobile-content-card">
              <Link to="/home">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                  alt="home"
                  className="navbar-mobile-content-image"
                />
              </Link>
              <Link to="/products">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                  alt="products"
                  className="navbar-mobile-content-image"
                />
              </Link>
              <Link to="/cart" className="navbar-cart-link">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                  alt="cart"
                  className="navbar-mobile-content-image"
                />
                {cartList.length > 0 && (
                  <span className="cart-span">{cartList.length}</span>
                )}
              </Link>
            </div>
            <div className="navbar-desktop-card">
              <Link to="/home" className="link-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                  alt="website logo"
                  className="navbar-website-logo"
                />
              </Link>
              <div className="navbar-desktop-items-card">
                <Link to="/home" className="link-desktop-item">
                  Home
                </Link>
                <Link to="/products" className="link-desktop-item">
                  Products
                </Link>
                <Link to="/cart" className="link-desktop-item navbar-cart-link">
                  Cart
                  {cartList.length > 0 && (
                    <span className="cart-span">{cartList.length}</span>
                  )}
                </Link>
                <button
                  className="desktop-logout-button"
                  type="button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Navbar)
