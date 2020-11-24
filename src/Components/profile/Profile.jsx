import React from 'react'
import s from './Profile.module.css'
import { connect } from 'react-redux'
import { pageRoute } from '../../actions/routingActions'
import { NavLink } from 'react-router-dom'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swal from '../../Components/common/Alerts'
import HeaderInternalButtons from '../common/HeaderInternalButtons'
import AboutMe from './AboutMe'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized,
    prevRoute : state.pageReducer.prevRoute
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userProfile: [],
    }
  }

  componentDidMount() {
    this.props.dispatch(pageRoute('PROFILE', 'profile'))

    this.getUserData().catch(error => {
      alert(error.message)
    })
  }

  async getUserData() {
    try {
      const response = await MuzSoyuzRequest.getUserProfile()

      this.setState({ userProfile: response })
      console.log(response)
    }
    catch (e) {
      swal.serverErr('Щось пішло не так', 'Хммм')
    }
  }

  userAuthorized() {
    const backBtn = this.props.prevRoute

    const user = this.state.userProfile

    return (
      <div className={s.profileWrapper}>
        <div className={s.profileHeader}>
          <NavLink to={backBtn} className={s.backBtn}>&lt;</NavLink>
          <span className={s.profile}>Профіль</span>
        </div>
        <div className={s.headerButtons}>
          <HeaderInternalButtons
            firstText="Про себе"
            firstRoute='/profile'
            secondText="Налаштування"
            secondRoute='/settings'
          />
        </div>
        <div className={s.row}/>
        <AboutMe user={user}/>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          this.props.authorized && this.userAuthorized()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Profile)