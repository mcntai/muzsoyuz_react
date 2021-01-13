import React from 'react'
import { connect } from 'react-redux'
import { pageRoute } from '../../actions/routingActions'
import Header from '../../Components/mainHeader/Header'
import Footer from '../../Components/mainFooter/Footer'
import logo from '../../Assets/img/logo.svg'
import background from '../../Assets/img/background.svg'
import preloader from '../../Assets/img/preloader.gif'
import s from './Main.module.css'


const mapStateToProps = state => {
  return {
    loading  : state.authReducer.loading,
    prevRoute: state.pageReducer.prevRoute
  }
}

class Main extends React.Component {
  componentDidMount() {
    this.props.dispatch(pageRoute('MAIN_PAGE', '/'))
  }

  renderPage() {
    return (
      <>
        <Header/>
        <main className={s.main}>
          <div className={s.logo}><img src={logo} alt='logo'/></div>
          <div className={s.imgWrapper}>
            <img src={background} className={s.background} alt="background"/>
          </div>
        </main>
          <Footer/>
      </>
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(Main)