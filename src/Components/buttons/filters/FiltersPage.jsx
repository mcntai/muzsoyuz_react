import React, { useState } from 'react'
import HeaderInternal from '../../common/HeaderInternal'
import Footer from '../../common/Footer'
import s from './FiltersPage.module.css'
import background from '../../../Assets/img/filters-background.svg'


const FiltersPage = () => {
  const [button, setButton] = useState('')

  function expandButton(e) {
    setButton(e.target.name)
  }

  return (
    <div className={s.filtersPageWrapper}>
      <HeaderInternal
        prevRoute="/find-job"
        heading="Фільтр"
        btnText="Готово"
        wrapperClass={s.headerWrapper}
        btnTextClass={s.btnText}
      />
      <button
        name="instrument"
        className={s.btn}
        onClick={expandButton}
      >
        Інструменти
      </button>
      <button
        name="eventDate"
        className={s.btn}
        onClick={expandButton}
      >
        Дата проведення івенту
      </button>
      <button
        name="salary"
        className={s.btn}
        onClick={expandButton}
      >
        Зарплата, грн
      </button>
      <button
        name="sets"
        className={s.btn}
        onClick={expandButton}
      >
        Кількість сетів
      </button>
      <img
        src={background}
        alt="man playing on sax"
        className={s.background}
      />
      <div className={s.footerWrapper}>
        <Footer/>
      </div>
    </div>
  )
}

export default FiltersPage