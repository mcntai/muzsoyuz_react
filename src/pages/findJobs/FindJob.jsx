import React, { useEffect, useState } from 'react'
import useInfiniteScroll from '../../components/common/useInfniteScroll'
import { useSelector, useDispatch } from 'react-redux'
import { incrementOffSet, selectFetchedData, selectOfferBody, selectOffers } from '../../slice/offers'
import { fetchOffers } from '../../actions/offers'
import { omitBy, predicates } from '../../utils/object'
import { NavLink } from 'react-router-dom'
import { OFFSET_PERIOD } from '../../constants/offers'
import Header from '../../components/mainHeader/Header'
import SortingFilterButtons from './SortingFilterButtons'
import Footer from '../../components/mainFooter/Footer'
import { STAGES } from '../../slice/utils/constants'
import s from './FindJob.module.css'
import Loader from '../../components/common/Loader'


const FindJob = () => {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOffers)
  const body = useSelector(selectOfferBody)
  const [noOfferToShow, setNoOffersToShow] = useState(s.hide)
  const { isFetchedAll } = useSelector(selectOffers)
  const { loading, error, status } = useSelector(selectOffers)
  const fetchedOffers = useSelector(selectFetchedData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!fetchedOffers.length) {
      getAllJobOffers()
    }
  }, [])

  useEffect(() => {
    const display = !fetchedOffers.length && status === STAGES.SUCCESS ? s.show : s.hide

    setNoOffersToShow(display)
  }, [fetchedOffers])

  const composition = (...fns) => value => fns.some(fn => fn(value))

  function getAllJobOffers(newOffSet) {
    const transformedBody = omitBy(body,
      composition(predicates.isEmptyString, predicates.isEmptyRange, predicates.isEmptyArray, predicates.isNilRange))

    transformedBody.offset = newOffSet
    dispatch(fetchOffers({ body: transformedBody }))
  }

  function fetchMoreOffers() {
    if (!isFetchedAll) {
      const newOffSet = body.offset + OFFSET_PERIOD
      getAllJobOffers(newOffSet)

      setIsFetching(false)
      dispatch(incrementOffSet(newOffSet))
    }
  }

  const renderJobOffers = data => {
    return (
      <div className={s.jobsWrapper}>
        {
          data && Object.keys(data).map(item => {
            const date = new Date(data[item].date)

            let month = date.toLocaleString('uk-UA', { month: 'short' })

            const salary = Number(data[item].salary)

            return <li key={data[item].id} className={s.jobOfferItem}>
              <NavLink className={s.navLinkWrapper} to={{
                pathname: '/open-job',
                state   : { data: data[item] }
              }}>
                <div className={s.jobOfferContentWrapper}>
                  <img src={data[item].instrument.imageURL} alt='Instrument' className={s.instrumentIcon}/>
                  <div className={s.jobTextWrapper}>
                    <p className={s.jobTitle}>{data[item].title}</p>
                    <p className={s.jobSalary}>{salary} грн</p>
                  </div>
                  <p className={s.jobDate}>{date.getDate()} {month}</p>
                </div>
              </NavLink>
            </li>
          })
        }
      </div>
    )
  }

  return (
    <div>
      <Loader
        loading={loading}
        error={error}
      >
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
        <p className={noOfferToShow}>Оголошень немає. Змініть фільтри або оновіть сторінку</p>
        {
          renderJobOffers(fetchedOffers)
        }
        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </Loader>
    </div>
  )
}

export default FindJob