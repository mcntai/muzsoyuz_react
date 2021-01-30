import React from 'react'
import { connect } from 'react-redux'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import HandleRedirect from './HandleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import SelectInstrument from './SelectInstrument'
import Button from './Button'
import img from '../../assets/img/start-choose-instrument-background.svg'
import s from './ChooseInstrumentPage.module.css'


const mapStateToProps = state => {
  return {
    selectedInst: state.questReducer.selectedInst,
  }
}

const ChooseInstrumentPage = ({ selectedInst }) => {

  async function handleSubmit() {
    try {
      await MuzSoyuzRequest.makeProfileUpdate({
        role: selectedInst,
      })
    }
    catch (e) {
      console.error(e)
    }
  }

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
          handleSubmit={handleSubmit}
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

export default connect(mapStateToProps)(ChooseInstrumentPage)
