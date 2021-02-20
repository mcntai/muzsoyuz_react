import { useEffect, useState } from 'react'
import { inRange } from '../../utils/number'


function isScrollReachedBottom() {
  const windowHeight = window.innerHeight
  const scrolledFromTopOfPage = document.documentElement.scrollTop
  const contentHeight = document.documentElement.offsetHeight

  return inRange(contentHeight, windowHeight + scrolledFromTopOfPage, 10)
}

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isFetching) {
      callback()
    }
  }, [isFetching])

  function handleScroll() {
    isScrollReachedBottom() && setIsFetching(true)
  }

  return { setIsFetching }
}

export default useInfiniteScroll
