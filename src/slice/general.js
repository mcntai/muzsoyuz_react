import { createSlice } from '@reduxjs/toolkit'


const generalSlice = createSlice({
  name         : 'general',
  initialState : {
    showCalendar: false,
    showText    : true,
    finishBtn   : '',
    isProfileImageUploaded: null,
  },
  reducers     : {
    toggleElement(state) {
      state.showCalendar = true
      state.showText = false
    },
    moveFinishBtnCalendarQuest(state) {
      state.finishBtn = true
    },
    profileImageUploaded(state, action) {
      state.isProfileImageUploaded = action.payload
    }
  },
  extraReducers: {}
})

export default generalSlice.reducer
export const selectShowText = state => state.general.showText
export const selectShowButton = state => state.general.finishBtn
export const selectShowCalendar = state => state.general.showCalendar
export const selectProfileImage = state => state.general.isProfileImageUploaded
export const { toggleElement, moveFinishBtnCalendarQuest, profileImageUploaded } = generalSlice.actions