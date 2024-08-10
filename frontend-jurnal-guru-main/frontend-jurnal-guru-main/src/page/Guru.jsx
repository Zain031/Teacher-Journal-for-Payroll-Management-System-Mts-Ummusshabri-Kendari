import React from 'react'
import DataTable from '../components/DataTable'

const Guru = () => {
  return (
    <div>
      <DataTable keyColumns={["nama","role","username"]} columnsName={["Name","Role","Username"]} detail={"users"} parentLink={"teacher"} title={'List Of Teachers'} searchDetail={'nama'} />

    </div>
  )
}

export default Guru