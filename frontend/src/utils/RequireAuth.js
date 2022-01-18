import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const RequireAuth = () => {
  const accessToken = useSelector(store => store.user.accessToken)
  let location = useLocation()

  if (!accessToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} />
  }

  return <Outlet />
}
