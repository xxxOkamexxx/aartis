import { useState } from 'react'
import { 
	collection, 
	addDoc, 
	serverTimestamp, 
	doc, 
	setDoc,
	deleteDoc, 
} from 'firebase/firestore'
import { 
	getStorage, 
	ref, 
	getDownloadURL, 
	uploadBytesResumable, 
	deleteObject 
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { useAuthContext } from '../context/AuthContext'
import { db, storage } from '../firebase/config'


const useUploadImage = () => {
	const [error, setError] = useState(null)
	const [isError, setIsError] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const [progress, setProgress] = useState(null)
  const [isUrl, setisUrl] = useState(null)
	const [isUuid, setIsUuid] = useState(null)
	

	const { currentUser } = useAuthContext()

	/**
	 * upload image
	 */
	const upload = async (image) => {
		// reset internal state
		setError(null)
		setIsError(false)
		setIsSuccess(false)
		setIsUploading(true)
		setProgress(null)

		try {			
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
			setIsUuid(uuid)
		
			console.log(uuid)
			//const collectionRef = doc(db, 'work',`${uuid}`)

			// create document in db for the uploaded image
			await setDoc(doc(db, 'work', `${uuid}`),{
				created: serverTimestamp(),
				name: image.name,		
				path: storageRef.fullPath,	
				type: image.type,
				size: image.size,
				user: currentUser.uid,
				uuid: uuid,
				url,
			})


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


	/**
	 * delete image
	 */
	const remove = async(id) => {
		const storage = getStorage()
		// Create a reference to the file to delete
		const desertRef = ref(storage, `works_image/${id}`);

		// Delete the file in storage
		deleteObject(desertRef).then(() => {
			console.log('File deleted successfully')
			// File deleted successfully
		}).catch((error) => {
			console.log('Uh-oh, an error occurred!')
			// Uh-oh, an error occurred!
		});


		// Delete the document in db
		await deleteDoc(doc(db, 'work', `${id}`))
		
	}


	return {
		error,
		isError,
		isSuccess,
		isUploading,
		progress,
		upload,
		remove,
    isUrl,
		isUuid
	}
}

export default useUploadImage
