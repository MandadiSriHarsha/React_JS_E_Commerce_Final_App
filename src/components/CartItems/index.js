import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'

import {TiDelete} from 'react-icons/ti'

import CartContext from '../../context/CartContext'

import './index.css'

const AddedCartItems = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCart,
        deleteCartItem,
      } = value

      const getTotalPrice = () => {
        const priceList = cartList.map(eachitem => eachitem.productPrice)
        const totalPrice = priceList.reduce((a, b) => a + b)
        return totalPrice
      }

      const OrderedItem = props => {
        const {productData} = props
        const {imageUrl, id, productPrice, quantity, title, brand} = productData
        const onDeleteCartItem = () => {
          deleteCartItem(id)
        }
        const onIncrementCartItemQuantity = () => {
          incrementCartItemQuantity(id)
        }
        const onDecrementCartItemQuantity = () => {
          decrementCartItemQuantity(id)
        }
        return (
          <li className="ordered-item">
            <img src={imageUrl} alt={title} className="ordered-item-image" />
            <div className="ordered-item-content-card">
              <div className="ordered-item-title-card">
                <p className="ordered-item-name">{title}</p>
                <p className="ordered-item-brand">{brand}</p>
              </div>
              <div className="ordered-item-quantity-card">
                <button
                  className="ordered-item-decrement-button"
                  type="button"
                  onClick={onDecrementCartItemQuantity}
                >
                  <AiOutlineMinusSquare className="ordered-item-minus-icon" />
                </button>
                <p className="ordered-item-quantity">{quantity}</p>
                <button
                  className="ordered-item-increment-button"
                  type="button"
                  onClick={onIncrementCartItemQuantity}
                >
                  <AiOutlinePlusSquare className="ordered-item-plus-icon" />
                </button>
              </div>
              <p className="ordered-item-price">Rs {productPrice}/- </p>
            </div>
            <button
              className="item-remove-button"
              type="button"
              onClick={onDeleteCartItem}
            >
              <TiDelete className="remove-icon" />
            </button>
            <button
              type="button"
              onClick={onDeleteCartItem}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        )
      }

      return (
        <div className="ordered-cart-items-bg-container">
          <h1 className="ordered-cart-items-heading">My Cart</h1>
          <button
            className="ordered-remove-items-button"
            type="button"
            onClick={removeCart}
          >
            Remove All
          </button>
          <ul className="ordered-cart-items-list">
            {cartList.map(eachitem => (
              <OrderedItem
                key={eachitem.id}
                incrementCartItemQuantity={incrementCartItemQuantity}
                decrementCartItemQuantity={decrementCartItemQuantity}
                deleteCartItem={deleteCartItem}
                productData={eachitem}
              />
            ))}
          </ul>
          <div className="bill-card">
            <h1 className="bill-heading">
              Order Total:{' '}
              <span className="bill-price">Rs {getTotalPrice()}/- </span>
            </h1>
            <p className="bill-description">
              <span className="no-of-items">{cartList.length}</span> items in
              cart
            </p>
            <button className="cart-checkout-button" type="button">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default AddedCartItems
