import React from 'react'
import s from './Profile.module.css'
import { connect } from 'react-redux'
import { pageRoute } from '../../actions/routingActions'
import {NavLink} from 'react-router-dom'
import HeaderInternalButtons from '../common/HeaderInternalButtons'
import AboutMe from './AboutMe'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized,
    prevRoute: state.pageReducer.prevRoute
  }
}

class Profile extends React.Component {

  componentDidMount() {
    this.props.dispatch(pageRoute('PROFILE', 'profile'))
  }

  userAuthorized() {
    const backBtn = this.props.prevRoute

    return (
      <div className={s.profileWrapper}>
        <div className={s.profileHeader}>
          <NavLink to={backBtn} className={s.backBtn}>&lt;</NavLink>
          <span className={s.profile}>Профіль</span>
        </div>
        <div className={s.headerButtons}>
          <HeaderInternalButtons first="Про себе" second="Налаштування"/>
        </div>
        <div className={s.row}/>
        <AboutMe/>
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