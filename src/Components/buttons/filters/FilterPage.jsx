import React from 'react'
import { connect } from 'react-redux'
import HeaderInternal from '../../common/HeaderInternal'
import CollapseButton from './CollapseButton'
import InnerFilterInstrument from './InnerFilterInstrument'
import FilterInternalCalendar from './InnerFilterCalendar'
import InnerFilterSalary from './InnerFilterSalary'
import InnerFilterSets from './InnerFilterSets'
import s from './FilterPage.module.css'
import background from '../../../Assets/img/filters-background.svg'


const mapStateToProps = state => {
  return {
    body     : state.filterReducer
  }
}

const FilterPage = ({body}) => {
  // const filtersNumber = Object.keys(body).length - 2

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
      {/*<span className={s.filtersNumber}>{filtersNumber}</span>*/}
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

export default connect(mapStateToProps)(FilterPage)