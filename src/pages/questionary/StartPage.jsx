import React, { useEffect } from 'react'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import Button from './Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectProfile } from '../../redux/slice/user'
import { ROUTES as r } from '../../constants/routes'
import { goTo } from '../../redux/actions/user'
import img from '../../assets/img/start-page-background.svg'
import s from './StartPage.module.css'


const StartPage = () => {
  const userProfile = useSelector(selectProfile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userProfile.role) {
      dispatch(goTo(r.HOME))
    }
  }, [])

  return (
    <div className={s.startPageWrapper}>
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
    </div>
  )
}

export default StartPage