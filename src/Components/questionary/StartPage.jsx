import React from 'react'
import { connect } from 'react-redux'
import { handleRedirect } from './handleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import Button from './Button'
import img from '../../Assets/img/start-page-background.svg'
import s from './Questionary.module.css'


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
          imgClass={s.startImgBack}
        />
        <Text
          text="Сервіс пошуку музикантів"
          textWrapperClass={s.textWrapper}
          textClass={s.startText}
        />
        <Button
          btnText="почати"
          nextRoute="/quest-2"
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