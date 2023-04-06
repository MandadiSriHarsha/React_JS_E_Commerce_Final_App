import {Component} from 'react'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import Navbar from '../NavbarComponent'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class HomeRoute extends Component {
  state = {isLoaderLoading: true}

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLoaderLoading: false})
    }, 1000)
  }

  renderHomeRouteLoader = () => (
    <div className="home-route-loader-bg-container">
      <Loader type="Oval" color="#0967d2" height={50} width={50} />
    </div>
  )

  renderHomeRoutePage = () => (
    <>
      <div className="home-page-bg-container">
        <h1 className="home-page-main-heading">Clothes That Get YOU Noticed</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes"
          className="home-page-main-image"
        />
        <div className="home-page-content-card">
          <h1 className="home-page-content-card-heading">
            Clothes That Get YOU Noticed
          </h1>
          <p className="home-page-content-card-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button className="home-page-content-card-button" type="button">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </>
  )

  render() {
    const {isLoaderLoading} = this.state
    return (
      <>
        <Navbar />
        {isLoaderLoading
          ? this.renderHomeRouteLoader()
          : this.renderHomeRoutePage()}
      </>
    )
  }
}

export default HomeRoute
