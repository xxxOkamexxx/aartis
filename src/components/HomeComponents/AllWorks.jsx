import { useState } from 'react';


// bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image';

import moment from 'moment';

// icon
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// context
import { useAuthContext } from '../../context/AuthContext';


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
				<Card className="thumbnail-box">

					<div 				
						className='thumbnail-image-box'
					>
						<Image className='thumbnail-image' src={image.url} alt={image.title} />
					</div>

					<div className='thumbnail-footer'>
						<h5>{image.title}</h5>
						<div>
							<Image 
										src='https://via.placeholder.com/225'
										width='30px !important'
										height='30px !important'
										roundedCircle
									/>
							<span className='ms-2'>{image.author_name}</span>
						</div>

						<div className='d-flex justify-content-between align-items-center'>
							<span>created: {created}</span>
							<div>
								<IconButton className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>	
									<span>{ isClicked
										? < FavoriteIcon className='like-icon' /> 
										: < FavoriteBorderIcon className='like-icon' />}</span>					
									<span className="likes-counter"> {likes}</span>	
								</IconButton>					
							</div>
						</div>
					</div>

				</Card>
    </>
	)
}

export default AllWorks