import React from 'react'
import s from './FindJob.module.css'
import img from '../Assets/img/drums.png'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import { MuzSoyuzRequest } from '../muzsoyuz-request'

class FindJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fetchFinished: false,
      fetchedData: [],
    }
  }

  renderJobOffers(data) {
    return (
      <div className={s.listWrapper}>
        {
          data && this.state.fetchedData.map(item => {
            const date = new Date(item.date)

            return <li key={item.id} className={s.list}>
              <div className={s.jobOfferWrapper}>
                <img className={s.listImage} src={img} alt='Job offer'/>
                <div className={s.listTextWrapper}>
                  <h3 className={s.listTitle}>{item.title}</h3>
                  <p className={s.listSalary}>Оплата: {item.salary},Грн</p>
                </div>
                <p className={s.listDate}>{date.getDate()}.{date.getMonth() + 1}</p>
              </div>
            </li>
          })
        }
      </div>
    )
  }


  async getAllJobOffers() {
    try {
      const response = await MuzSoyuzRequest.getFeed('musicalReplacement')
        .props([
          'id',
          'title',
          'date',
          'role',
          'salary',
        ])
      console.log(response)
      this.setState({ fetchFinished: true })

      if (response.status !== 400) {
        this.setState({ fetchedData: response })
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  async componentDidMount() {
    await this.getAllJobOffers()
  }

  render() {
    return (
      <div className={s.findJobWrapper}>
        <div className={s.headerWrapper}>
        <Header/>
        </div>
        <p className={s.jobSearch}>Поиск работы</p>
        <div className={s.sortFilterBtns}>
          <button>Сортировать</button>
          <button>Фильтр</button>
        </div>
        {
          this.state.fetchFinished && this.renderJobOffers(this.state.fetchedData)
        }
        <Footer/>
      </div>
    )
  }
}

export default FindJob