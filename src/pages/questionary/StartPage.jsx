import React from 'react'
import { connect } from 'react-redux'
import { handleRedirect } from './handleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import Button from './Button'
import img from '../../assets/img/start-page-background.svg'
import s from './StartPage.module.css'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized,
    role      : state.authReducer.role,
  }
}

const StartPage = ({ authorized, role }) => {

  function renderContent() {
    return (
      <>
        <BackgroundImage
          img={img}
          imgClass={s.startImgBackground}
        />
        <Text
          text="Сервіс пошуку музикантів"
          textWrapperClass={s.startTextWrapper}
          textClass={s.startText}
        />
        <Button
          btnText="почати"
          nextRoute="/quest-instrument"
          btnClass={s.startBtn}
        />
      </>
    )
  }

  return (
    <div className={s.startPageWrapper}>
      {
        handleRedirect(authorized, role, renderContent)
      }
    </div>
  )
}

export default connect(mapStateToProps)(StartPage)