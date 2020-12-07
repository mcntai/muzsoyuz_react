import produce from 'immer'


const initialState = {
  showCalendar: false,
  showText    : true,
  finishBtn   : '',
  selectedInst: '',
  selectedDays: [],
}

const questionaryReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'SHOW_HIDE_ELEMENT':
        draft.showCalendar = action.showCal
        draft.showText = action.showText
        break
      case 'MOVE_FINISH_BUTTON':
        draft.finishBtn = action.finishBtn
        break
      case 'SAVE_SELECTED_INSTRUMENT':
        draft.selectedInst = action.selectedInst
        break
      case 'SAVE_SELECTED_DAYS':
        draft.selectedDays = action.selectedDays
        break
      default:
        return state
    }
  })
}

export default questionaryReducer