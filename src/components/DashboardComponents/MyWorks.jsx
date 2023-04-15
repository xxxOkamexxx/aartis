import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
import { useEffect } from 'react';


const MyWorks = ({image}) => {
  const [likes, setLikes] = useState(100);
  const [comments, setComments] = useState(0);
  const { currentUser } = useAuthContext()
	const deleteImageMutation = useDeleteImage()

  const navigate = useNavigate()

  
  const created = moment( image.created.toMillis() ).format('YYYY-MM-DD HH:mm:ss')

  const updated = moment( image.updated?.toMillis() ).format('YYYY-MM-DD HH:mm:ss')
  


  //console.log(image.comment.length)
  
  useEffect(() => {
    setComments(image.comment?.length)
  },[])

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

            
						<span>Created: {created}</span>						
						
						{ image.updated &&
							<span>Updated: {updated}</span>
						}
						{ !image.updated &&
							<span>Updated: - </span>
						}

         
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
            <span className="action-counter">{image.likes}</span>
          </div>  
        </div>

      </div> 
      {/* info area end */}

      {/* edit area */}
      <div div className="edit-box">
        
        <IconButton
          className='ms-3'
          style={{ width:'30px', height:'30px', backgroundColor:'#343530' }}
          onClick={()=> navigate(`/work-edit/${image.id}`)}
          // as={Link}
          // to={`/edit-work/${image.id}`}
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