import React from 'react'
import HandleRedirect from './HandleRedirect'
import BackgroundImage from './BackgroundImage'
import Text from './Text'
import YearsOfExperience from './YearsOfExperience'
import Button from './Button'
import img from '../../assets/img/start-choose-exp-background.svg'
import s from './ChooseExperiencePage.module.css'


const ChooseExperiencePage = () => {

  function renderContent() {
    return (
      <>
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
          <YearsOfExperience/>
        </div>
        <Button
          btnText="продовжити"
          nextRoute="/quest-free-days"
          btnClass={s.chooseExpFinishBtn}
        />
      </>
    )
  }

  return (
    <div className={s.chooseExpPageWrapper}>
      {
        HandleRedirect(renderContent)
      }
    </div>
  )
}

export default ChooseExperiencePage