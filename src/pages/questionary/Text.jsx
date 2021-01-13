import React from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    showText: state.questReducer.showText
  }
}

const Text = ({ text, textWrapperClass, textClass, showText }) => {
  return (
    <div className={textWrapperClass}>
      {
        showText
        ? <span className={textClass}>{text}</span>
        : null
      }
    </div>
  )
}

export default connect(mapStateToProps)(Text)