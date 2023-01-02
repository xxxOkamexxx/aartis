import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProfilePreview from '../components/ProfileComponents/ProfilePreview'
import useGetProfile from '../hooks/useGetProfile'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const ProfilePage = () => {
  const { id } = useParams()
  //const { data, loading } = useGetProfile(id)
  // const navigate = useNavigate()

  // // redirect user to todos list
  // navigate('/profile', { replace: true })  
  //console.log(data);
  return (
    <ProfilePreview />
  )
}

export default ProfilePage