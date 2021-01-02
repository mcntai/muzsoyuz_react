import React from 'react'
import s from './Logout.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const handleLogoutRedux = () => ({
  type: 'LOGOUT',
})

class Logout extends React.Component {

  handleLogOut(dispatch) {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')

      dispatch(handleLogoutRedux())
    }
    catch (error) {
      alert(error.message)
    }
  }

  LogoutButton() {
    return (
        <NavLink
          to=""
          className={s.btn}
          onClick={() => this.props.dispatch(this.handleLogOut)}
        >
          Вийти
        </NavLink>
    )
  }

  render() {
    return (
      <div className={this.props.btnWrapper}>
        {this.LogoutButton()}
      </div>
    )
  }
}

export default connect(undefined)(Logout)