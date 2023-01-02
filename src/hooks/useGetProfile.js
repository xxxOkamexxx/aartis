import useStreamDocument from './useStreamDocument'


const useGetProfile = (id) => {
   return useStreamDocument('user', id)
}

export default useGetProfile
