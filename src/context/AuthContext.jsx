import { createContext, useContext, useEffect, useState } from 'react'
import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateEmail,
	updatePassword,
	updateProfile,
} from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../firebase/config'
// loader
import BeatLoader from 'react-spinners/BeatLoader'


const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [userName, setUserName] = useState(null)
	const [userEmail, setUserEmail] = useState(null)
	const [loading, setLoading] = useState(true)

	
	const signup = async (email, password, name) => {
		// create the user
		await createUserWithEmailAndPassword(auth, email, password)

		// set name
		await setDisplayName(name)

		// reload user
		await reloadUser()

		// create user document
		const docRef = doc(db, 'users', auth.currentUser.uid)
		await setDoc(docRef, {
			userName,
			email,
			iconURL: auth.currentUser.photoURL,
			admin: false,
		})
	}

	const update = async ({email, name, photo}) => {

		await setDisplayNameAndPhoto(name, photo)

		await setEmail(email)
		
		await reloadUser()
		console.log('auth.currentUser', auth.currentUser)
	
		await updateDoc(doc(db, 'users', auth.currentUser.uid), {
			email,
			name:auth.currentUser.displayName,
			photoURL:auth.currentUser.photoURL,			
		})
	}
		

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

	const logout = () => {
		return signOut(auth)
	}

	const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)
		setUserPhotoUrl(auth.currentUser.photoURL)
		return true
	}

	const resetPassword = (email) => {
		return sendPasswordResetEmail(auth, email)
	}

	const setEmail = (email) => {
		return updateEmail(currentUser, email)
	}

	const setPassword = (newPassword) => {
		return updatePassword(currentUser, newPassword)
	}

	const setDisplayNameAndPhoto = async (name, photo) => {
		let photoURL = auth.currentUser.photoURL

		if (photo) {
			// create a reference to upload the file to
			const fileRef = ref(storage, `user_photos/${auth.currentUser.email}/${photo.name}`)
			
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
		setDisplayNameAndPhoto,
		setEmail,
		setPassword,
		userName,
		userEmail,
		userPhotoUrl,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading ? (
				<div id="initial-loader">
					<BeatLoader color='#AD9510'/>
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	)
}

export {
	AuthContextProvider as default,
	useAuthContext,
}
