import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

// bootstrap icon
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// context
import { useAuthContext } from '../../context/AuthContext';

import useUser from '../../hooks/useUser'



const AllWorks = ({ image }) => {
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
	const [isLiked, setIsLiked] = useState()


	const { data } = useUser(image.user)


	const created = moment( image.created.toMillis() ).format('YYYY-MM-DD HH:mm:ss')
	const updated = moment( image.updated?.toMillis() ).format('YYYY-MM-DD HH:mm:ss')
	

	useEffect(() => {
    setComments(image.comment?.length)
		setIsLiked(image.likes)
  },[image])



	return (
		<>

				<Card 
				 className="thumbnail-box" 
				 style={{textDecoration:'none', color:'#343530'}}
				>

					<div 				
						className='thumbnail-image-box'
					>
						<Link to={`/work/${image.id}`}>
							<Image 
								className='thumbnail-image' 
								src={image.url} 
								alt={image.title}  								
							/>
						</Link>
					</div>

					<div className='thumbnail-footer'>
						<h5>{image.title}</h5>
						<div>
							<Image 
										src={data ?  data.photoURL : 'https://via.placeholder.com/225'}
										width='30px !important'
										height='30px !important'
										roundedCircle
										
									/>
							<span className='ms-2'>{data.name}</span>
						</div>

						<div className='d-flex justify-content-end align-items-center flex-row'>
							
								<div className="commentBtn">
									<IconButton 
										className='comment-button' 
										// onClick={ handleClick }
										style={{ width:'30px', height:'30px'}}
										>	
										<span>< ChatBubbleOutlineIcon className='comment-icon' /></span>					
									</IconButton>					
									<span className="action-counter">{comments}</span>	
								</div>

								<div className="likeBtn ms-2">
									<span>{ isClicked
												? < FavoriteIcon className='like-icon' /> 
												: < FavoriteBorderIcon className='like-icon' />}</span>	
									<span className="action-counter"> {image.likes}</span>
								</div>
							
						</div>
					</div>
							{ !image.updated &&
								<span><small>Created: {created}</small></span>
							}
							
							{ image.updated &&
								<span><small>Updated: {updated}</small></span>
							}

				</Card>
    </>
	)
}

export default AllWorks