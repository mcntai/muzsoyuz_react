import React from 'react'
import s from './Main.module.css'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import logo from '../Assets/img/logo.png'
import background from '../Assets/img/background.png'
import { connect } from 'react-redux'
import preloader from '../Assets/img/preloader.gif'


const mapStateToProps = state => {
  return {
    loading: state.getProfileReducer.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mainPageRoute: () => {
      dispatch({
        type: 'MAIN_PAGE',
        currentRoute: 'main',
      })
    },
  }
}

class Main extends React.Component {
  componentDidMount() {
    this.props.mainPageRoute()
  }

  renderPage() {
    return (
      <div>
        <Header/>
        <main className={s.main}>
          <div className={s.logo}><img src={logo} alt='logo'/></div>
          <img src={background} alt="background"/>
          <div className={s.mainRow}/>
        </main>
        <Footer/>
      </div>
    )
  }

  render() {
    return (
      <div className={s.wrapper}>
        {
          this.props.loading
            ? <div className={s.preLoader}><img alt="preloader" src={preloader} /></div>
            : this.renderPage()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)