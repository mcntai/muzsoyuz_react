import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import moment from 'moment'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import { pageRoute } from '../actions/routingActions'
import { jobOfferValidator } from '../validators/index'
import * as swal from '../Components/common/Alerts'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import preloader from '../Assets/img/preloader.gif'
import s from './OfferJob.module.css'


const mapStateToProps = state => {
  return {
    loading   : state.authReducer.loading,
    authorized: state.authReducer.authorized,
    prevRoute : state.pageReducer.prevRoute
  }
}

class OfferJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title     : '',
      role      : '',
      date      : '',
      address   : '',
      sets      : '',
      salary    : '',
      phone     : '',
      extraInfo : '',
      titleErr  : '',
      dateErr   : '',
      addressErr: '',
      setsErr   : '',
      salaryErr : '',
      phoneErr  : '',
    }
  }

  componentDidMount() {
    this.props.dispatch(pageRoute('OFFER_JOB', 'offer-job'))
    this.setState({ date: moment().format('YYYY-MM-DD') })
  }

  handleChangeStr(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeNum(e) {
    this.setState({ [e.target.name]: parseInt(e.target.value) })
  }

  validateInput(e, name) {
    let value = e.target.value

    try {
      jobOfferValidator(name, value)
      this.setState({ [name]: '' })
    }
    catch (e) {
      return this.setState({ [name]: e.message })
    }
  }


  async handleSubmit() {
    try {
      await MuzSoyuzRequest.makeJobOffer({
        jobType  : 'musicalReplacement',
        date     : this.state.date,
        address  : this.state.address,
        salary   : this.state.salary,
        sets     : this.state.sets,
        title    : this.state.title,
        role     : this.state.role,
        phone    : this.state.phone,
        extraInfo: this.state.extraInfo,
      })

      swal.success('Оголошення створено', 'Ура!')
    }
    catch (e) {
      if (e.message !== 'Invalid Arguments Error') {
        this.setState({ serverErr: e.message })
        swal.error(e.message, 'Хммм')
      } else {
        console.log(e.message)
        swal.error('Ви щось пропустили', 'Перевірте форму')
      }
    }
  }

  renderPage() {
    return (
      <div>
        <div className={s.headerWrapper}>
          <Header/>
        </div>
        <form action="" className={s.form}>
          <p>Заголовок оголошення</p>
          <div className={s.inputWrapper}>
            <input
              type='text'
              name='title'
              placeholder='введіть заголовок'
              className={s.input}
              value={this.state.title}
              onChange={this.handleChangeStr.bind(this)}
              onBlur={(e) => this.validateInput(e, 'titleErr')}
            />
          </div>
          <span className={s.textErr}>{this.state.titleErr}</span>

          <p>Роль</p>
          <select
            required name='role'
            className={s.role}
            defaultValue='default'
            onChange={this.handleChangeStr.bind(this)}
          >
            <option value=''>хто вам потрібен?</option>
            <option value='drums'>Барабанщик</option>
            <option value='pandora'>Бандурист</option>
            <option value='bas'>Басист</option>
            <option value='guitar'>Гітарист</option>
            <option value='voice'>Вокаліст</option>
            <option value='sax'>Саксофоніст</option>
            <option value='trumpet'>Трубач</option>
            <option value='violin'>Скрипач</option>
            <option value='piano'>Піаніст</option>
          </select>

          <p>Дата</p>
          <div className={s.inputWrapper}>
            <input
              type='date'
              name='date'
              className={[s.inpDate, s.input].join(' ')}
              onChange={this.handleChangeStr.bind(this)}
            />
          </div>
          <span className={s.textErr}>{this.state.dateErr}</span>

          <p>Адреса</p>
          <div className={s.inputWrapper}>
            <input
              type='text'
              name='address'
              placeholder='введіть адресу'
              className={s.input}
              value={this.state.address}
              onChange={this.handleChangeStr.bind(this)}
              onBlur={(e) => this.validateInput(e, 'addressErr')}
            />
          </div>
          <span className={s.textErr}>{this.state.addressErr}</span>

          <p>Кількість сетів</p>
          <div className={s.inputWrapper}>
            <input
              type='number'
              name='sets'
              placeholder='наприклад, 3'
              className={s.input}
              value={this.state.sets}
              onChange={this.handleChangeNum.bind(this)}
              onBlur={(e) => this.validateInput(e, 'setsErr')}
            />
          </div>
          <span className={s.textErr}>{this.state.setsErr}</span>

          <p>Гонорар, грн</p>
          <div className={s.inputWrapper}>
            <input
              type='number'
              name='salary'
              placeholder='гонорар за роботу'
              className={s.input}
              value={this.state.salary}
              onChange={this.handleChangeNum.bind(this)}
              onBlur={(e) => this.validateInput(e, 'salaryErr')}
            />
          </div>
          <span className={s.textErr}>{this.state.salaryErr}</span>

          <p>Ваш телефон</p>
          <div className={s.inputWrapper}>
            <input
              type='number'
              pattern='\d*'
              name='phone'
              placeholder='0 93 111 22 33'
              className={s.input}
              value={this.state.phone}
              onChange={this.handleChangeNum.bind(this)}
              onBlur={(e) => this.validateInput(e, 'phoneErr')}
            />
          </div>
          <span className={s.textErr}>{this.state.phoneErr}</span>

          <p>Додаткові деталі</p>
          <div className={s.inputWrapper}>
            <textarea
              name='extraInfo'
              placeholder='будь яка додаткова інформація'
              className={s.textArea}
              value={this.state.extraInfo}
              onChange={this.handleChangeStr.bind(this)}
            />
          </div>
        </form>
        <button className={s.submit} onClick={this.handleSubmit.bind(this)}/>
        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          !this.props.authorized && <Redirect to='/login'/>
        }
        {
          this.props.loading
          ? <div className={s.preLoader}><img alt="preloader" src={preloader}/></div>
          : this.renderPage()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(OfferJob)