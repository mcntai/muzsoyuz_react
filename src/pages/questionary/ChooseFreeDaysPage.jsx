import React, { useEffect, useState } from 'react'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import SinglePickCalendar from '../../components/common/SinglePickCalendar'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectDaysOff } from '../../redux/slice/user'
import { moveFinishBtnCalendarQuest, selectShowCalendar, toggleElement } from '../../redux/slice/general'
import { ROUTES as r } from '../../constants/routes'
import { goTo } from '../../redux/actions/user'
import img from '../../assets/img/start-choose-days-background.svg'
import s from './ChooseFreeDaysPage.module.css'


const ChooseFreeDaysPage = () => {
  const showCal = useSelector(selectShowCalendar)
  const daysOff = useSelector(selectDaysOff)
  const [showBtn, setShowBtn] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (daysOff.length) {
      dispatch(goTo(r.HOME))
    }
  }, [])

  function handleShowCalendar() {
    const button = showBtn === null ? s.showBtn : null
    setShowBtn(button)

    dispatch(toggleElement())
    dispatch(moveFinishBtnCalendarQuest())
  }

  return (
    <div className={s.chooseDaysWrapper}>
      <BackgroundImage
        img={img}
        imgClass={s.chooseDaysBackground}
      />
      <Text
        text="Відзнач найближчі вільні дні, щоб тебе побачили роботодавці"
        textWrapperClass={s.chooseDaysTextWrapper}
        textClass={s.chooseDaysText}
      />
      <button
        className={[showBtn, s.calendarBtn].join(' ')}
        onClick={handleShowCalendar}>
        Календар
      </button>
      {
        showCal
        ? <SinglePickCalendar styles={s}/>
        : null
      }
      <Button
        btnText="завершити"
        nextRoute="/"
        btnClass={s.chooseDaysFinishBtn}
      />
    </div>
  )
}

export default ChooseFreeDaysPage