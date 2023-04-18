import {useEffect} from 'react'
import useStreamDocument from "./useStreamDocument"

const useUser = (id) => {
    //console.log('go useUser', id)

    return useStreamDocument('user', id)
}

export default useUser