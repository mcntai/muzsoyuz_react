import React, { useEffect, useState } from 'react'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import SelectInstrument from './SelectInstrument'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../redux/slice/user'
import { goTo, userProfileUpdate } from '../../redux/actions/user'
import { ROUTES as r } from '../../constants/routes'
import img from '../../assets/img/start-choose-instrument-background.svg'
import s from './ChooseInstrumentPage.module.css'


const ChooseInstrumentPage = () => {
  const [instrument, setInstrument] = useState(null)
  const userProfile = useSelector(selectProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userProfile.role) {
      dispatch(goTo(r.HOME))
    }
  }, [])

  function saveInstrumentToLocalState(inst) {
    setInstrument(inst)
  }

  function sendInstrumentForUpdate() {
    dispatch(userProfileUpdate({ role: instrument }))
  }

  return (
    <div className={s.chooseInstrumentPageWrapper}>
      <BackgroundImage
        img={img}
        imgClass={s.chooseInstBackground}
      />
      <Text
        text="Обери свій інструмент"
        textClass={s.chooseInstText}
      />
      <SelectInstrument saveInstrumentToLocalState={saveInstrumentToLocalState}/>
      <Button
        btnText="продовжити"
        nextRoute="/quest-experience"
        btnClass={s.chooseInstBtn}
        callback={sendInstrumentForUpdate}
      />
    </div>
  )
}

export default ChooseInstrumentPage
