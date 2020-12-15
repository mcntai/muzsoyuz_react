import React from 'react'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import * as swalAlert from '../common/Alerts'
import { pickChanges } from '../../utils/muzsoyuz/object'
import Logout from './Logout'
import avatar from '../../Assets/img/avatar.svg'
import s from './AboutMe.module.css'


class AboutMe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id          : '',
      name        : '',
      role        : '',
      phone       : '',
      email       : '',
      imageURL    : '',
      togglePencil: '',
      showEditBtn : '',
      hideSaveBtn : s.hideSaveBtn,
      hideEditBtn : '',
      disabled    : true,
    }
  }

  componentDidMount() {
    const { id, name, role, phone, email, imageURL } = this.props.user

    this.setState({ id, name, role, phone, email, imageURL })
  }

  componentDidUpdate(prevProps) {
    const { id, name, role, phone, email, imageURL } = this.props.user

    if (prevProps.user !== this.props.user) {
      this.setState({ id, name, role, phone, email, imageURL })
    }
  }

  changeInput(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  async submitChanges() {
    const togglePencil = this.state.togglePencil === '' ? s.togglePencil : ''
    const hideSaveBtn = this.state.hideSaveBtn === '' ? s.hideSaveBtn : ''
    const hideEditBtn = this.state.hideEditBtn === '' ? s.hideEditBtn : ''

    const changes = pickChanges(
      this.props.user,
      this.state,
      ['name', 'role', 'phone', 'email', 'imageUrl'],
    )

    if (Object.keys(changes).length) {
      try {
        const response = await MuzSoyuzRequest.makeProfileUpdate(changes)

        console.log(response)
      }
      catch (e) {
        swalAlert.error(e.message, 'Сталася помилка при оновленні профілю')
      }
    }

    this.setState({ hideSaveBtn, hideEditBtn, togglePencil, disabled: true })
  }

  editData() {
    const togglePencil = this.state.togglePencil === '' ? s.togglePencil : ''
    const hideSaveBtn = this.state.hideSaveBtn === '' ? s.hideSaveBtn : ''
    const hideEditBtn = this.state.hideEditBtn === '' ? s.hideEditBtn : ''

    this.setState({ togglePencil, hideSaveBtn, hideEditBtn, disabled: false })
  }

  render() {
    const disabled = this.state.disabled

    return (
      <div className={s.aboutMeWrapper}>
        <div className={s.name}>
          <div className={s.imgWrapper}><img src={this.state.imageURL || avatar} alt="avatar"/></div>
          <div className={s.nameRole}>
            <input
              type='text'
              name='name'
              className={[s.name, s.inp, this.state.togglePencil].join(' ')}
              value={this.state.name || ''}
              placeholder="Ваше ім'я"
              disabled={disabled}
              onChange={this.changeInput.bind(this)}
            />
            <input
              type='text'
              name='role'
              className={[s.role, s.inp, s.roleIcon, this.state.togglePencil].join(' ')}
              value={this.state.role || ''}
              placeholder="Чим ви займаєтесь?"
              disabled={disabled}
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
            placeholder="XX-XXX-XX-XX"
            disabled={disabled}
            onChange={this.changeInput.bind(this)}
          />
        </span>
          <div className={s.row}/>
          <span className={s.emailIcon}>
          <input
            type='email'
            name='email'
            className={[s.email, s.inp, this.state.togglePencil].join(' ')}
            defaultValue={this.state.email || ''}
            disabled={disabled}
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
