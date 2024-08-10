import React from 'react'
import FormBuilder from '../components/FormBuilder'

const FormKelas = () => {
  return (
    <FormBuilder detail={['kelas']} keyColumns={['nama']} columnsName={["Class Name"]} />
  )
}

export default FormKelas