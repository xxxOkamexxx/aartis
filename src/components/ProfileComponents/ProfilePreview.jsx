import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// components
import ProfileBox from '../ProfileBox'
import CreatorsWorks from './CreatorsWorks'

// hooks
import useUser from '../../hooks/useUser'

import { useAuthContext } from '../../context/AuthContext'

// images styles bootstrap
import { Button, Image, Row } from 'react-bootstrap'
import BGImage from '../../assets/bg-img/banner.svg'
import { IconButton } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import EditIcon from '@mui/icons-material/Edit';




const ProfilePreview = () => {
    const { 
        currentUser, 
    } = useAuthContext()

    const { id } = useParams()
    
    //const id = currentUser.uid
    
    //console.log(id)
    const { data, loading } = useUser(id)

      console.log(data.description)
  return (
    <ProfileBox>
        <div className='profile-header'>
            <img src={BGImage} alt="" style={{maxWidth:'100%'}}/>
            <div className='user-display'>

         
                <Image
                    className="photo-placeholder "
                    src={data ?  data.photoURL : ''}
                    height={100}
                    width={100}
                    roundedCircle
                    style={{ backgroundImage: `url("https://via.placeholder.com/500")` }}
                />

                <div>
                    <h2>{data.name}</h2>
                </div>
            </div>

        </div> 


        <div className='profile-container'>
            <div className='btn-container d-flex justify-content-end'>
                { id == currentUser.uid &&
                    <div>
                        <Link to="/profile-edit" style={{textDecoration:'none'}}>
                            <Button className='btn-font btn-submit'>
                                <EditIcon />
                            </Button>
                        </Link>
                    </div>
                }
                { id != currentUser.uid &&
                    <div>
                        <IconButton sx={{width:'50px', height:'50px'}}>
                            <MailIcon sx={{ fontSize: "30px", color:'#fcfcfc'}} />
                        </IconButton>

                        <Button className='btn-font btn-submit'>Follow</Button>
                    </div>
        
                }
            </div>
            <div className="details-container">
                <p>{data.description}</p>
            </div>
            
            <div className='works-container'>
                <h3>Works</h3>

                <CreatorsWorks id={id}/>
               
            </div>

            
        </div>

    </ProfileBox>
  )
}

export default ProfilePreview