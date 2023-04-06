import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const notFoundRouteConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
}

class NotFoundRoute extends Component {
  state = {notFoundRouteApiStatus: notFoundRouteConstants.isLoading}

  componentDidMount() {
    setTimeout(() => {
      this.setState({notFoundRouteApiStatus: notFoundRouteConstants.isSuccess})
    }, 1000)
  }

  navigateToLoginRoute = () => {
    const {history} = this.props
    history.replace('/login')
  }

  renderNotFoundRouteLoader = () => (
    <div className="not-found-loader-bg-container">
      <Loader type="Oval" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderNotFoundRouteDisplay = () => (
    <div className="not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-image"
      />
      <p className="not-found-text">
        Sorry, the page that you requested for is either removed or moved to
        other location. Kindly go back to home page.
      </p>
      <button
        type="button"
        className="not-found-button"
        onClick={this.navigateToLoginRoute}
      >
        Login
      </button>
    </div>
  )

  renderNotFoundPages = () => {
    const {notFoundRouteApiStatus} = this.state
    switch (notFoundRouteApiStatus) {
      case notFoundRouteConstants.isLoading:
        return this.renderNotFoundRouteLoader()
      case notFoundRouteConstants.isSuccess:
        return this.renderNotFoundRouteDisplay()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderNotFoundPages()}</>
  }
}

export default NotFoundRoute
