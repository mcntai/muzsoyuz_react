import swal from '@sweetalert/with-react'

const alert = icon => (text, title) => swal({ text, title, icon })

export const success = alert('success')
export const error = alert('error')
