import React from 'react'
import { BoxLoading } from 'react-loadingg'


const Loader = ({ children, loading, error, loaded }) => {
  return (
    <>
      {
        (!loaded && loading)
          ? <BoxLoading/>
          : children
      }
      {
        error
          ? console.log(error)
          : null
      }
    </>

  )
}

export default Loader
