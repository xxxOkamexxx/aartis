import { useState, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import moment from 'moment';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'


import useUsersWorks from "../../hooks/useUsersWorks"

import { Card, Container, Image, Row, Col } from "react-bootstrap"
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';


const CreatorsWorks = ({id}) => {
  const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(id)
 
  let created;
  let updated;
  const { data } = useUsersWorks(currentUserId)
  
  useEffect(() => {
    setCurrentUserId(id)
  },[id])

  
  if(data) {
  console.log('has data:',data, 'id:', id) 
  created = moment( data.created?.toMillis() ).format('YYYY-MM-DD HH:mm:ss')   
  updated = moment( data.updated?.toMillis() ).format('YYYY-MM-DD HH:mm:ss')
  } else if(!data){
  console.log('no data')

  }

  


  return (
    <>
      { data && data.length == 0 && 
      <h4 className="mb-5">There are no works yet</h4>
      }

      <Row xs={1} sm={2} md={3} lg={4}>
        { data && data.map(work => (
          <Col key={work.id}className="d-flex mb-4">

            <Card 
              className="thumbnail-box" 
              style={{textDecoration:'none', color:'#343530'}}
              
            >
              <div 				
                className='thumbnail-image-box'
              >
                <Link to={`/work/${work.id}`}>
                  <Image 
                    className='thumbnail-image'
                    src={work.url}
                    alt={work.title}
                    />
                </Link>
              </div>
              
              <div className='thumbnail-footer'>
                <h5>{work.title}</h5>
              </div>
    

                <div className='d-flex justify-content-end align-items-center flex-row'>
                  
                    <div className="commentBtn">
                      <span>< ChatBubbleOutlineIcon className='comment-icon' /></span>
                      <span className="action-counter">{work.comment.length}</span>	

                    </div>

                    <div className="likeBtn ms-2">
                      <span>{ isClicked
                            ? < FavoriteIcon className='like-icon' /> 
                            : < FavoriteBorderIcon className='like-icon' />}</span>	
                      <span className="action-counter"> {work.likes}</span>
                    </div>
                    
              </div>

              { !work.updated &&
                <span><small>Created: {created}</small></span>
              }
              
              { work.updated &&
                <span><small>Updated: {updated}</small></span>
              }
          
            </Card>

          </Col>
        )) }
      </Row>
      
    </>
  )
}

export default CreatorsWorks
