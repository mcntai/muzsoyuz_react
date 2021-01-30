export async function setDataToLocalStorage(response) {
  localStorage.setItem('token', response.token)
  localStorage.setItem('userId', response.profile.id)
}