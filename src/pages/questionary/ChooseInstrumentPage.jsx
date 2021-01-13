import React from 'react'
import { connect } from 'react-redux'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { handleRedirect } from './handleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import SelectInstrument from './SelectInstrument'
import Button from './Button'
import img from '../../Assets/img/start-choose-instrument-background.svg'
import s from './Questionary.module.css'


const mapStateToProps = state => {
  return {
    selectedInst: state.questReducer.selectedInst,
    authorized  : state.authReducer.authorized,
    role        : state.authReducer.role,
  }
}

const ChooseInstrumentPage = ({ selectedInst, authorized, role }) => {

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
          imgClass={s.chooseInstBack}
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
        handleRedirect(authorized, role, renderContent)
      }
    </div>
  )
}

export default connect(mapStateToProps)(ChooseInstrumentPage)
