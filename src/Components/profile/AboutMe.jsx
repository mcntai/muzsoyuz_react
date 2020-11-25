import React from 'react'
import s from './AboutMe.module.css'
import avatar from '../../Assets/img/avatar.svg'
import Logout from './Logout'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../common/Alerts'


class AboutMe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id          : '',
      name        : '',
      role        : '',
      phone       : '',
      email       : '',
      togglePencil: '',
      showEditBtn : '',
      hideSaveBtn : s.hideSaveBtn,
      hideEditBtn : ''
    }
  }

  componentDidMount() {
    const { id, name, role, phone, email } = this.props.user

    this.setState({ id, name, role, phone, email })
  }

  componentDidUpdate(prevProps) {
    const { id, name, role, phone, email } = this.props.user

    if (prevProps.user !== this.props.user) {
      this.setState({ id, name, role, phone, email, })
    }
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  pickChanges(prevObj, curObj) {
    const newObj = {}

    for (let key in prevObj) {

      if (prevObj[key] !== curObj[key]) {
        newObj[key] = curObj[key]
      }
    }
    return newObj
  }

  async submitChanges() {
    const togglePencil = this.state.togglePencil === '' ? s.togglePencil : ''
    const hideSaveBtn = this.state.hideSaveBtn === '' ? s.hideSaveBtn : ''
    const hideEditBtn = this.state.hideEditBtn === '' ? s.hideEditBtn : ''


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

    this.setState({ hideSaveBtn, hideEditBtn, togglePencil })
  }

  editData() {
    const togglePencil = this.state.togglePencil === '' ? s.togglePencil : ''
    const hideSaveBtn = this.state.hideSaveBtn === '' ? s.hideSaveBtn : ''
    const hideEditBtn = this.state.hideEditBtn === '' ? s.hideEditBtn : ''

    this.setState({ togglePencil, hideSaveBtn, hideEditBtn })
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
              className={[s.name, s.inp, this.state.togglePencil].join(' ')}
              value={this.state.name || ''}
              onChange={this.changeInput.bind(this)}
            />
            <input
              type='text'
              name='role'
              className={[s.role, s.inp, s.roleIcon, this.state.togglePencil].join(' ')}
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
            className={[s.phoneNumber, s.inp, this.state.togglePencil].join(' ')}
            value={this.state.phone || ''}
            onChange={this.changeInput.bind(this)}
          />
        </span>
          <div className={s.row}/>
          <span className={s.emailIcon}>
          <input
            type='email'
            name='email'
            className={[s.email, s.inp, this.state.togglePencil].join(' ')}
            value={this.state.email || ''}
            onChange={this.changeInput.bind(this)}
          />
          </span>
          <div className={s.row}/>
        </div>
        <div className={s.buttons}>
          <button
            className={[s.btn, s.saveBtn, this.state.hideSaveBtn].join(' ')}
            onClick={this.submitChanges.bind(this)}>
            Зберегти
          </button>
          <button
            className={[s.btn, this.state.hideEditBtn].join(' ')}
            onClick={this.editData.bind(this)}>
            Редагувати
          </button>
          <Logout/>
        </div>
      </div>
    )
  }
}


export default AboutMe
