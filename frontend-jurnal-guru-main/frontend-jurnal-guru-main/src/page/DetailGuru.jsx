import React from 'react'
import { useParams } from 'react-router-dom'
import Detail from '../components/Detail'
import Profile from './Profile'

const DetailGuru = () => {
  const {id} = useParams()
    return (
        <Profile id={id} />
  )
}

export default DetailGuru