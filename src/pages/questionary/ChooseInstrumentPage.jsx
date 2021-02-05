import React from 'react'
import HandleRedirect from './HandleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import SelectInstrument from './SelectInstrument'
import Button from './Button'
import img from '../../assets/img/start-choose-instrument-background.svg'
import s from './ChooseInstrumentPage.module.css'


const ChooseInstrumentPage = () => {
  function renderContent() {
    return (
      <>
        <BackgroundImage
          img={img}
          imgClass={s.chooseInstBackground}
        />
        <Text
          text="Обери свій інструмент"
          textClass={s.chooseInstText}
        />
        <SelectInstrument/>
        <Button
          btnText="продовжити"
          nextRoute="/quest-experience"
          btnClass={s.chooseInstBtn}
        />
      </>
    )
  }

  return (
    <div className={s.chooseInstrumentPageWrapper}>
      {
        HandleRedirect(renderContent)
      }
    </div>
  )
}

export default ChooseInstrumentPage
