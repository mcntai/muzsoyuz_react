import React from 'react'
import s from './AboutMe.module.css'
import avatar from '../../Assets/img/avatar.svg'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../common/Alerts'


class AboutMe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id    : '',
      name  : '',
      role  : '',
      phone : '',
      email : '',
      toggle: '',
    }
  }

  componentDidUpdate(prevProps) {
    const { id, name, role, phone, email } = this.props.user

    if (
      prevProps.user.id !== id ||
      prevProps.user.email !== email ||
      prevProps.user.name !== name ||
      prevProps.user.role !== role ||
      prevProps.user.phone !== phone
    ) {
      this.setState({ id, name, role, phone, email, })
    }

  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async submitChanges() {
    try {
      const response = await MuzSoyuzRequest.makeProfileUpdate({
        name : this.state.name,
        role : this.state.role,
        phone: this.state.phone,
        email: this.state.email,
      })

      console.log(response)
    }
    catch (e) {
      swalAlert.error(e.message, 'Сталася помилка при оновленні профілю')
    }
  }

  editData() {
    const css = this.state.toggle === '' ? s.toggle : ''

    this.setState({ toggle: css })
  }

  render() {
    return (
      <div className={s.aboutMeWrapper}>
        <div className={s.name}>
          <div><img src={avatar} alt="avatar"/></div>
          <div className={s.nameRole}>
            <input
              type='text'
              name='name'
              className={[s.name, s.inp, this.state.toggle].join(' ')}
              value={this.state.name || ''}
              onChange={this.changeInput.bind(this)}
            />
            <input
              type='text'
              name='role'
              className={[s.role, s.inp, this.state.toggle].join(' ')}
              value={this.state.role || ''}
              onChange={this.changeInput.bind(this)}
            />
          </div>
        </div>
        <div className={s.row}/>
        <div className={s.contacts}>
        <span className={s.phoneCode}>
          +380&nbsp;
          <input
            type='text'
            name='phone'
            className={[s.phoneNumber, s.inp, this.state.toggle].join(' ')}
            value={this.state.phone || ''}
            onChange={this.changeInput.bind(this)}
          />
        </span>
          <div className={s.row}/>
          <input
            type='email'
            name='email'
            className={[s.email, s.inp, this.state.toggle].join(' ')}
            value={this.state.email || ''}
            onChange={this.changeInput.bind(this)}
          />
          <div className={s.row}/>
        </div>
        <div className={s.buttons}>
          <button onClick={this.submitChanges.bind(this)}>ЗБЕРЕГТИ</button>
          <button onClick={this.editData.bind(this)}>Edit</button>
          <NavLink
            to="/edit"
            className={[s.btn, s.edit].join(' ')}
          >
            Редагувати
          </NavLink>
          <Logout/>
        </div>
      </div>
    )
  }
}


export default AboutMe
