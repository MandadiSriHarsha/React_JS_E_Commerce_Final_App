import CartContext from '../../context/CartContext'

import Navbar from '../NavbarComponent'

import EmptyCartView from '../EmptyCartViewComponent'

import AddedCartItems from '../CartItems'

import './index.css'

const CartRoute = () => (
  <>
    <Navbar />
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <>{cartList.length === 0 ? <EmptyCartView /> : <AddedCartItems />}</>
        )
      }}
    </CartContext.Consumer>
  </>
)

export default CartRoute
