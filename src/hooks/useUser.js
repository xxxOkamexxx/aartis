import useStreamDocument from "./useStreamDocument"

const useUser = (id) => {
    return useStreamDocument('user', id)
}

export default useUser