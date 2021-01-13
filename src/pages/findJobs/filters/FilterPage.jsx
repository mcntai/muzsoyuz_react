import React from 'react'
import { connect } from 'react-redux'
import HeaderInternal from '../../../components/internalHeader/HeaderInternal'
import CollapseButton from './CollapseButton'
import InnerFilterInstrument from './InnerFilterInstrument'
import FilterInternalCalendar from './InnerFilterCalendar'
import InnerFilterSalary from './InnerFilterSalary'
import InnerFilterSets from './InnerFilterSets'
import s from './FilterPage.module.css'
import background from '../../../assets/img/filters-background.svg'


const mapStateToProps = state => {
  return {
    body: state.filterReducer
  }
}

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
      <CollapseButton
        title="Інструмент"
        btnWrapper={s.btnWrapper}
        filterName={s.filterName}
        innerContent={<InnerFilterInstrument/>}
      />
      <CollapseButton
        title="Дата проведення івенту"
        btnWrapper={s.btnWrapper}
        filterName={s.filterName}
        innerContent={<FilterInternalCalendar/>}
      />
      <CollapseButton
        title="Зарплата, грн"
        btnWrapper={s.btnWrapper}
        filterName={s.filterName}
        innerContent={<InnerFilterSalary/>}
      />
      <CollapseButton
        title="Кількість сетів"
        btnWrapper={s.btnWrapper}
        filterName={s.filterName}
        innerContent={<InnerFilterSets/>}
      />
      <div className={s.imgWrapper}>
        <img
          src={background}
          alt="man playing on sax"
          className={s.background}
        />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(FilterPage)