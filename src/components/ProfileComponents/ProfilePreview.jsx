import React from 'react'
import ProfileBox from '../ProfileBox'
import { useRef, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BGImage from '../../assets/bg-img/banner.svg'

const ProfilePreview = () => {
    const { 
        currentUser, 
        setUserDisplay, 
        setEmail, 
        setPassword, 
        userPhotoUrl,
        userDescription,
      } = useAuthContext()


      console.log(userPhotoUrl)
  return (
    <ProfileBox>
        <div>
            <img src={BGImage} alt="" style={{maxWidth:'100%'}}/>
        </div>           
            <Image
                className="photo-placeholder me-5"
                src={userPhotoUrl?  userPhotoUrl : 'https://via.placeholder.com/225'}
                height={70}
                width={70}
                fluid
                roundedCircle
            />

        <div>
            <h2>{currentUser.displayName}</h2>
        </div>
        <div>
            <p>{userDescription}</p>
        </div>
        <Link to="/profile-edit" style={{textDecoration:'none'}}>
            <Button className='btnFont btn-submit'>EDIT</Button>
        </Link>
    </ProfileBox>
  )
}

export default ProfilePreview