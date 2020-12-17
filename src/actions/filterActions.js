export const filterInstruments = (instrument) => ({
  type: 'FILTER_INSTRUMENTS',
  instrument,
})

export const filterDate = (from, to) => ({
  type: 'FILTER_DATE',
  from,
  to,
})

export const filterSalary = (from, to) => ({
  type: 'FILTER_SALARY',
  from,
  to,
})

export const filterSets = (sets) => ({
  type: 'FILTER_SETS',
  sets,
})

export const sortDesc = (param) => ({
  type: 'SORT_DESC',
  param: `${param} DESC`
})

export const sortAsc = (param) => ({
  type: 'SORT_ASC',
  param: `${param} ASC`
})


