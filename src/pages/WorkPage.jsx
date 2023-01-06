import { useParams } from 'react-router-dom'
import DisplayWork from "../components/WorkPageComponent/DisplayWork"
import CommentsForm from "../components/WorkPageComponent/CommentsForm"
import AllCommentsList from '../components/WorkPageComponent/AllCommentsList'
import useWork from '../hooks/useWork'



const WorkPage = () => {
  const { id } = useParams()
  const { data, loading } = useWork(id)
  return (
    <>
      <DisplayWork data={data} />
      <CommentsForm data={data} />
      <AllCommentsList data={data} />
    </>
  )
}

export default WorkPage
