import React from 'react'
import s from './Main.module.css'
import Header from '../Components/common/Header'
import Footer from '../Components/common/Footer'
import slogan from '../Assets/img/slogan.png'
import background from '../Assets/img/background.png'
import { connect } from 'react-redux'
import preloader from '../Assets/img/preloader.gif'


const mapStateToProps = state => {
  return {
    loading: state.getProfileReducer.loading,
    error: state.getProfileReducer.error,
    isLoggedIn: state.getProfileReducer.isLoggedIn,
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

  drawPage() {
    return (
      <div>
        <Header/>
        <main className={s.main}>
          <img src={slogan} alt="slogan"/>
          <img src={background} alt="background"/>
          <div className={s.mainRow}></div>
        </main>
        <Footer />
      </div>
    )
  }

  render() {
    return (
      <div className={s.wrapper}>
        {
          this.props.loading
            ? <div><img alt="preloader" src={preloader}/></div>
            : this.drawPage()
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)