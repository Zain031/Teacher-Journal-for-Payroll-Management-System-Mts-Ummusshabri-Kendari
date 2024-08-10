import { useParams } from 'react-router-dom'
import React from 'react'
import Register from './Register'

const EditGuru = () => {
    const {id} = useParams()
  return (
    <Register id={id} />
  )
}

export default EditGuru