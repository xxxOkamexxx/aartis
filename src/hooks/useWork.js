import useStreamDocument from "./useStreamDocument"

const useWork = (id) => {
    return useStreamDocument('work', id)
}

export default useWork