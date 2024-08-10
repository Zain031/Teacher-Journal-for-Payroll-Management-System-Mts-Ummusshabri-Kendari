import React from 'react'
import DataTable from '../components/DataTable'

const Kelas = () => {
  return (
    <div>
      <DataTable keyColumns={['nama']} columnsName={["Name"]} detail={'kelas'} isPublic={true} parentLink={"kelas"} title={'List of Class'} searchDetail={'nama'} />
    </div>
  )
}

export default Kelas
