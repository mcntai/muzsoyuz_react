import React from 'react'
import s from './Profile.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


const handleLogoutRedux = () => ({
  type: 'LOGOUT',
  payload: false,
})

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async handleLogOut() {
    // return async dispatch => {
    try {
      const response = await fetch('http://localhost:9000/api/v1/auth/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      // const json = await response.json()
      localStorage.removeItem('token')

      // dispatch(handleLogoutRedux())


    } catch (error) {
      console.error(error.message)
    }
    // }
  }


  render() {
    return (
      <div>
        {/*<NavLink to="" className={s.logoutButton} onClick={this.props.dispatch(this.handleLogOut)}>Выйти</NavLink>*/}
        <NavLink to="" className={s.logoutButton} onClick={this.handleLogOut}>Выйти</NavLink>
      </div>
    )
  }
}

export default connect(undefined)(Profile)