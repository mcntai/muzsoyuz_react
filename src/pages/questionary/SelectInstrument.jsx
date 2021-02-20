import React from 'react'
import Select from 'react-select'
import s from './ChooseInstrumentPage.module.css'


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
  control            : (provided) => ({
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

const SelectInstrument = ({saveInstrumentToLocalState}) => {

  function handleChange(e) {
    saveInstrumentToLocalState(e.value)
  }

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

export default SelectInstrument