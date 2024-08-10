import React, { useEffect } from "react";
import FormBuilder from "../components/FormBuilder";
import { useParams } from "react-router-dom";
import DataTable from "../components/DataTable";
const Mapel = (isForm = false) => {
  const { id } = useParams();
  if (isForm && Object.keys(isForm).length > 0) {
    if (id && id !== "add") {
      return (
        <FormBuilder
          id={id}
          detail={"mapel"}
          keyColumns={["nama"]}
          columnsName={["Lesson Name"]}
          isPublic={true}
        />
      );
    } else {
      return (
        <FormBuilder
          detail={"mapel"}
          keyColumns={["nama"]}
          columnsName={["Lesson Name"]}
          isPublic={true}
        />
      );
    }
  }
  return (
    <div>
      <DataTable
        keyColumns={["nama"]}
        columnsName={["Name"]}
        detail={"mapel"}
        isPublic={true}
        parentLink={"mapel"}
        title={"List of Lesson"}
        searchDetail={'nama'}
      />
    </div>
  );
};

export default Mapel;
