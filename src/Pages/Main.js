import React from 'react';
import s from './Main.module.css';
import Header from '../Components/InnerHeader/Header'
import slogan from '../Assets/img/slogan.png';
import background from '../Assets/img/background.png';
import findJob from '../Assets/img/findJob.png';
import mainPage from '../Assets/img/mainPage.png';
import offerJob from '../Assets/img/offerJob.png';



class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      token: localStorage.getItem('token')
    }
  }


  // async authHandler(response) {
  //   if (response.ok) {
  //     let result = await response.json();
  //
  //     this.setState({isLoggedIn: true});
  //
  //     console.log(result);
  //   }
  //   else {
  //     alert("Ошибка: " + response.status);
  //   }
  // }
  //
  // async isLoggedIn() {
  //   try {
  //     const response = await fetch("http://localhost:9000/api/v1/user/profile", {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${this.state.token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //
  //     await this.authHandler(response)
  //   }
  //   catch (e) {
  //     console.error(e)
  //   }
  // }
  //
  // componentDidMount() {
  //   this.isLoggedIn().catch(console.error)
  // }

  render() {
    return (
      <div className={s.wrapper}>
        <header className={s.header}>
          {
            this.state.isLoggedIn && <Header />
          }
        </header>
        <main className={s.main}>
          <img src={slogan} alt="slogan"/>
          <img src={background} alt="background"/>
          <div className={s.mainRow}></div>
        </main>
        <div className={s.footer}>
          <div>
            <a href="/find-job"><img src={findJob} alt="find-job-icon"/>Найти работу</a>
          </div>
          <div>
            <a href="/main"><img src={mainPage} alt="main page icon"/>Главная</a>
          </div>
          <div className={s.offerJob}>
            <a href="/offer-job"><img src={offerJob} alt="offer-job-icon"/>Предложить</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;