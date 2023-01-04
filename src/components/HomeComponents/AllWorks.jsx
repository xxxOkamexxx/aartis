import { useState } from 'react';
import { Link } from 'react-router-dom';

// bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image';

// icon
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// context
import { useAuthContext } from '../../context/AuthContext';
import moment from 'moment';




const AllWorks = ({ image }) => {
	const [likes, setLikes] = useState(100);
  const [isClicked, setIsClicked] = useState(false);

	const created = moment( image.created.toMillis() ).format('YYYY-MM-DD')


	const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClicked(!isClicked);
  };


	return (
		<>

				<Card className="thumbnail-box" as={Link} to={`/work/${image.id}`}>

					<div 				
						className='thumbnail-image-box'
					>
						<Image className='thumbnail-image' src={image.url} alt={image.title} />
					</div>

					<div className='thumbnail-footer'>
						<h5>{image.title}</h5>
						<div>
							<Image 
										src={image ?  image.creator_avatar : ''}
										width='30px !important'
										height='30px !important'
										roundedCircle
									/>
							<span className='ms-2'>{image.creator_name}</span>
						</div>
						<span>created: {created}</span>

						<div className='d-flex justify-content-end align-items-center flex-row'>
							
								<div className="commentBtn">
									<IconButton 
										className='comment-button' 
										// onClick={ handleClick }
										style={{ width:'30px', height:'30px'}}
									>	
										<span>< ChatBubbleOutlineIcon className='comment-icon' /></span>					
									</IconButton>					
									<span className="action-counter"> 2</span>	
								</div>

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
					</div>

				</Card>
    </>
	)
}

export default AllWorks