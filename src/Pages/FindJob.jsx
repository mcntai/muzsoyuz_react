import React from 'react'
import s from './FindJob.module.css'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'

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
      <div>
        {
          data && this.state.fetchedData.map(item => {
            const date = new Date(item.date)

            return <li key={item.id}>
              <h3>{item.title}</h3>
              <p>Гонорар: {item.salary}, Грн</p>
              <p>{date.getDate()}.{date.getMonth() + 1} от рождества Христова</p>
            </li>
          })
        }
      </div>
    )
  }


  async getAllJobOffers() {
    try {
      const response = await fetch('http://localhost:9000/api/v1/feed?feedType=musicalReplacement&props=id,title,date,musicalInstrument,salary')
      const json = await response.json()

      console.log(json)

      this.setState({ fetchFinished: true })

      this.setState({ fetchedData: json || [] })
    } catch (error) {
      console.error(error.message)
    }
  }

  async componentDidMount() {
    await this.getAllJobOffers()
  }

  render() {
    return (
      <div>
        <Header/>
        <p>Поиск работы</p>
        <div>
          <button>Сортировать</button>
          <button>Фильтр</button>
        </div>
        {
          this.state.fetchFinished
            ? this.renderJobOffers(this.state.fetchedData)
            : null
        }
        <Footer />
      </div>
    )
  }
}

export default FindJob