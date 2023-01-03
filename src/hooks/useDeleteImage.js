import { useState } from 'react'
//import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase/config'


const useDeleteImage = () => {
	const [error, setError] = useState(null)
	const [isError, setIsError] = useState(false)
	const [isMutating, setIsMutating] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	

	const mutate = async (image) => {
		setError(null)
		setIsError(false)
		setIsMutating(true)
		setIsSuccess(false)

		// run mutation that will delete image from storage and db
		try {
			// verify that the current user actually owns this image before allowing it to be deleted
			// if (image.user !== currentUser.uid) {
			// 	throw new Error("This meme are not belong to you")
			// }

			// get ref to image in storage
			const storageRef = ref(storage, image.path)
			
			// delete image from storage
			await deleteObject(storageRef)
			

			// get ref to image in db
			const dbRef = doc(db, 'work', image.id)

			// delete image from db
			await deleteDoc(dbRef)

		} catch (err) {
			setIsError(true)
			setError(err)
		} finally {
			setIsMutating(false)
			setIsSuccess(true)
		}

	}

	return {
		error,
		isError,
		isMutating,
		isSuccess,
		mutate,
	}
}

export default useDeleteImage
