import React from 'react'
import { connect } from 'react-redux'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { handleRedirect } from './handleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import Calendar from './Calendar'
import Button from './Button'
import img from '../../assets/img/start-choose-days-background.svg'
import s from './ChooseFreeDaysPage.module.css'


const mapStateToProps = state => {
  return {
    selectedDays: state.questReducer.selectedDays,
    authorized  : state.authReducer.authorized,
    role        : state.authReducer.role,
  }
}

const ChooseFreeDaysPage = ({ selectedDays, authorized, role }) => {

  async function handleSubmit() {
    try {
      await MuzSoyuzRequest.setDaysOff({
        dates : selectedDays,
        dayOff: true
      })
    }
    catch (e) {
      console.log(e.message)
    }
  }

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
          handleSubmit={handleSubmit}
        />
      </>
    )
  }

  return (
    <div className={s.chooseDaysWrapper}>
      {
        // handleRedirect(authorized, role, renderContent)
        renderContent()
      }
    </div>
  )
}

export default connect(mapStateToProps)(ChooseFreeDaysPage)