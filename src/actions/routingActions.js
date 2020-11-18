export const authPageRoute = (type) => ({
  type        : 'AUTH_PAGE',
  currentRoute: type,
})

export const pageRoute = (type, currentRoute) => ({
  type,
  currentRoute,
})