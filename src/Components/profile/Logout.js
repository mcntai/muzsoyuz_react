import React from 'react'
import { connect } from 'react-redux'


const mapStateToProps = state => {
  return {
    authorized: state.authReducer.authorized
  }
}

// const handleLogoutRedux = () => ({
//   type: 'LOGOUT',
// })

const mapDispatchToProps = dispatch => {
  return {
    handleLogoutRedux: () => {
      dispatch({ type: 'LOGOUT' })
    }
  }
}

export function HandleLogOut(props) {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')

    props.handleLogoutRedux()
  }
  catch (error) {
    alert(error.message)
  }
}


// class Logout extends React.Component {
//
//   handleLogOut(dispatch) {
//     try {
//       localStorage.removeItem('token')
//       localStorage.removeItem('userId')
//
//       dispatch(handleLogoutRedux())
//     }
//     catch (error) {
//       alert(error.message)
//     }
//   }
//
//   render() {
//     return (
//       <div>
//
//       </div>
//     )
//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(HandleLogOut)