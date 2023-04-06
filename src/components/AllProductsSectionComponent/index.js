import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsFilterRight} from 'react-icons/bs'

import ProductsFilter from '../ProductsFilterComponent'

import ProductCard from '../ProductCardComponent'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const productsSectionApiConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
  isFailure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    sortByValue: sortbyOptions[0].optionId,
    searchValue: '',
    categoryValue: '',
    ratingValue: '',
    productsSectionApiStatus: productsSectionApiConstants.isLoading,
    allProductsList: [],
  }

  componentDidMount() {
    this.getProductsList()
  }

  getProductsList = async () => {
    this.setState({
      productsSectionApiStatus: productsSectionApiConstants.isLoading,
    })
    const {sortByValue, searchValue, categoryValue, ratingValue} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${sortByValue}&category=${categoryValue}&title_search=${searchValue}&rating=${ratingValue}`
    const jwtToken = Cookies.get('jwt_token')
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
      const updatedList = data.products.map(eachitem => ({
        brand: eachitem.brand,
        id: eachitem.id,
        imageUrl: eachitem.image_url,
        price: eachitem.price,
        rating: eachitem.rating,
        title: eachitem.title,
      }))
      this.setState({
        allProductsList: updatedList,
        productsSectionApiStatus: productsSectionApiConstants.isSuccess,
      })
    } else {
      this.setState({
        productsSectionApiStatus: productsSectionApiConstants.isFailure,
      })
    }
  }

  onChangeSortByValue = event => {
    this.setState({sortByValue: event.target.value}, this.getProductsList)
  }

  onChangeSearchValue = value => {
    this.setState({searchValue: value})
  }

  onEnterSearchFetch = () => {
    this.getProductsList()
  }

  onChangeCategoryValue = value => {
    this.setState({categoryValue: value}, this.getProductsList)
  }

  onChangeRatingValue = value => {
    this.setState({ratingValue: value}, this.getProductsList)
  }

  onClearFilters = () => {
    this.setState(
      {
        searchValue: '',
        ratingValue: '',
        categoryValue: '',
        sortByValue: sortbyOptions[0].optionId,
      },
      this.getProductsList,
    )
  }

  renderProductsSectionLoaderCard = () => (
    <div className="all-products-loader-bg-container">
      <Loader type="ThreeDots" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderProductsSectionSuccessCard = () => {
    const {allProductsList} = this.state
    return (
      <>
        {allProductsList.length > 0 ? (
          <ul className="fetched-products-list-bg-container">
            {allProductsList.map(eachitem => (
              <ProductCard key={eachitem.id} productData={eachitem} />
            ))}
          </ul>
        ) : (
          <div className="no-products-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              className="no-products-image"
              alt="no products"
            />
            <h1 className="no-products-heading">No Products Found</h1>
            <p className="no-products-description">
              We could not find any products. Try other filters and search
              values.
            </p>
          </div>
        )}
      </>
    )
  }

  renderProductsSectionFailureCard = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-image"
      />
      <h1 className="product-failure-heading">Oops! Something Went Wrong</h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <button
        className="products-failure-button"
        type="button"
        onClick={this.getProductsList}
      >
        Retry
      </button>
    </div>
  )

  renderProductsPage = () => {
    const {productsSectionApiStatus} = this.state
    switch (productsSectionApiStatus) {
      case productsSectionApiConstants.isLoading:
        return this.renderProductsSectionLoaderCard()
      case productsSectionApiConstants.isSuccess:
        return this.renderProductsSectionSuccessCard()
      case productsSectionApiConstants.isFailure:
        return this.renderProductsSectionFailureCard()
      default:
        return null
    }
  }

  render() {
    const {sortByValue, searchValue, categoryValue, ratingValue} = this.state
    return (
      <div className="all-products-section-bg-container">
        <div className="products-filter-bg-container">
          <ProductsFilter
            categoryOptions={categoryOptions}
            ratingsList={ratingsList}
            categoryValue={categoryValue}
            searchValue={searchValue}
            ratingValue={ratingValue}
            onChangeSearchValue={this.onChangeSearchValue}
            onChangeCategoryValue={this.onChangeCategoryValue}
            onChangeRatingValue={this.onChangeRatingValue}
            onEnterSearchFetch={this.onEnterSearchFetch}
            onClearFilters={this.onClearFilters}
          />
        </div>
        <div className="products-display-page">
          <div className="products-header-card">
            <h1 className="products-header-card-heading">All Products</h1>
            <div className="sort-by-container">
              <BsFilterRight className="filter-icon" />
              <p className="sort-by-heading">Sort By</p>
              <select
                value={sortByValue}
                className="products-sort-by"
                onChange={this.onChangeSortByValue}
              >
                {sortbyOptions.map(eachitem => (
                  <option
                    value={eachitem.optionId}
                    key={eachitem.optionId}
                    className="products-sort-by-option"
                  >
                    {eachitem.displayText}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {this.renderProductsPage()}
        </div>
      </div>
    )
  }
}

export default AllProductsSection
