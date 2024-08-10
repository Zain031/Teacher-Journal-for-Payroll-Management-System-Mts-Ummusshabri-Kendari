import React from 'react'
import { useParams } from 'react-router-dom'
import Detail from '../components/Detail'

const DetailMapel = () => {
    const {id} = useParams()
  return (
    <Detail isPublic={true} id={id} keyColumns={['nama']} detail={'mapel'} columnsName={['School Subject Name']} />
  )
}

export default DetailMapel