import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { useAuthContext } from '../context/AuthContext'
import { db, storage } from '../firebase/config'

const useUploadImage = () => {
	const [error, setError] = useState(null)
	const [isError, setIsError] = useState(null)
	const [isSuccess, setIsSuccess] = useState(null)
	const [isUploading, setIsUploading] = useState(null)
	const [progress, setProgress] = useState(null)
  const [isUrl, setisUrl] = useState(null)
	const [isFullpath, setFullpath] = useState(null)
	const [isName, setIsName] = useState(null)
	const [isTime, setIsTime] = useState(null)
	const [isSize, setIsSize] = useState(null)
	const [isType, setIsType] = useState(null)

	const { currentUser } = useAuthContext()

	const upload = async (image) => {
		// reset internal state
		setError(null)
		setIsError(null)
		setIsSuccess(null)
		setIsUploading(null)

		try {

			// // generate random 16 digits string
			// const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			// const N = 16;
			// const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n) => S[n%S.length]).join('')
			
			// generate a uuid for the file
			const uuid = uuidv4() 

			// construct reference to storage
			const storageRef = ref(storage, 'works_image/' + uuid)

			// start upload of image
			const uploadTask = uploadBytesResumable(storageRef, image)

			// attach upload observer
			uploadTask.on('state_changed', (snapshot) => {
				// update progress
				setProgress(
					Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 1000
					) / 10
				)
			})

			// wait for upload to be complete
			await uploadTask.then()

			// get download url to uploaded image
			const url = await getDownloadURL(storageRef)
      setisUrl(url)
			console.log(storageRef)
			setFullpath(storageRef.fullPath)
			setIsName(storageRef.name)
			setIsSize(image.size)
			setIsTime(serverTimestamp())
		

			// const collectionRef = collection(db, 'work')

			// // create document in db for the uploaded image
			// await addDoc(collectionRef, {
			// 	created: serverTimestamp(),
			// 	name: image.name,		
			// 	path: storageRef.fullPath,	
			// 	type: image.type,
			// 	size: image.size,
			// 	user: currentUser.uid,
			// 	url,
			// })


			setProgress(null)
			setIsSuccess(true)

		} catch (e) {
			console.log("DANGER WILL ROBINSON!", e)

			setError(e)
			setIsError(true)

		} finally {
			setIsUploading(false)

		}
	}

	return {
		error,
		isError,
		isSuccess,
		isUploading,
		progress,
		upload,
    isUrl,
		isFullpath,
		isName,
		isSize,
		isTime,
		isType,
	}
}

export default useUploadImage
