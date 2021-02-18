import React, { useEffect, useState } from 'react'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import YearsOfExperience from './YearsOfExperience'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../slice/user'
import { goTo, userProfileUpdate } from '../../actions/user'
import { ROUTES as r } from '../../constants/routes'
import img from '../../assets/img/start-choose-exp-background.svg'
import s from './ChooseExperiencePage.module.css'


const ChooseExperiencePage = () => {
  const [year, setYear] = useState(null)
  const userProfile = useSelector(selectProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userProfile.yearCommercialExp) {
      dispatch(goTo(r.HOME))
    }
  }, [])

  function saveYearToLocalState(y) {
    setYear(y)
  }

  function sendYearForUpdate() {
    dispatch(userProfileUpdate({ yearCommercialExp: year }))
  }

  return (
    <div className={s.chooseExpPageWrapper}>
      <BackgroundImage
        img={img}
        imgClass={s.chooseExpImgBackground}
      />
      <Text
        text="Скільки у тебе років досвіду на вказаному інструменті?"
        textWrapperClass={s.chooseExpTextWrapper}
        textClass={s.chooseExpText}
      />
      <div className={s.yearExpBtnsWrapper}>
        <YearsOfExperience sendYearForUpdate={saveYearToLocalState}/>
      </div>
      <Button
        btnText="продовжити"
        nextRoute="/quest-free-days"
        btnClass={s.chooseExpFinishBtn}
        callback={sendYearForUpdate}
      />
    </div>
  )
}

export default ChooseExperiencePage