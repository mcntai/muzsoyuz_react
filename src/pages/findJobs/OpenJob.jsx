import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as swal from '../../components/common/alerts'
import Header from '../../components/mainHeader/Header'
import Footer from '../../components/mainFooter/Footer'
import avatar from '../../assets/img/avatar.svg'
import { useDispatch } from 'react-redux'
import { goTo } from '../../actions/user'
import { ROUTES as r } from '../../constants/routes'
import s from './OpenJob.module.css'


const role = {
  drums  : 'Барабанщик',
  pandora: 'Бандурист',
  bas    : 'Бас-гітарист',
  guitar : 'Гітарист',
  voice  : 'Вокаліст',
  sax    : 'Саксофоніст',
  trumpet: 'Трубач',
  violin : 'Скрипач',
  piano  : 'Клавішні'
}

const OpenJob = () => {
  let location = useLocation()
  const [data, setData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (location?.state?.data) {
      setData([location.state.data])
    } else {
      dispatch(goTo(r.FIND_JOB))
    }
  }, [])

  const handleChat = () => {
    swal.warning('Чат буде доступний в наступному релізі...', 'Пардон...')
  }

  return (
    <div>
      <Header/>
      {
        data.map(el => {
          const date = new Date(el.date).toLocaleDateString('uk-UA')
          const salary = Number(el.salary)

          return <div key={el.id} className={s.container}>
            <div className={s.jobWrapper}>
              <span className={s.title}>{el.title}</span>
              <span className={s.salary}>{salary} грн</span>
              <span className={s.description}>Опис</span>
              <div className={s.descriptionWrapper}>
                <span>Потрібен: {role[el.instrument.name]}</span>
                <span>Кількість сетів: {el.sets}</span>
                <span>Адреса: {el.address}</span>
                <span>{el.extraInfo && `Деталі: ${el.extraInfo}`}</span>
              </div>
              <span className={s.description}>Дата</span>
              <span className={s.date}>{date}</span>
              <div className={s.jobCreatorWrapper}>
                <div className={s.nameAndPhoneWrapper}>
                  <span className={s.userName}>{el.user.name || 'Анонімус'}</span>
                  <a href={`tel:${el.user.phone}`} className={s.userPhone}>{el.phone}</a>
                </div>
                <div>
                  <img src={el.user.imageURL || avatar} className={s.userImage} alt="avatar"/>
                </div>
              </div>
              <button className={s.chatBtn} onClick={handleChat}>Перейти в чат</button>
            </div>
            <div className={s.footerWrapper}>
              <Footer/>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default OpenJob