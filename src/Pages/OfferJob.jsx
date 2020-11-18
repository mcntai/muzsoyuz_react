import React from 'react'
import s from './OfferJob.module.css'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import preloader from '../Assets/img/preloader.gif'
import { pageRoute } from '../actions/routingActions'


const mapStateToProps = state => {
  return {
    loading   : state.authReducer.loading,
    authorized: state.authReducer.authorized,
  }
}

class OfferJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title  : '',
      role   : '',
      date   : '',
      address: '',
      sets   : '',
      salary : '',
      phone  : '',
    }
  }

  componentDidMount() {
    this.props.dispatch(pageRoute('OFFER_JOB', 'offer-job'))
  }

  handleTitleInput(e) {
    this.setState({ title: e.target.value })
  }

  handleRoleSelect(e) {
    this.setState({ role: e.target.value })
  }

  handleDateInput(e) {
    this.setState({ date: e.target.value })
  }

  handleAddressInput(e) {
    this.setState({ address: e.target.value })
  }

  handleSetsInput(e) {
    this.setState({ sets: parseInt(e.target.value) })
  }

  handleSalaryInput(e) {
    this.setState({ salary: parseInt(e.target.value) })
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

      console.log(response)
    }
    catch (error) {
      alert(error.message)
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
          <input type='text' placeholder='введите заголовок' className={s.title} value={this.state.title}
                 onChange={this.handleTitleInput.bind(this)}/>
          <p>Роль</p>
          <select required className={s.role} defaultValue='default'
                  onChange={this.handleRoleSelect.bind(this)}>
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
          <input type='text' placeholder='дд.мм.гггг' className={s.date} value={this.state.date}
                 onChange={this.handleDateInput.bind(this)}/>
          <p>Адрес</p>
          <input type='text' placeholder='введите адрес' className={s.address} value={this.state.address}
                 onChange={this.handleAddressInput.bind(this)}/>
          <p>Количество сетов</p>
          <input type='number' placeholder='например, 3' className={s.sets} value={this.state.sets}
                 onChange={this.handleSetsInput.bind(this)}/>
          <p>Гонорар, Грн</p>
          <input type='number' placeholder='гонорар за работу' className={s.salary} value={this.state.salary}
                 onChange={this.handleSalaryInput.bind(this)}/>
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