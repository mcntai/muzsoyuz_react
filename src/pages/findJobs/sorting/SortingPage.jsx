import React from 'react'
import HeaderInternal from '../../../components/internalHeader/HeaderInternal'
import SortingButton from './SortingButton'
import background from '../../../assets/img/filters-background.svg'
import s from './SortingPage.module.css'


const SortingPage = () => {
  return (
    <div className={s.sortingPageWrapper}>
      <HeaderInternal
        prevRoute="/find-job"
        heading="Сортування"
        wrapperClass={s.headerWrapper}
        btnTextClass={s.btnText}
        redirectTo="/find-job"
      />
      <SortingButton
        param="date"
        title="Дата проведення івенту"
        btnTextFirst="Спочатку пізніші івенти"
        btnTextSecond="Спочатку найближчі івенти"
      />
      <SortingButton
        param="salary"
        title="Зарплата, грн"
        btnTextFirst="Від найбільшої"
        btnTextSecond="Від найменшої"
      />
      <SortingButton
        param="sets"
        title="Кількісь сетів"
        btnTextFirst="Від найбільшої"
        btnTextSecond="Від найменшої"
      />
      <div className={s.imgWrapper}>
        <img
          src={background}
          alt="man playing on sax"
          className={s.imgBackground}
        />
      </div>
    </div>
  )
}


export default SortingPage