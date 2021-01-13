import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import s from './Questionary.module.css'


const options = [
  { value: 'drums', label: 'Барабани' },
  { value: 'pandora', label: 'Бандура' },
  { value: 'bas', label: 'Бас-гітара' },
  { value: 'guitar', label: 'Гітара' },
  { value: 'voice', label: 'Вокал' },
  { value: 'sax', label: 'Саксофон' },
  { value: 'trumpet', label: 'Труба' },
  { value: 'violin', label: 'Скрипка' },
  { value: 'piano', label: 'Клавішні' },
]

const customStyles = {
  valueContainer     : (provided) => ({
    ...provided,
    justifyContent: 'center',
    height        : '40px',
  }),
  control            : (provided, state) => ({
    ...provided,
    borderColor  : '#DADADA',
    width        : 260,
    textAlignLast: 'center',
    borderRadius : '13px',
    fontSize     : '14px',
  }),
  placeholder        : () => ({
    color: '#262D33'
  }),
  indicatorsContainer: () => ({
    display: 'none'
  }),
  dropdownIndicator  : () => ({}),
  indicatorSeparator : () => ({}),
  invalid            : () => ({
    textAlignLast: 'center',
  })
}

const saveSelectedInst = (selectedInst) => ({
  type: 'SAVE_SELECTED_INSTRUMENT',
  selectedInst
})

const SelectInstrument = (props) => {
  const [selectedOption, setSelectedOption] = useState('')

  function handleChange(e) {
    setSelectedOption(e.value)
  }

  useEffect(() => {
    props.dispatch(saveSelectedInst(selectedOption))
  })


  return (
    <div>
      <Select
        styles={customStyles}
        placeholder='Обрати'
        onChange={handleChange}
        options={options}
        className={s.selectInstrument}
        isSearchable={false}
      >
      </Select>
    </div>
  )
}

export default connect(undefined)(SelectInstrument)