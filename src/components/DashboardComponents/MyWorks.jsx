import { useState } from 'react';

// bootstrap
import { Image, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import moment from 'moment';

import { useAuthContext } from '../../context/AuthContext'

// hooks
import useDeleteImage from '../../hooks/useDeleteImage'

// icon
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { margin } from '@mui/system';


const MyWorks = ({image}) => {
  const [likes, setLikes] = useState(100);
  const [comments, setComments] = useState(2);
  const { currentUser } = useAuthContext()
	const deleteImageMutation = useDeleteImage()

  const created = moment( image.created.toMillis() ).format('YYYY-MM-DD')

  

  return (
    <div className={`list-container ${deleteImageMutation.isMutating ? 'mutating' : ''}`}>

      {/* image area */}
      <div className="myworks-thumbnail-box">
      <Image 
        src={image.url} 
        alt={image.title} className="myworks-thumbnail-image"
      />
      </div>
      {/* image area end */}

      {/* info area */}
      <div className="info-box">
       
        {/* info */}
        <div className='info'>
          <h5>{image.title}</h5>
          <p>Created: {created}</p>
          <p>Category: {image.category}</p>        
        </div>
      
        {/* users actions area */}
        <div className="action-box">

          <div>
            <span>
              <ChatBubbleOutlineIcon className='comment-icon' />
            </span>
            <span className="action-counter">{comments}</span>
          </div>

          <div >
            <span>
              <FavoriteIcon className='like-icon' />
            </span>
            <span className="action-counter">{likes}</span>
          </div>  
        </div>

      </div> 
      {/* info area end */}

      {/* edit area */}
      <div div className="edit-box">
        
        <IconButton
          className='ms-3'
          style={{ width:'30px', height:'30px', backgroundColor:'#343530' }}
        >
          <EditIcon style={{color:'#fcfcfc'}} />
        </IconButton>

        <IconButton
          className='ms-3'
          style={{ width:'30px', height:'30px', backgroundColor:'#343530'}}
          disabled={deleteImageMutation.isMutating}	
         	// maybe create confirm function later 
          onClick={() => deleteImageMutation.mutate(image)}
        >
          <DeleteIcon 
            style={{color:'#fcfcfc'}} 
          />
        </IconButton>
      </div>
 
      {/* editarea end */}
      
    </div>
   
  )
}
 
export default MyWorks