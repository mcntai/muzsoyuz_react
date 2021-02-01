import React, { useState, useEffect } from 'react'
import useInfiniteScroll from '../../components/common/useInfniteScroll'
import { useSelector, useDispatch } from 'react-redux'
import { incrementOffSet, selectFetchedOffers, selectOfferBody } from '../../slice/offers'
import { fetchOffers } from '../../actions/offers'
import { omitBy, predicates } from '../../utils/object'
import { pageRoute } from '../../actions/routingActions'
import { NavLink } from 'react-router-dom'
import Header from '../../components/mainHeader/Header'
import SortingFilterButtons from './SortingFilterButtons'
import Footer from '../../components/mainFooter/Footer'
// import preloader from '../../assets/img/preloader.gif'
import s from './FindJob.module.css'


const FindJob = () => {
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreOffers)
  const body = useSelector(selectOfferBody)
  const { data: fetchedOffers, isFetchedAll } = useSelector(selectFetchedOffers)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!fetchedOffers.length) {
      getAllJobOffers()
    }

    dispatch(pageRoute('FIND_JOB', 'find-job'))
  }, [])

  const composition = (...fns) => value => fns.some(fn => fn(value))

  function getAllJobOffers(newOffSet) {
    const transformedBody = omitBy(body,
      composition(predicates.isEmptyString, predicates.isEmptyRange, predicates.isEmptyArray))

    transformedBody.offset = newOffSet
    dispatch(fetchOffers({ body: transformedBody }))
  }

  function fetchMoreOffers() {
    if (!isFetchedAll) {
      const newOffSet = body.offset + 30
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
        {/*{*/}
        {/*  loadingNewOffers()*/}
        {/*}*/}
      </div>
    )
  }

  // function loadingNewOffers() {
  //   const hide = infiniteScrollFinished ? s.hide : ''
  //   return (
  //     <p className={[s.loadingNewOffers, hide].join(' ')}>Завантажую нові оголошення</p>
  //   )
  // }

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
          renderJobOffers(fetchedOffers)
        }
        <div className={s.footerWrapper}>
          <Footer/>
        </div>
      </div>
    )
  }


  return (
    <div>
      {/*{*/}
      {/*  loading*/}
      {/*  ? <div className={s.preLoader}><img alt="preloader" src={preloader}/></div>*/}
      {/*  : renderPage()*/}
      {/*}*/}
      {renderPage()}
    </div>
  )
}

export default FindJob