import React from 'react'
import { connect } from 'react-redux'
import { MuzSoyuzRequest } from '../muzsoyuz-request'
import { omitBy, predicates } from '../utils/object'
import { pageRoute } from '../actions/routingActions'
import * as swal from '../Components/common/Alerts'
import Header from '../Components/common/Header'
import HeaderInternalButtons from '../Components/common/HeaderInternalButtons'
import Footer from '../Components/common/Footer'
import preloader from '../Assets/img/preloader.gif'
import s from './FindJob.module.css'


const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    prevRoute : state.pageReducer.prevRoute,
    body: state.filterReducer
  }
}

class FindJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchFinished: false,
      fetchedData  : [],
    }
  }

  renderJobOffers(data) {
    return (
      <div className={s.jobsWrapper}>
        {
          data && this.state.fetchedData.map(item => {
            const date = new Date(item.date)

            let month = date.toLocaleString('default', { month: 'short' })
            month = month.charAt(0).toUpperCase() + month.slice(1, month.length - 1)

            const salary = Number(item.salary)

            return <li key={item.id} className={s.list}>
              <div className={s.jobOfferWrapper}>
                <img src={item.instrument.imageURL} alt='Instrument'/>
                <div>
                  <p className={s.jobTitle}>{item.title}</p>
                  <p className={s.jobSalary}>Оплата: {salary}, Грн</p>
                </div>
                <p className={s.jobDate}>{date.getDate()} {month}</p>
              </div>
            </li>
          })
        }
      </div>
    )
  }

  async getAllJobOffers() {
    const transformedBody = omitBy(this.props.body, predicates.isEmptyString)

    try {
      const response = await MuzSoyuzRequest.getJobOffers(transformedBody)
        .props([
          'id',
          'title',
          'date',
          'salary',
          'address',
        ])

      console.log(response)

      this.setState({ fetchFinished: true })
      this.setState({ fetchedData: response })

    }
    catch (e) {
      if (e.message === 'Bad Request Exception') {
        swal.error('Повідомте адміна, якщо можете', 'Щось пішло не так...')
      }
    }

  }

  componentDidMount() {
    this.getAllJobOffers().catch(error => {
      alert(error.message)
    })

    this.props.dispatch(pageRoute('FIND_JOB', 'find-job'))
  }

  renderPage() {
    return (
      <div>
        <div className={s.headerWrapper}>
          <Header/>
        </div>
        <p className={s.jobSearch}>Пошук роботи</p>
        <HeaderInternalButtons
          firstText="Сортувати"
          firstRoute='/find-job-sort'
          secondText="Фільтр"
          secondRoute='/find-job-filter'
        />
        {
          this.state.fetchFinished && this.renderJobOffers(this.state.fetchedData)
        }
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
          this.props.loading
          ? <div className={s.preLoader}><img alt="preloader" src={preloader}/></div>
          : this.renderPage()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(FindJob)