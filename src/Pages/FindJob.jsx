import React from 'react'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import {Request} from '../utils/request'

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
      const response = await Request.get('/feed')
        .query({
          feedType: 'musicalReplacement',
          props   : [
            'id',
            'title',
            'date',
            'role',
            'salary',
          ],
        })
        .setToken()

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
        <Footer/>
      </div>
    )
  }
}

export default FindJob