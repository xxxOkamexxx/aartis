import { createContext, useContext } from 'react'
import { auth } from '../firebase/config'


const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

	const signup = (name, email, password) => {
		console.log('account', email, password)
	}

	const contextValues = {
		signup,
		// here be everything the children needs be able to use
	}
	

	return (
		<AuthContext.Provider value={contextValues}>
			{children}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
	
}

