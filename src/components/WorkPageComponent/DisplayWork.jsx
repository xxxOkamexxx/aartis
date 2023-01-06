import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// hooks
import useWork from '../../hooks/useWork'

// bootstrap Icon Style
import { Button, Container, Image } from 'react-bootstrap'
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// context
import { useAuthContext } from '../../context/AuthContext'
import moment from 'moment';


const DisplayWork = () => {
  const [likes, setLikes] = useState(100);
  const [isClicked, setIsClicked] = useState(false);
  const { currentUser } = useAuthContext()

  const { id } = useParams()
  const { data, loading } = useWork(id)

  //const created = moment( data.created.toMillis() ).format('YYYY-MM-DD')

  const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClicked(!isClicked);
  };

  
  console.log(data.creator_id)

  return (
    <Container>
    
      {/* image */}
      <div className='d-flex flex-column mt-5'>

        <Image src={data.url}/>

        {/* action */}
        <div className="likeBtn ms-2">
          <IconButton 
            className={`like-button ${isClicked && 'liked'}` } 
            onClick={ handleClick }
            style={{ width:'30px', height:'30px'}}
          >	
            <span>{ isClicked
              ? < FavoriteIcon className='like-icon' /> 
              : < FavoriteBorderIcon className='like-icon' />}</span>					
          </IconButton>					
          <span className="action-counter"> {likes}</span>	
        </div>
        

      </div>
      {/* image end */}



      <div className='mt-5'>  
      
      {/* creator info */}
        <Link 
          to={`/profile/${data.user}`} 
          className='link-text'
          style={{color:'#343530'}}
        >
          <div className='d-flex align-items-end'>
            <Image
              src={data ?  data.creator_avatar : ''}
              height={70}
              width={70}
              roundedCircle
              style={{backgroundColor:'#fcfcfc'}}
            /> 
            
            <h3 
              className='ms-3'             
            >
              {data.creator_name}
            </h3>
          </div>       
        </Link>
        {/* creatorinfo end */}

        {/*Project info*/}
        <div className='mt-5'>
          <div>
            <h2>{data.title}</h2>
            <p>{data.caption}</p>

          </div>          
        </div>      
      
      </div> 
      
    </Container>
  )
}

export default DisplayWork
