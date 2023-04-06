import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCardComponent'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const PrimeDealsApiConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class PrimeDealsSection extends Component {
  state = {
    PrimeDealsApiStatus: PrimeDealsApiConstants.isLoading,
    primeDealsList: [],
  }

  componentDidMount() {
    this.getPrimeDealsList()
  }

  getPrimeDealsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const primeDealsApiUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(primeDealsApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedList = data.prime_deals.map(eachList => ({
        availability: eachList.availability,
        brand: eachList.brand,
        description: eachList.description,
        id: eachList.id,
        imageUrl: eachList.image_url,
        price: eachList.price,
        rating: eachList.rating,
        style: eachList.style,
        title: eachList.title,
        totalReviews: eachList.total_reviews,
      }))
      this.setState({
        PrimeDealsApiStatus: PrimeDealsApiConstants.isSuccess,
        primeDealsList: updatedList,
      })
    } else {
      this.setState({PrimeDealsApiStatus: PrimeDealsApiConstants.isFailure})
    }
  }

  renderPrimeDealsLoaderComponent = () => (
    <div className="prime-deals-loader-bg-container">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderPrimeDealsSuccessComponent = () => {
    const {primeDealsList} = this.state
    return (
      <div className="prime-deals-success-bg-container">
        <h1 className="prime-deals-success-heading">Exclusive Prime Deals</h1>
        <ul className="prime-deals-list-bg-container">
          {primeDealsList.map(eachProduct => (
            <ProductCard key={eachProduct.id} productData={eachProduct} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeDealsFailureComponent = () => (
    <div className="prime-deals-failure-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
        className="prime-deals-failure-image"
        alt="register for prime deals"
      />
    </div>
  )

  renderPrimeDealsPage = () => {
    const {PrimeDealsApiStatus} = this.state
    switch (PrimeDealsApiStatus) {
      case PrimeDealsApiConstants.isLoading:
        return this.renderPrimeDealsLoaderComponent()
      case PrimeDealsApiConstants.isSuccess:
        return this.renderPrimeDealsSuccessComponent()
      case PrimeDealsApiConstants.isFailure:
        return this.renderPrimeDealsFailureComponent()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderPrimeDealsPage()}</>
  }
}

export default PrimeDealsSection
