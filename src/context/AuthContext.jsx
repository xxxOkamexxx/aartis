import { createContext, useContext, useState } from 'react'
import { 
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword,
	signOut
} from 'firebase/auth'
import { auth, db, storage } from '../firebase/config'

import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { async } from '@firebase/util'
import { set } from 'react-hook-form'


const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userDisplayName, setUserDisplayName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [userAvatarUrl, setUserAvatarUrl] = useState(null)
	const [loading, setLoading] = useState(true)

	const signup = async (name, email, password, image) => {
		console.log('input data:', name, email, password, image)
		// create user
		await createUserWithEmailAndPassword(auth, email, password)

		// set username and avatar
		await setUserDisplay(name, image)

		// reload user
		await reloadUser()

		// create user document
		const docRef = doc(db, 'users', auth.currentUser.uid)
		await setDoc(docRef, {
			userName,
			email,
			avatarURL: auth.currentUser.avatarURL,
			admin: false,
		})
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const update = () => {
		// something to do...
	}
	

	const reloadUser = async() => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserName(auth.currentUser.username)
	}


	const setUserDisplay = async (name, image) => {
		let avatarURL = auth.currentUser.avatarURL

		if (image) {
			// create a reference to upload the file to
			const fileRef = ref(storage, `user_image'/${auth.currentUser.email}/${image.name}`)
			
			// upload photo to fileRef
			const uploadResult = await uploadBytes(fileRef, image)

			// get download url to uploaded file
			avatarURL = await getDownloadURL(uploadResult.ref)

			console.log("Photo uploaded successfully, download url is:", avatarURL)
		}
		if(name) {
			console.log('name',name)
		}


		return updateProfile(auth.currentUser, {
			displayName: name,
			avatarURL,
		})
	}

	const contextValues = {
		currentUser,
		signup,
		login,
		logout,
		update
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

