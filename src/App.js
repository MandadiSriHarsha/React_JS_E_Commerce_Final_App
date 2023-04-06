import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import CartContext from './context/CartContext'

import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import ProductsRoute from './components/ProductsRoute'
import CartRoute from './components/CartRoute'
import ProductItemDetails from './components/ProductItemDetails'
import NotFoundRoute from './components/NotFoundRoute'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = value => {
    const {cartList} = this.state
    const {id, imageUrl, price, title, brand, quantity} = value
    const filteredItem = cartList.filter(eachitem => eachitem.id === id)
    if (filteredItem.length === 0) {
      const updatedDetails = {
        id,
        imageUrl,
        quantity,
        price,
        productPrice: quantity * price,
        title,
        brand,
      }
      this.setState(prevState => ({
        cartList: [...prevState.cartList, updatedDetails],
      }))
    } else {
      const updatedDetails = {
        id,
        imageUrl,
        quantity: filteredItem[0].quantity + quantity,
        price,
        productPrice: quantity * price + filteredItem[0].productPrice,
        title,
        brand,
      }
      const newList = cartList.filter(eachitem => eachitem.id !== id)
      this.setState({cartList: [...newList, updatedDetails]})
    }
  }

  deleteCartItem = removeItemId => {
    const {cartList} = this.state
    const filteredList = cartList.filter(
      eachitem => eachitem.id !== removeItemId,
    )
    this.setState({cartList: filteredList})
  }

  removeCart = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachitem => {
      if (eachitem.id === itemId) {
        const updatedObject = {
          id: eachitem.id,
          price: eachitem.price,
          quantity: eachitem.quantity + 1,
          productPrice: eachitem.productPrice + eachitem.price,
          brand: eachitem.brand,
          title: eachitem.title,
          imageUrl: eachitem.imageUrl,
        }
        return updatedObject
      }
      return eachitem
    })
    this.setState({cartList: updatedList})
  }

  decrementCartItemQuantity = itemId => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachitem => {
      if (eachitem.id === itemId) {
        const updatedQuantity =
          eachitem.quantity === 1 ? 1 : eachitem.quantity - 1
        const updatedPrice =
          eachitem.quantity === 1
            ? eachitem.price
            : eachitem.productPrice - eachitem.price
        const updatedObject = {
          id: eachitem.id,
          price: eachitem.price,
          quantity: updatedQuantity,
          productPrice: updatedPrice,
          brand: eachitem.brand,
          title: eachitem.title,
          imageUrl: eachitem.imageUrl,
        }
        return updatedObject
      }
      return eachitem
    })
    this.setState({cartList: updatedList})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          removeCart: this.removeCart,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/home" component={HomeRoute} />
          <ProtectedRoute exact path="/products" component={ProductsRoute} />
          <ProtectedRoute exact path="/cart" component={CartRoute} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <Route exact path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
