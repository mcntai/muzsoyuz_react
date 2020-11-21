import swal from '@sweetalert/with-react'


const alert = icon => (text, title) => swal({ text, title, icon })

export const unauthorized = alert('error')
export const success = alert('success')
export const emailInvalid = alert('error')
export const passwordInvalid = alert('error')


