import React from 'react'
import s from './Main.module.css'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import amigo from '../Assets/img/X - 1.svg'
import { connect } from 'react-redux'
import preloader from '../Assets/img/preloader.gif'
import { pageRoute } from '../actions/routingActions'
import Confetti from 'react-confetti'



const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
  }
}

class Amigo extends React.Component {
  componentDidMount() {
    this.props.dispatch(pageRoute('MAIN_PAGE', '/'))
  }

  renderPage() {
    return (
      <div>
        <Header/>
        <main className={s.main}>
          <img src={amigo} alt="background" className={s.amigo}/>
          <div className={s.mainRow}/>
        </main>
        <div className={s.footer}>
          <Footer/>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={s.wrapper}>
        {
          this.props.loading
          ? <div className={s.preLoader}><img alt="preloader" src={preloader}/></div>
          : this.renderPage()
        }
        {
          <Confetti width="375px" height="812px" />
        }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Amigo)