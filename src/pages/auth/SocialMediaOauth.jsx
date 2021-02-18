import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTokenAfterOauth } from '../../actions/user'


const SocialMediaOauth = ({ type }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const url = new URL(window.location.href)
    const query = url.search

    dispatch(getTokenAfterOauth({ type, query }))
  }, [dispatch, type])
}

export default SocialMediaOauth
