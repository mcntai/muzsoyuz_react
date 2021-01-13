import React from 'react'
import { connect } from 'react-redux'
import { filterSets } from '../../../actions/filterActions'
import s from './InnerFilterSets.module.css'


const InnerFilterSets = (props) => {

  const chooseSets = (e) => {
    props.dispatch(filterSets(e.target.value))
  }

  return (
    <div className={s.setsWrapper}>
      <select className={s.selector} onChange={chooseSets}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  )
}

export default connect(undefined)(InnerFilterSets)