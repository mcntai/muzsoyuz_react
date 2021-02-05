import React from 'react'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import Calendar from './Calendar'
import Button from './Button'
import img from '../../assets/img/start-choose-days-background.svg'
import s from './ChooseFreeDaysPage.module.css'


const ChooseFreeDaysPage = () => {
  function renderContent() {
    return (
      <>
        <BackgroundImage
          img={img}
          imgClass={s.chooseDaysBackground}
        />
        <Text
          text="Відзнач найближчі вільні дні, щоб тебе побачили роботодавці"
          textWrapperClass={s.chooseDaysTextWrapper}
          textClass={s.chooseDaysText}
        />
        <Calendar/>
        <Button
          btnText="завершити"
          nextRoute="/"
          btnClass={s.chooseDaysFinishBtn}
        />
      </>
    )
  }

  return (
    <div className={s.chooseDaysWrapper}>
      {
        HandleRedirect(renderContent)
      }
    </div>
  )
}

export default ChooseFreeDaysPage