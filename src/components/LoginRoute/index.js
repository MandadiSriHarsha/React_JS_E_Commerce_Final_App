import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const loginApiConstants = {
  isLoading: 'LOADING',
  isSuccess: 'SUCCESS',
}

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    isErrorGenerated: false,
    errorMessage: '',
    apiStatus: loginApiConstants.isLoading,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({apiStatus: loginApiConstants.isSuccess})
    }, 1000)
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  setCookies = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/home')
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      this.setCookies(fetchedData.jwt_token)
    } else {
      const fetchedData = await response.json()
      this.setState({
        isErrorGenerated: true,
        errorMessage: fetchedData.error_msg,
      })
    }
  }

  renderLoginPageLoader = () => (
    <div className="login-loader-bg-container">
      <Loader type="TailSpin" color="#0b69ff" height={50} width={50} />
    </div>
  )

  renderLoginPageForm = () => {
    const {username, password, isErrorGenerated, errorMessage} = this.state
    return (
      <div className="login-page-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website mobile logo"
          className="website-mobile-logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website-login-logo"
          className="website-login-logo"
        />
        <form className="login-form" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website-desktop-logo"
            className="website-desktop-logo"
          />
          <div className="username-bg-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              className="input"
              id="username"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="password-bg-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              className="input"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-form-button" type="submit">
            Login
          </button>
          {isErrorGenerated && (
            <p className="error-message">* {errorMessage}</p>
          )}
        </form>
      </div>
    )
  }

  renderLoginPageComponents = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case loginApiConstants.isLoading:
        return this.renderLoginPageLoader()
      case loginApiConstants.isSuccess:
        return this.renderLoginPageForm()
      default:
        return null
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/home" />
    }
    return <>{this.renderLoginPageComponents()}</>
  }
}

export default LoginRoute
