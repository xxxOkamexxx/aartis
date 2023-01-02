import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const RequireAuth = ({
	children,
	redirectTo = "/login",
}) => {
	const { currentUser } = useAuthContext()

	return (
		currentUser
			? children
			: <Navigate to={redirectTo} />
	)
}

export default RequireAuth
