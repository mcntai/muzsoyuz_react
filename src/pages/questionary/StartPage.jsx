import React from 'react'
import HandleRedirect from './HandleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import Button from './Button'
import img from '../../assets/img/start-page-background.svg'
import s from './StartPage.module.css'


const StartPage = () => {

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
        HandleRedirect(renderContent)
      }
    </div>
  )
}

export default StartPage