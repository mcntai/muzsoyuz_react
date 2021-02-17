import React from 'react'
import Header from '../../components/mainHeader/Header'
import Footer from '../../components/mainFooter/Footer'
import logo from '../../assets/img/logo.svg'
import background from '../../assets/img/background_main.svg'
import s from './Main.module.css'


class Main extends React.Component {

  render() {
    return (
      <div className={s.wrapper}>
        <div className={s.headerWrapper}>
          <Header/>
        </div>
        <main className={s.main}>
          <div className={s.logo}><img src={logo} alt='logo'/></div>
          <div className={s.imgWrapper}>
            <img src={background} className={s.background} alt="background"/>
          </div>
        </main>
        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </div>
    )
  }
}

export default Main