import React, { useEffect } from 'react'
import FormJurnalForGuru from '../components/FormJurnalForGuru';
import FormJurnal from '../components/FormJurnal';
import { useParams } from 'react-router-dom';

const JurnalReform = () => {
    
  const {id} = useParams();
  useEffect(() => {
    console.log(localStorage.role,"<<<<<<<<<<<<<<<<<<<<<<<")
  }, [])
  if(localStorage.role?.toLowerCase() === "teacher"){
    return (
    <FormJurnalForGuru id={id}/>
  )
    }
    else if(localStorage.role?.toLowerCase() === "admin"){
      return (
      <FormJurnal id={id}/>
    )
    }
}

export default JurnalReform