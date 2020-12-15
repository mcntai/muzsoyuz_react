import React from 'react'
import { HandleRedirect } from './HandleRedirect'
import HeaderInternal from '../../common/HeaderInternal'
import CollapseButton from './CollapseButton'
import InnerFilterInstrument from './InnerFilterInstrument'
import FilterInternalCalendar from './FilterInternalCalendar'
import InnerFilterSalary from './InnerFilterSalary'
import InnerFilterSets from './InnerFilterSets'
import s from './FilterPage.module.css'
import background from '../../../Assets/img/filters-background.svg'


const FilterPage = () => {

  return (
    <div className={s.filtersPageWrapper}>
      <HeaderInternal
        prevRoute="/find-job"
        heading="Фільтр"
        btnText="Готово"
        wrapperClass={s.headerWrapper}
        btnTextClass={s.btnText}
        redirectTo="/find-job"
      />
      <CollapseButton title="Інструмент" innerContent={<InnerFilterInstrument/>}/>
      <CollapseButton title="Дата проведення івенту" innerContent={<FilterInternalCalendar/>}/>
      <CollapseButton title="Зарплата, грн" innerContent={<InnerFilterSalary/>}/>
      <CollapseButton title="Кількість сетів" innerContent={<InnerFilterSets/>}/>
      <img
        src={background}
        alt="man playing on sax"
        className={s.background}
      />
    </div>
  )
}

export default FilterPage