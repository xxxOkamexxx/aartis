import { createContext, useContext, useState, useEffect } from 'react'
import { 
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	updateProfile,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
} from 'firebase/auth'
import { auth, db, storage } from '../firebase/config'

import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

import BeatLoader from 'react-spinners/BeatLoader'

const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userName, setUserName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [userPhotoUrl, setUserPhotoUrl] = useState(null)
	const [loading, setLoading] = useState(true)

	const setEmail = (email) => {
		return updateEmail(currentUser, email)
	}

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email)
	}

	const setPassword = (newPassword) => {
		return updatePassword(currentUser, newPassword)
	}

	const signup = async (name, email, password, photo) => {
		console.log('input data:', name, email, password, photo)
		// create user
		await createUserWithEmailAndPassword(auth, email, password)

		// set username and avatar
		await setUserDisplay(name, photo)

		// reload user
		await reloadUser()

		// create user document
		const docRef = doc(db, 'users', auth.currentUser.uid)
		await setDoc(docRef, {
			name,
			email,
			photoURL: auth.currentUser.photoURL,
			admin: false,
		})
	}

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const update = async({name, email, photo}) => {
		await setUserDisplay(name, photo)

		await setEmail(email)
		
		await reloadUser()
		console.log('auth.currentUser', auth.currentUser)
	
		await updateDoc(doc(db, 'users', auth.currentUser.uid), {
			email,
			name:auth.currentUser.displayName,
			photoURL:auth.currentUser.photoURL,			
		})
	}
	

	const reloadUser = async() => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		setUserPhotoUrl(auth.currentUser.photoURL)
		return true
	}


	const setUserDisplay = async (name, photo) => {
		let photoURL = auth.currentUser.photoURL

		if (photo) {
			// create a reference to upload the file to
			const fileRef = ref(storage, `user_photos'/${auth.currentUser.email}/${photo.name}`)
			
			// upload photo to fileRef
			const uploadResult = await uploadBytes(fileRef, photo)

			// get download url to uploaded file
			photoURL = await getDownloadURL(uploadResult.ref)

			console.log("Photo uploaded successfully, download url is:", photoURL)
		}
		if(name) {
			console.log('name',name)
		}


		return updateProfile(auth.currentUser, {
			displayName: name,
			photoURL,
		})
	}

	useEffect(() => {
		// listen for auth-state changes
		const unsubscribe = onAuthStateChanged(auth, user => {
			//console.log('auth-user', user)
			setCurrentUser(user)
			setUserName(user?.displayName)
			setUserEmail(user?.email)
			setUserPhotoUrl(user?.photoURL)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		currentUser,
		login,
		update,
		logout,
		signup,
		reloadUser,
		resetPassword,
		setUserDisplay,
		setEmail,
		setPassword,
		userName,
		userEmail,
		userPhotoUrl,
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

