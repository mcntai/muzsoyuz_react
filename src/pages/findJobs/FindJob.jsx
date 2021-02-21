import React, { useEffect, useState } from 'react'
import useInfiniteScroll from '../../components/common/useInfniteScroll'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchedOffersCleanUp,
  incrementOffSet,
  selectFetchedData,
  selectOfferBody,
  selectOffers
} from '../../slice/offers'
import { fetchOffers } from '../../actions/offers'
import { omitBy, predicates } from '../../utils/object'
import { NavLink } from 'react-router-dom'
import { OFFSET_PERIOD } from '../../constants/offers'
import Header from '../../components/mainHeader/Header'
import SortingFilterButtons from './SortingFilterButtons'
import Footer from '../../components/mainFooter/Footer'
import s from './FindJob.module.css'
import Loader from '../../components/common/Loader'

const or = (...fns) => value => fns.some(fn => fn(value))

const FindJob = () => {
  const { setIsFetching } = useInfiniteScroll(fetchMoreOffers)

  const { loaded, loading, error, isFetchedAll } = useSelector(selectOffers)
  const body = useSelector(selectOfferBody)
  const fetchedOffers = useSelector(selectFetchedData)

  const [noOfferToShow, setNoOffersToShow] = useState(s.hide)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!loaded) {
      fetchJobOffers()
    }
  }, [])

  useEffect(() => {
    const display = !fetchedOffers.length && loaded
      ? s.show
      : s.hide

    setNoOffersToShow(display)
  }, [fetchedOffers])

  function fetchJobOffers(newOffSet) {
    const transformedBody = omitBy(body, or(
      predicates.isEmptyString,
      predicates.isEmptyRange,
      predicates.isEmptyArray,
      predicates.isNilRange,
      ),
    )

    transformedBody.offset = newOffSet
    dispatch(fetchOffers({ body: transformedBody }))
  }

  function fetchMoreOffers() {
    if (!isFetchedAll) {
      const newOffSet = body.offset + OFFSET_PERIOD

      fetchJobOffers(newOffSet)

      setIsFetching(false)

      dispatch(incrementOffSet(newOffSet))
    }
  }

  const renderJobOffers = data => (
    <div className={s.jobsWrapper}>
      {
        Object.keys(data || {}).map(item => {
          const date = new Date(data[item].date)

          let month = date.toLocaleString('uk-UA', { month: 'short' })

          const salary = Number(data[item].salary)

          return (
            <li key={data[item].id} className={s.jobOfferItem}>
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
          )
        })
      }
    </div>
  )

  return (
    <div>
      <Loader
        loading={loading}
        error={error}
        styles={s.loader}
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
          callback={() => dispatch(fetchedOffersCleanUp())}
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