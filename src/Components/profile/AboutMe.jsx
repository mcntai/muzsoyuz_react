import React from 'react'
import s from './AboutMe.module.css'
import avatar from '../../Assets/img/avatar.svg'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'


class AboutMe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id   : '',
      name : '',
      role : '',
      phone: '',
      email: '',
    }
  }

  componentDidMount() {
    this.setState({
      id   : this.props.user.id,
      name : this.props.user.name,
      role : this.props.user.role,
      phone: this.props.user.phone,
      email: this.props.user.email,
    })
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
      alert(e.message)
    }
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
              className={[s.name, s.inp].join(' ')}
              value={this.state.name}
              onChange={this.changeInput.bind(this)}
            />
            <input
              type='text'
              name='role'
              className={[s.role, s.inp].join(' ')}
              value={this.state.role}
              onChange={this.changeInput.bind(this)}
            />
          </div>
        </div>
        <div className={s.row}/>
        <div className={s.contacts}>
        <span className={s.phoneCode}>
          +380
          <input
            type='number'
            name='phone'
            className={[s.phoneNumber, s.inp].join(' ')}
            value={this.state.phone}
            onChange={this.changeInput.bind(this)}
          />
        </span>
          <div className={s.row}/>
          <input
            type='email'
            name='email'
            className={[s.email, s.inp].join(' ')}
            value={this.state.email}
            onChange={this.changeInput.bind(this)}
          />
          <div className={s.row}/>
        </div>
        <div className={s.buttons}>
          <button onClick={this.submitChanges.bind(this)}>ЗБЕРЕГТИ</button>
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
