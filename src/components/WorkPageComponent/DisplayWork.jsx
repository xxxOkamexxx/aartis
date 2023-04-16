import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

// bootstrap Icon Style
import { Button, Container, Image } from 'react-bootstrap'
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BeatLoader from 'react-spinners/BeatLoader'

// context
import { useAuthContext } from '../../context/AuthContext'

import useUser from '../../hooks/useUser'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config'



const DisplayWork = ({data}) => {
  const { currentUser } = useAuthContext()
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isUser, setIsUser] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isFollowed, setIsFollowed] = useState(false)
  const [followButton, setFollowButton] = useState('Follow')
  const [className, setClassName] = useState('btn-outline-secondary')
  const [isLiked, setIsLiked] = useState(data?.likes)

  
  console.log(data.user)

  // Load users document
  useEffect(()=>{
    setIsLoading(true)
    setIsLiked(data?.likes)
    const getUser = async(id) => {
      
      const docRef = doc(db, "user", `${id}`);
      const docSnap = await getDoc(docRef);
      setIsUser(docSnap.data())
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log(isUser, docSnap.data())

        setIsLoading(false)

      } else {
        // doc.data() will be undefined in this case
        setIsLoading(true)
        console.log("No such document!");
      } 
    }
    getUser(data.user)
    //setLikes(0)
  },[data.uuid])
  

   
  // check like button
   const handleClick = async(e) => {    
    e.preventDefault()
    console.log('isClicked', isClicked)
    
    setIsClicked(!isClicked)
    
    console.log(likes, isLiked)
    
    await updateDoc(doc(db, 'work', data.uuid),{
      likes: isLiked + likes
    })   
    setLikes(0)  
  };  

  // set likes counter
  useEffect(() => { 
    
    if(isClicked === true){
      setLikes(-1)
    } else {
      setLikes(1)
    } 
    
  },[isClicked])
  

  if(!data.created){
    return console.log('no data')
  }
  const created = moment( data.created.toMillis() ).format('YYYY-MM-DD HH:mm:ss')
  
  //console.log(data.created, created)


  //console.log(data.creator_id)

  // check follow button
  const handleFollow = () => {
    if(!isFollowed) {
      setIsFollowed(true)
      setFollowButton('Following')
      setClassName ('btn-secondary')
    } else{
      setIsFollowed(false)
      setFollowButton('Follow')
      setClassName('btn-outline-secondary')
    }
  }

  
  return (
    <Container className='mb-5'>
      { isLoading && 
        <div id="initial-loader">
          <BeatLoader color='#AD9510'/>
        </div>
      }
      
      { !isLoading && 
          <div className='image-box'>
            {/* image */}
            <div className='d-flex flex-column mt-5'>

              <Image src={data.url}/>

              {/* action */}
              <div className="likeBtn ms-2 mt-1 d-flex justify-content-end align-items-center">

                <span className='me-2'>
                  <span >
                    < ChatBubbleOutlineIcon />
                  </span>	
                  <span className="action-counter"> {data.comment.length}</span>
                </span> 

                <IconButton 
                  className={`like-button  ${isClicked && 'liked'}` } 
                  onClick={ handleClick }
                  style={{ width:'30px', height:'30px'}}
                >	
                  <span>{ isClicked
                    ? < FavoriteIcon className='like-icon' /> 
                    : < FavoriteBorderIcon className='like-icon' />}</span>					
                </IconButton>					
                <span className="action-counter"> {data.likes}</span>	
                
              </div>
              

            </div>
            {/* image end */}

            <div className='mt-5'>  
            
            {/* creator info */}
              <div className='d-flex flex-row justify-content-between work-info-box'>
                <div>
                  <Link 
                    to={`/profile/${data.user}`} 
                    className='link-text'
                    style={{color:'#343530'}}
                  >
                    <div className='d-flex align-items-end'>
                      <Image
                        src={isUser ?  isUser.photoURL : ''}
                        height={70}
                        width={70}
                        roundedCircle
                        style={{backgroundColor:'#fcfcfc'}}
                      /> 
                      
                      <h3 
                        className='ms-3'             
                      >
                        {isUser.name}
                      </h3>
                    </div>       
                  </Link>
                </div>
                { data.user != currentUser.uid &&  
                  <div>             
                    <Button 
                      onClick={handleFollow}
                      className={`btn-font ms-3 ${className}`}>
                        {followButton}
                    </Button>  
                  </div>
                }
              </div>
            {/* creatorinfo end */}

            {/*Project info*/}
              <div className='mt-5 work-info-box'>
                <div>
                  <h2>{data.title}</h2>
                  <p>{data.caption}</p>
                  <p className='display-date'>Created: {created}</p>
                </div>          
              </div> 

            
            </div> 
          </div>
        }
        
      </Container>
  )
}

export default DisplayWork
