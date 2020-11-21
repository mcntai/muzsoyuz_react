import React from 'react'
import s from './OfferJob.module.css'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import preloader from '../Assets/img/preloader.gif'
import { pageRoute } from '../actions/routingActions'
import * as swal from '../Components/common/Alerts'
import { assert } from '../errors/index'


const mapStateToProps = state => {
  return {
    loading   : state.authReducer.loading,
    authorized: state.authReducer.authorized,
  }
}

const MAP_VALIDATION = {
  titleErr     : value => {
    assert(value.length > 10, 'Мінімум 10 символів')
    assert(value.length <= 250, 'Максимум 250 символів')
  },
  dateErr   : value => {
    assert(/(\d{2})\.(\d{2})\.(\d{4})/.test(value), 'Введіть дату в форматі ДД-ММ-РРРР')
  },
  addressErr: value => {
    assert(value.length < 250, 'Максимум 250 символів')
  },
  setsErr   : value => {
    assert(!isNaN(value), 'Введіть число')
    assert(value > 0 && value < 6, 'Оберіть між 1 і 5 сетами')
  },
  salaryErr : value => {
    assert(!isNaN(value), 'Введіть число')
    assert(value > 0, 'Поставте трохи більшу зпшку')
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
      titleErr  : '',
      dateErr   : '',
      addressErr: '',
      setsErr   : '',
      salaryErr : ''
    }
  }

  componentDidMount() {
    this.props.dispatch(pageRoute('OFFER_JOB', 'offer-job'))
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
      MAP_VALIDATION[name](value)
      this.setState({ [name]: '' })
    }
    catch (e) {
      return this.setState({ [name]: e.message })
    }
  }


  async handleSubmit() {
    try {
      const response = await MuzSoyuzRequest.makeJobOffer({
        jobType: 'musicalReplacement',
        date   : this.state.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'),
        address: this.state.address,
        salary : this.state.salary,
        sets   : this.state.sets,
        title  : this.state.title,
        role   : this.state.role,
      })

      swal.success('Объявление создано', 'Ура!')
    }
    catch (error) {
      console.log(error)
    }
  }

  renderPage() {
    return (
      <div>
        <div className={s.headerWrapper}>
          <Header/>
        </div>
        <form action="" className={s.form}>
          <p>Заголовок объявления</p>
          <input
            type='text'
            name='title'
            placeholder='введите заголовок'
            className={s.title}
            value={this.state.title}
            onChange={this.handleChangeStr.bind(this)}
            onBlur={(e) => this.validateInput(e, 'titleErr')}
          />
          <span className={s.textErr}>{this.state.titleErr}</span>
          <p>Роль</p>
          <select
            required name='role'
            className={s.role}
            defaultValue='default'
            onChange={this.handleChangeStr.bind(this)}
          >
            <option value=''>Кто вам нужен?</option>
            <option value='drums'>Барабанщик</option>
            <option value='pandora'>Бандурист</option>
            <option value='bas'>Басист</option>
            <option value='guitar'>Гитарист</option>
            <option value='voice'>Вокалист</option>
            <option value='sax'>Саксофонист</option>
            <option value='trumpet'>Трубач</option>
            <option value='violin'>Скрипач</option>
          </select>
          <p>Дата</p>
          <input
            type='text'
            name='date'
            placeholder='дд.мм.гггг'
            className={s.date}
            value={this.state.date}
            onChange={this.handleChangeStr.bind(this)}
            onBlur={(e) => this.validateInput(e, 'dateErr')}
          />
          <span className={s.textErr}>{this.state.dateErr}</span>
          <p>Адрес</p>
          <input
            type='text'
            name='address'
            placeholder='введите адрес'
            className={s.address}
            value={this.state.address}
            onChange={this.handleChangeStr.bind(this)}
            onBlur={(e) => this.validateInput(e, 'addressErr')}
          />
          <span className={s.textErr}>{this.state.addressErr}</span>
          <p>Количество сетов</p>
          <input
            type='number'
            name='sets'
            placeholder='например, 3'
            className={s.sets}
            value={this.state.sets}
            onChange={this.handleChangeNum.bind(this)}
            onBlur={(e) => this.validateInput(e, 'setsErr')}
          />
          <span className={s.textErr}>{this.state.setsErr}</span>
          <p>Гонорар, Грн</p>
          <input
            type='number'
            name='salary'
            placeholder='гонорар за работу'
            className={s.salary}
            value={this.state.salary}
            onChange={this.handleChangeNum.bind(this)}
            onBlur={(e) => this.validateInput(e, 'salaryErr')}
          />
          <span className={s.textErr}>{this.state.salaryErr}</span>
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