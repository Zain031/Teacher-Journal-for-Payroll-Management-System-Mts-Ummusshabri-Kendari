import React from "react";
import FormBuilder from "../components/FormBuilder";
import { useParams } from "react-router-dom";


const EditKelas = () => {
  const { id } = useParams();
  return <FormBuilder keyColumns={["nama"]} columnsName={["Class Name"]} detail={"kelas"} id={id} isPublic={true} />;
};

export default EditKelas;
