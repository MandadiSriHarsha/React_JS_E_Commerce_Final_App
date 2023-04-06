import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import Navbar from '../NavbarComponent'

import SimilarProductCard from '../SimilarProductItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const productItemDetailsConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    productDetails: {},
    similarProductsList: [],
    pageStatus: productItemDetailsConstants.isLoading,
    quantity: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({pageStatus: productItemDetailsConstants.isLoading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedDetails = {
        id: data.id,
        imageUrl: data.image_url,
        title: data.title,
        style: data.style,
        price: data.price,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        rating: data.rating,
        totalReviews: data.total_reviews,
      }
      const updatedProductsList = data.similar_products.map(eachitem => ({
        id: eachitem.id,
        availability: eachitem.availability,
        brand: eachitem.brand,
        description: eachitem.description,
        imageUrl: eachitem.image_url,
        price: eachitem.price,
        rating: eachitem.rating,
        style: eachitem.style,
        title: eachitem.title,
        totalReviews: eachitem.total_reviews,
      }))
      this.setState({
        pageStatus: productItemDetailsConstants.isSuccess,
        productDetails: updatedDetails,
        similarProductsList: updatedProductsList,
      })
    }
  }

  onIncreaseProductQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecreaseProductQuantity = () => {
    const {quantity} = this.state
    if (quantity === 1) {
      this.setState({quantity: 1})
    } else {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  renderProductItemDetailsLoader = () => (
    <div className="item-details-loader-bg-container">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderProductItemDetailsSuccessCard = () => {
    const {productDetails, quantity, similarProductsList} = this.state
    const {
      id,
      imageUrl,
      title,
      price,
      availability,
      brand,
      description,
      rating,
      totalReviews,
    } = productDetails
    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onaddItemToCart = () => {
            addCartItem({
              id,
              imageUrl,
              quantity,
              price,
              title,
              brand,
            })
          }

          return (
            <div className="product-item-details-bg-container">
              <div className="product-item-details-display-card" id={id}>
                <div className="product-item-details-image-card">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="product-item-details-image"
                  />
                </div>
                <div className="product-item-details-content-card">
                  <p className="product-item-details-title">{title}</p>
                  <p className="product-item-details-price">Rs {price}/- </p>
                  <div className="product-item-details-rating-and-reviews-card">
                    <div className="product-item-details-rating-card">
                      <p className="product-item-details-rating">{rating}</p>
                      <AiFillStar className="product-item-details-star-icon" />
                    </div>
                    <p className="product-item-details-reviews">
                      {totalReviews} Reviews
                    </p>
                  </div>
                  <p className="product-item-details-description">
                    {description}
                  </p>
                  <p className="product-item-details-availability">
                    Availability: <span>{availability}</span>
                  </p>
                  <p className="product-item-details-brand">
                    Brand: <span>{brand}</span>
                  </p>
                  <hr />
                  <div className="product-item-details-button-container">
                    <button
                      className="quantity-decrease-button"
                      type="button"
                      onClick={this.onDecreaseProductQuantity}
                    >
                      <AiOutlineMinusSquare className="minus-icon" />
                    </button>
                    <p className="product-quantity">{quantity}</p>
                    <button
                      className="quantity-increase-button"
                      type="button"
                      onClick={this.onIncreaseProductQuantity}
                    >
                      <AiOutlinePlusSquare className="plus-icon" />
                    </button>
                  </div>
                  <button
                    className="add-to-cart-button"
                    type="button"
                    onClick={onaddItemToCart}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <div className="similar-products-bg-container">
                <h1 className="similar-products-heading">Similar Products</h1>
                <ul className="similar-products-list">
                  {similarProductsList.map(eachitem => (
                    <SimilarProductCard
                      key={eachitem.id}
                      productData={eachitem}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderProductItemDetailsPages = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case productItemDetailsConstants.isLoading:
        return this.renderProductItemDetailsLoader()
      case productItemDetailsConstants.isSuccess:
        return this.renderProductItemDetailsSuccessCard()
      case productItemDetailsConstants.isFailure:
        return this.renderProductItemDetailsFailureCard()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderProductItemDetailsPages()}
      </>
    )
  }
}

export default ProductItemDetails
