import React from 'react';
import s from './Main.module.css';
import Header from '../Components/InnerHeader/Header'
import slogan from '../Assets/img/slogan.png';
import background from '../Assets/img/background.png';
import findJob from '../Assets/img/findJob.png';
import mainPage from '../Assets/img/mainPage.png';
import offerJob from '../Assets/img/offerJob.png';
import {connect} from 'react-redux';
import preloader from '../Assets/img/preloader.gif'

const mapStateToProps = state => {
	return {
		loading: state.getProfileReducer.loading,
		error: state.getProfileReducer.error,
		isLoggedIn: state.getProfileReducer.isLoggedIn
	}
}

const mapDispatchToProps = dispatch => {
	return {
		mainPageRoute: () => {
			dispatch({
				type: 'MAIN_PAGE',
				currentRoute: 'main'
			})
		}
	}
}

class Main extends React.Component {
	componentDidMount() {
		this.props.mainPageRoute()
	}
	
	drawPage() {
		return (
			<div>
				<header className={s.header}>
					{
						this.props.isLoggedIn && <Header/>
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
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);