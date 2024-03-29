import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"


const useStreamDocument = (col, id) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const ref = doc(db, col, id)

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            setData({
                id:snapshot.id,
                ...snapshot.data(),
            })
            setLoading(false)
        })

        return unsubscribe
    }, [col, id])

  return {
        data,
        loading,
        
  }
}

export default useStreamDocument