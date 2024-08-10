import React, { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { ic_lock_outline_twotone } from "react-icons-kit/md/ic_lock_outline_twotone";
import { ic_lock_open } from "react-icons-kit/md/ic_lock_open";
import Swal from "sweetalert2";
import axios, { formToJSON } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectDataStored } from "../redux/selectorRedux";
import { fetchData } from "../redux/storedRedux";

const Register = ({ id }) => {
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [icon, setIcon] = useState(ic_lock_open);
  const [type, setType] = useState("password");
  const navigate = useNavigate();
  const [data,setData] = useState([])
  const dispatch = useDispatch();
  // -----------------------------------------------------REGISTER
  
  async function handdleRegister(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const form = new FormData(e.target);
      const role = localStorage.getItem("role").toLowerCase();
      const requestBody = formToJSON(form);
      console.log(requestBody);
      let link = process.env.BASE_URL + "/register";
      if (id) {
        link = `${process.env.BASE_URL}/${role}/users/${id}`;
      }
      const { data } = await axios({
        method: id ? "put" : "post",
        url: link,
        data: requestBody,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      Swal.fire({
        icon: "success",
        title: id ? "Success Updating" : "Succes register",
      });
      console.log(data);
      navigate("/teacher");
      console.log(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  async function handdlePassword() {
    if (type === "password") {
      setIcon(ic_lock_outline_twotone);
      setType("text");
    } else {
      setIcon(ic_lock_open);
      setType("password");
    }
  }
  async function fetchData(){
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role").toLowerCase();
    const response = await axios({
      method: "get",
      url: `${process.env.BASE_URL}/${role}/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(response.data)
  }
  useEffect(()=>{
    if(id) fetchData()
  },[])
  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center"
        
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="https://ummusshabri.sch.id/template/awal/assets/img/logo-pesri.png"
                width={150}
                alt=""
                srcSet=""
              />
              <h1 className="mb-2 text-md">
                Islamic School of Ummusabri Kendari{" "}
              </h1>
              <span className="text-gray-300">Enter Personal Data Details</span>
            </div>
            <form onSubmit={handdleRegister}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="nama"
                  placeholder="Nama"
                  onChange={(e) => {
                    setNama(e.target.value);
                  }}
                  defaultValue={data?.nama}
                />
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none  bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  defaultValue={data?.username}
                />
              </div>

              <div className="mb-4 text-sm">
                <select
                  className="rounded-xl w-64 h-10 border-none bg-black opacity-60 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  name="role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option className="text-center">Pilih Role</option>
                  <option className="text-center" value="Teacher" selected={data?.role?.toLowerCase()==='teacher'}>
                    Teacher
                  </option>
                  <option className="text-center" value="Admin" selected={data?.role?.toLowerCase()==='admin'}>
                    Admin
                  </option>
                </select>
              </div>

              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none  bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type={type}
                  name="password"
                  placeholder="Password"
                  defaultValue={data?.password}
                />
              </div>
              <div
                onClick={handdlePassword}
                className="hover:cursor-pointer rounded-sm py-1 flex justify-center bg-black opacity-30  mr-2 "
              >
                <Icon size={30} icon={icon} />
              </div>
              <div className="flex gap-4 justify-center">
                <div className="mt-8 flex justify-center text-lg text-black">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500  px-7 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>

                <div className="mt-8 flex justify-center text-lg text-black">
                  <Link to={"/teacher"}>
                    <button className="rounded-md bg-blue-500  px-7 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-700">
                      Go Back
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
