import React from 'react'
import { Link, useParams } from 'react-router-dom'

// components
import ProfilePreview from '../components/ProfileComponents/ProfilePreview'


const ProfilePage = () => {
  const { id } = useParams()


  return (
    <>
      <ProfilePreview  id={id} />
    </>
  )
}

export default ProfilePage