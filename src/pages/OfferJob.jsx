import React from 'react'
import s from './OfferJob.module.css'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import {MuzSoyuzRequest} from '../muzsoyuz-request'

class OfferJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title         : '',
      role          : 'drums',
      date          : '',
      address       : '',
      sets          : '',
      salary        : '',
      additionalInfo: '',
      phone         : '',
    }
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

  handleAdditionalInfo(e) {
    this.setState({ additionalInfo: e.target.value })
  }

  handlePhone(e) {
    this.setState({ phone: e.target.value })
  }

  async handleSubmit() {
    try {
      const response = await MuzSoyuzRequest.post('/job', {
        jobType: 'musicalReplacement',
        date    : this.state.date.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'),
        address : this.state.address,
        salary  : this.state.salary,
        sets    : this.state.sets,
        title   : this.state.title,
        role    : this.state.role,
      })
        .sendToken()

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
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
          <select placeholder='кто вам нужен?' className={s.role} defaultValue='drums'
                  onChange={this.handleRoleSelect.bind(this)}>
            <option value='drums'>Барабанщик</option>
            <option value='bas'>Басист</option>
            <option value='guitar'>Гитарист</option>
            <option value='voice'>Вокалист</option>
            <option value='sax'>Саксофонист</option>
            <option value='trumpet'>Трубач</option>
            <option value='piano'>Клавишные</option>
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
          {/*<p>Дополнительная информация*</p>*/}
          {/*<input type='text' placeholder='важные детали' className={s.info} value={this.state.additionalInfo}*/}
          {/*       onChange={this.handleAdditionalInfo.bind(this)}/>*/}
          <p>Контактный телефон*</p>
          <input type='text' placeholder='+38 (0--) --- -- --' className={s.phone} value={this.state.phone}
                 onChange={this.handlePhone.bind(this)}/>
          <p className={s.note}>* - обязательное поле</p>
        </form>
        <button className={s.submit} onClick={this.handleSubmit.bind(this)}/>
        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default OfferJob