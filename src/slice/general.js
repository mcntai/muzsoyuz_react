import { createSlice } from '@reduxjs/toolkit'


const generalSlice = createSlice({
  name         : 'general',
  initialState : {
    showCalendar: false,
    showText    : true,
    finishBtn   : '',
  },
  reducers     : {
    toggleElement(state) {
      state.showCalendar = true
      state.showText = false
    },
    moveFinishBtnCalendarQuest(state) {
      state.finishBtn = true
    }
  },
  extraReducers: {}
})

export default generalSlice.reducer
export const selectShowText = state => state.general.showText
export const selectShowButton = state => state.general.finishBtn
export const selectShowCalendar = state => state.general.showCalendar
export const { toggleElement, moveFinishBtnCalendarQuest } = generalSlice.actions