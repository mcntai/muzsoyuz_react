import React, { useState, useEffect } from 'react'
import useInfiniteScroll from '../../components/common/useInfniteScroll'
import { connect } from 'react-redux'
import { MuzSoyuzRequest } from '../../muzsoyuz-request'
import { omitBy, predicates } from '../../utils/object'
import { pageRoute } from '../../actions/routingActions'
import Header from '../../components/mainHeader/Header'
import SortingFilterButtons from './SortingFilterButtons'
import Footer from '../../components/mainFooter/Footer'
import preloader from '../../assets/img/preloader.gif'
import s from './FindJob.module.css'
import { NavLink } from 'react-router-dom'


const mapStateToProps = state => {
  return {
    loading  : state.authReducer.loading,
    prevRoute: state.pageReducer.prevRoute,
    body     : state.filterReducer
  }
}


const FindJob = ({ loading, body, dispatch }) => {
  const [fetchedData, setFetchedData] = useState([])
  const [fetchFinished, setFetchFinished] = useState(false)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOffers)
  const [offSet, setOffSet] = useState(0)
  const [infiniteScrollFinished, setInfiniteScrollFinished] = useState(false)

  useEffect(() => {
    let isCancelled = false

    getAllJobOffers().catch()

    dispatch(pageRoute('FIND_JOB', 'find-job'))

    return () => {
      isCancelled = true
    }
  }, [])

  async function getAllJobOffers(count) {
    const transformedBody = omitBy(body,
      value => predicates.isEmptyString(value) || predicates.isEmptyRange(value) || predicates.isEmptyArray(value))
    transformedBody.offset = count * 30

    const response = await MuzSoyuzRequest.getJobOffers(transformedBody)
      .props([
        'id',
        'title',
        'date',
        'salary',
        'address',
        'sets',
        'phone',
        'extraInfo',
      ])

    if (count > 0) {
      return response
    } else if (response) {
      setFetchFinished(true)
      setFetchedData(response)

      return response
    }
  }

  async function fetchMoreOffers() {
    let count = offSet + 1
    const response = await getAllJobOffers(count)

    if (response && response.length < 1) {
      setInfiniteScrollFinished(true)
    } else if (response) {
      setFetchedData(prevState => ([...prevState, ...response]))
      setIsFetching(false)
      setOffSet(offSet + 1)
    }
  }

  const renderJobOffers = data => {
    return (
      <div className={s.jobsWrapper}>
        {
          data && fetchedData.map(item => {
            const date = new Date(item.date)

            let month = date.toLocaleString('uk-UA', { month: 'short' })

            const salary = Number(item.salary)

            return <li key={item.id} className={s.jobOfferItem}>
              <NavLink className={s.navLinkWrapper} to={{
                pathname: '/open-job',
                state   : { data: item }
              }}>
                <div className={s.jobOfferContentWrapper}>
                  <img src={item.instrument.imageURL} alt='Instrument' className={s.instrumentIcon}/>
                  <div className={s.jobTextWrapper}>
                    <p className={s.jobTitle}>{item.title}</p>
                    <p className={s.jobSalary}>{salary} грн</p>
                  </div>
                  <p className={s.jobDate}>{date.getDate()} {month}</p>
                </div>
              </NavLink>
            </li>
          })
        }
        {
          isFetching && loadingNewOffers()
        }
      </div>
    )
  }

  function loadingNewOffers() {
    const hide = infiniteScrollFinished ? s.hide : ''
    return (
      <p className={[s.loadingNewOffers, hide].join(' ')}>Завантажую нові оголошення</p>
    )
  }

  const renderPage = () => {
    return (
      <div>
        <div className={s.headerWrapper}>
          <Header/>
        </div>
        <p className={s.jobSearch}>Пошук роботи</p>
        <SortingFilterButtons
          firstText="Сортувати"
          firstRoute='/find-job-sort'
          secondText="Фільтр"
          secondRoute='/find-job-filter'
          btnClass={s.btnClass}
        />
        {
          fetchFinished && renderJobOffers(fetchedData)
        }
        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </div>
    )
  }


  return (
    <div>
      {
        loading
        ? <div className={s.preLoader}><img alt="preloader" src={preloader}/></div>
        : renderPage()
      }
    </div>
  )
}

export default connect(mapStateToProps)(FindJob)