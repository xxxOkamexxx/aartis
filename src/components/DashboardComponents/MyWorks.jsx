import React from 'react'
import { Image, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import { useAuthContext } from '../../context/AuthContext'

import useDeleteImage from '../../hooks/useDeleteImage'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import moment from 'moment';


const MyWorks = ({image}) => {
  const { currentUser } = useAuthContext()
	const deleteImageMutation = useDeleteImage()

  const created = moment( image.created.toMillis() ).format('YYYY-MM-DD')

  return (
    <>
      <div className="d-flex flex-row">
        <div className="myworks-thumbnail-box">
          <Image src={image.url} alt={image.title} className="myworks-thumbnail-image"/>
        </div>
       

        <div className="d-flex flex-column">
          <p>{image.title}</p>
          <p>{created}</p>
        </div>
        
        <div className="d-flex flex-column">
          <p>Like: 100</p>
          <p>Comment: 2</p>
        </div>
       
        <div className="d-flex flex-column">
          <p>Like: 100</p>
          <p>Comment: 2</p>
        </div>
       
        <div div className="d-flex flex-row">
          <Button><EditIcon /></Button>
          <Button><DeleteIcon /></Button>
        </div>

      </div>
    </>
  )
}
 
export default MyWorks