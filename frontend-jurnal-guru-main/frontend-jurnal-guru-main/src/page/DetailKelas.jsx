import React from 'react'
import { useParams } from 'react-router-dom'
import Detail from '../components/Detail'

const DetailKelas = () => {
    const {id} = useParams()
  return (
    <Detail isPublic={true} id={id} keyColumns={['nama']} columnsName={['Class Name']} />
  )
}

export default DetailKelas