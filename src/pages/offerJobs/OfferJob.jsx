import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { makeOffer } from '../../actions/offers'
import { pageRoute } from '../../actions/routingActions'
import { jobOfferValidator } from '../../validators'
import Header from '../../components/mainHeader/Header'
import Footer from '../../components/mainFooter/Footer'
import { STAGES } from '../../slice/utils/constants'
import { selectProfile } from '../../slice/user'
import PopUp from '../../components/common/popUp'
import { clearError } from '../../actions/errors'
import s from './OfferJob.module.css'
import { selectError } from '../../reducers/errorsReducer'
import { selectMadeOffer } from '../../slice/offers'


const initialInputState = {
  title    : '',
  role     : '',
  date     : '',
  address  : '',
  sets     : '',
  salary   : '',
  phone    : '',
  extraInfo: '',
}

const initialErrorsState = {
  titleErr  : '',
  dateErr   : '',
  addressErr: '',
  setsErr   : '',
  salaryErr : '',
  phoneErr  : '',
}

const OfferJob = () => {
  const [inputs, setInputs] = useState(initialInputState)
  const [errors, setErrors] = useState(initialErrorsState)
  const [successMsg, setSuccessMsg] = useState(null)
  const user = useSelector(selectProfile)
  const offer = useSelector(selectMadeOffer)
  const serverError = useSelector(selectError)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pageRoute('OFFER_JOB', 'offer-job'))
  }, [])

  function handleChangeStr(e) {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: name === 'date' ? new Date(value) : value })
  }

  function handleChangeNum(e) {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: Number(value) })
  }

  function validateInput(e, name) {
    const { value } = e.target

    try {
      jobOfferValidator(name, name === 'dateErr' ? new Date(value) : value)
      setErrors({ ...errors, [name]: '' })
    }
    catch (e) {
      setErrors({ ...errors, [name]: e.message })
    }
  }

  function validateBeforeSubmit(e) {
    e.preventDefault()
    const emptyInputs = Object.keys(inputs).slice(0, -1).filter(inp => inputs[inp] === '')
    let temp = {}
    if (emptyInputs.length) {
      emptyInputs.forEach(inp => temp[inp + 'Err'] = 'Поле є обов\'язковим')
      setErrors({ ...errors, ...temp })
    } else {
      handleSubmit()
      setSuccessMsg('Оголошення створено')
    }
  }

  function handleSubmit() {
    dispatch(makeOffer({
      body: {
        jobType  : 'musicalReplacement',
        date     : inputs.date,
        address  : inputs.address,
        salary   : inputs.salary,
        sets     : inputs.sets,
        title    : inputs.title,
        role     : inputs.role,
        phone    : inputs.phone,
        extraInfo: inputs.extraInfo,
      }
    }))
  }

  function handleRedirectToPublishedOffer() {
    if (offer) {
      setSuccessMsg('')
    }
  }

  function renderPage() {
    return (
      <div>
        <div className={s.headerWrapper}>
          <Header/>
        </div>
        <div className={s.jobCreateWrapper}>
          <p className={s.jobCreate}>Запропонуй роботу</p>
        </div>
        <PopUp
          text={serverError ? serverError : successMsg}
          type={serverError ? 'fail' : 'success'}
          callback={() => serverError ? dispatch(clearError()) : handleRedirectToPublishedOffer()}
        />
        <form action="" className={s.form}>
          <p>Заголовок оголошення</p>
          <div className={s.inputWrapper}>
            <input
              type='text'
              name='title'
              placeholder='введіть заголовок'
              className={s.input}
              value={inputs.title}
              onChange={handleChangeStr}
              onBlur={(e) => validateInput(e, 'titleErr')}
            />
          </div>
          <span className={s.textErr}>{errors.titleErr}</span>

          <p>Роль</p>
          <select
            required name='role'
            className={s.role}
            defaultValue='default'
            onChange={handleChangeStr}
          >
            <option value=''>хто вам потрібен?</option>
            <option value='drums'>Барабанщик</option>
            <option value='pandora'>Бандурист</option>
            <option value='bas'>Басист</option>
            <option value='guitar'>Гітарист</option>
            <option value='voice'>Вокаліст</option>
            <option value='sax'>Саксофоніст</option>
            <option value='trumpet'>Трубач</option>
            <option value='violin'>Скрипач</option>
            <option value='piano'>Піаніст</option>
          </select>

          <p>Дата</p>
          <div className={s.inputWrapper}>
            <input
              type='date'
              name='date'
              className={[s.inpDate, s.input].join(' ')}
              onChange={handleChangeStr}
              onBlur={(e) => validateInput(e, 'dateErr')}
            />
          </div>
          <span className={s.textErr}>{errors.dateErr}</span>

          <p>Адреса</p>
          <div className={s.inputWrapper}>
            <input
              type='text'
              name='address'
              placeholder='введіть адресу'
              className={s.input}
              value={inputs.address}
              onChange={handleChangeStr}
              onBlur={(e) => validateInput(e, 'addressErr')}
            />
          </div>
          <span className={s.textErr}>{errors.addressErr}</span>

          <p>Кількість сетів</p>
          <div className={s.inputWrapper}>
            <input
              type='number'
              pattern='\d*'
              name='sets'
              placeholder='наприклад, 3'
              className={s.input}
              value={inputs.sets}
              onChange={handleChangeNum}
              onBlur={(e) => validateInput(e, 'setsErr')}
            />
          </div>
          <span className={s.textErr}>{errors.setsErr}</span>

          <p>Гонорар, грн</p>
          <div className={s.inputWrapper}>
            <input
              type='number'
              pattern='\d*'
              name='salary'
              placeholder='гонорар за роботу'
              className={s.input}
              value={inputs.salary}
              onChange={handleChangeNum}
              onBlur={(e) => validateInput(e, 'salaryErr')}
            />
          </div>
          <span className={s.textErr}>{errors.salaryErr}</span>

          <p>Ваш телефон</p>
          <div className={s.inputWrapper}>
            <input
              type='number'
              pattern='\d*'
              name='phone'
              placeholder='0 93 111 22 33'
              className={s.input}
              value={inputs.phone}
              onChange={handleChangeNum}
              onBlur={(e) => validateInput(e, 'phoneErr')}
            />
          </div>
          <span className={s.textErr}>{errors.phoneErr}</span>

          <p>Додаткові деталі</p>
          <div className={s.inputWrapper}>
            <textarea
              name='extraInfo'
              placeholder='будь яка додаткова інформація'
              className={s.textArea}
              value={inputs.extraInfo}
              onChange={handleChangeStr}
            />
          </div>
          <button className={s.submit} onClick={validateBeforeSubmit}>Опублікувати</button>
        </form>

        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        user?.status !== STAGES.SUCCESS && <Redirect to='/login'/>
      }
      {
        renderPage()
      }
      {
        successMsg === ''
        ? <Redirect to={{
          pathname: '/open-job',
          state   : { data: offer }
        }}/>
        : null
      }
    </div>
  )
}


export default OfferJob