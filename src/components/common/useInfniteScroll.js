import { useEffect, useState } from 'react'

function isScrollReachedBottom() {
  const windowHeight = window.innerHeight
  const scrolledFromTopOfPage = document.documentElement.scrollTop
  const contentHeight = document.documentElement.offsetHeight

  return Math.round(windowHeight + scrolledFromTopOfPage) === contentHeight
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
