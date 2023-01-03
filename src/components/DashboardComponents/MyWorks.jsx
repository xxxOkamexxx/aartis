import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

import { useAuthContext } from '../context/AuthContext'

import useDeleteImage from '../hooks/useDeleteImage'


const myWorks = ({image}) => {
  const { currentUser } = useAuthContext()
	const deleteImageMutation = useDeleteImage()

  return (
    <>
      <div>hello my work</div>
    </>
  )
}

export default myWorks