import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Load from "./Load";
import GuruSelector from "./GuruSelector";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/storedRedux";
import { selectDataGuru, selectDataKelas, selectDataMapel, selectDataStored, selectLoadingStored, selectErrorStored } from "../redux/selectorRedux";
import { updateState } from "../redux/jurnalRedux";
import { useNavigate } from "react-router-dom";

const FormBuilder = ({
  id = null,
  detail,
  keyColumns = null,
  columnsName = null,
  isPublic = false,
}) => {
  const role = localStorage.getItem("role").toLowerCase();
  const [key, setKey] = useState(keyColumns ? keyColumns : []);
  const [columns, setColumns] = useState(columnsName ? columnsName : []);
  const [editData, setEditData] = useState({});
  const [data, setData] = useState({});
  const navigate = useNavigate();
  
  // Redux Fetch Data

  // Redux Get State
  const teacher = useSelector(selectDataGuru);
  const kelas = useSelector(selectDataKelas);
  const mapel = useSelector(selectDataMapel);

  // Redux Stored Fetch
  const stored = useSelector(selectDataStored);
  const loading = useSelector(selectLoadingStored);
  const error = useSelector(selectErrorStored);

  const dispatch = useDispatch();

  const postForm = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    let data = {};
    for (let key of form.keys()) {
      data[key] = form.get(key);
    }
    console.log(data);

    try {
      const linkId = `${id && id!== "add" ? `/${id}` : ""}`;
      const link = `${process.env.BASE_URL}/${role}/${detail}${linkId}`;
      const response = await axios({
        method: linkId ? "put" : "post",
        url: link,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: linkId ? "Succesfully updated data" : "Successfully added data",
      });
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    let request = {isPublic};
    if (detail) {
      request["detail"] = detail;
    }
    if (id && id!=="add") {
      request["id"] = id;
    }
    if (request != {}) {
      console.log(request,"<<<<<<<<<<<<<<<,");
      dispatch(fetchData(request));
    }
    
    console.log(stored);
  }, [dispatch, detail, id]);

  // if (loading) return <Load />;
  if(loading) return <Load/>
  

  return (
    <>
      <div
        
        className=" items-center justify-center md:h-screen  p-12"
      >
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
          <form onSubmit={postForm}>
            <div className="mb-4">
              <h1 className="text-2xl text-white font-bold">Form Builder</h1>
            </div>
            <div className="mb-4 md:grid md:grid-cols-2 gap-[2rem]">
              {key?.map((item,index) => (
                <div key={index}>
                  <h4 className={`key${index} py-1`}>{columns[index]}</h4>
                  <input
                    type="text"
                    name={item}
                    placeholder={'Name'}
                    className="bg-gray-200 text-black rounded-md p-2"
                    defaultValue={stored[item]}
                    
                  />
                </div>
              ))}
            </div>
            <div>
              <button
                type="submit"
                className="text-white rounded-md border-none hover:bg-green-600 bg-green-500 px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormBuilder;
