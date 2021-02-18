import { useEffect, useState } from 'react'

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    callback()
  }, [isFetching])

  function isScrollEqualsContentHeight() {
    const windowHeight = window.innerHeight
    const scrolledFromTopOfPage = document.documentElement.scrollTop
    const contentHeight = document.documentElement.offsetHeight

    return (Math.ceil(windowHeight + scrolledFromTopOfPage) === contentHeight)
  }

  function handleScroll() {
    isScrollEqualsContentHeight() && setIsFetching(true)
  }

  return { setIsFetching }
}

export default useInfiniteScroll
