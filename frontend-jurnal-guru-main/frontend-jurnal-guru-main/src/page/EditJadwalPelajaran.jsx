import React from "react";
import { Link, useParams } from "react-router-dom";
import FormJP from "../components/FormJP";


const EditJadwalPelajaran = () => {
  const id = useParams()

  return (
    <FormJP id={id.id}/>
    )
}

export default EditJadwalPelajaran
