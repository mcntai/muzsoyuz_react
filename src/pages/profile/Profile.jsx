import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { goBack, updateImage } from '../../redux/actions/user'
import { profileImageUploaded, selectProfileImage } from "../../redux/slice/general"
import { selectProfile } from '../../redux/slice/user'
import ImageEasyCrop from "../../components/common/ImageEasyCrop"
import CollapseButton from '../findJobs/filters/CollapseButton'
import InputNameProfile from './InputNameProfile'
import InstrumentProfile from './InstrumentProfile'
import InputPhoneProfile from './InputPhoneProfile'
import SinglePickCalendar from '../../components/common/SinglePickCalendar'
import Logout from './Logout'
import avatar from '../../assets/img/avatar.svg'
import s from './Profile.module.css'
import styles from './CalendarProfile.module.css'


const Profile = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const [file, setFile] = useState(null)

  const userImage = useSelector(selectProfile('imageURL'))
  const isProfileImageUploaded = useSelector(selectProfileImage)

  const dispatch = useDispatch()

  const avatarWrapper = !isProfileImageUploaded ? s.avatarWrapper : s.hide
  const fileInput = !isProfileImageUploaded ? s.fileInput : s.hide
  const backBtn = !isProfileImageUploaded ? s.backBtn : s.hide

  useEffect(() => {
    return () => dispatch(profileImageUploaded(false))
  }, [dispatch])

  const fileSelectedHandler = (e) => {
    if (e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener("load", () => setImageUrl(reader.result))
      reader.readAsDataURL(e.target.files[0])

      setFile(e.target.files[0])
      dispatch(profileImageUploaded(true))
    }
    e.target.value = ''
  }

  return (
    (
      <div className={s.profileWrapper}>
        {
          isProfileImageUploaded
            ? <ImageEasyCrop uploadImageCallback={updateImage} base64={imageUrl} file={file}/>
            : null
        }
        <div className={s.profileTopSection}>
          <span className={backBtn} onClick={() => dispatch(goBack())}/>
          <div className={s.topContentWrapper}>
            <div className={avatarWrapper}>
              <img src={userImage || avatar} alt="avatar" className={s.avatar}/>
              <div className={s.changeAvatar} />
              <input type="file" accept="image/*" className={fileInput} onChange={fileSelectedHandler}/>
            </div>
            <InputNameProfile/>
          </div>
        </div>
        <div className={s.profileMiddleSection}>
          <div className={s.profileTitleWrapper}>
            <span className={s.profileTitle}>Профіль</span>
          </div>
          <CollapseButton
            title={'Твій інструмент'}
            btnWrapper={s.btnWrapperInstrument}
            filterName={s.filterName}
            innerContent={<InstrumentProfile/>}
          />
          <InputPhoneProfile/>
          <CollapseButton
            title={'Вільні дні'}
            btnWrapper={s.btnWrapperCalendar}
            filterName={s.filterName}
            innerContent={<SinglePickCalendar styles={styles}/>}
          />
        </div>
        <Logout btnWrapper={s.logoutBtnWrapper}/>
      </div>
    )
  )
}


export default Profile