import React, { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { ic_lock_outline_twotone } from "react-icons-kit/md/ic_lock_outline_twotone";
import { ic_lock_open } from "react-icons-kit/md/ic_lock_open";
import Swal from "sweetalert2"
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [icon, setIcon] = useState(ic_lock_open);
  const [type, setType] = useState("password");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  
  async function handdleLogin(e) {
    e.preventDefault();
    try {      
      const requestBody = { username, password };
      const response = await axios.post(
        process.env.BASE_URL+"/login",
        requestBody
      );
      console.log(response);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("nama", response.data.nama);
      Swal.fire({
        icon: "success",
        title: "Succes Login",
      });
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: `${error.response.data.message}`,
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


  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://ucarecdn.com/3ecabc98-04d2-4c9b-b568-6936280e9ceb/download")',
        }}
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
                Islamic School of Ummusabri Kendari
              </h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={handdleLogin}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-xl border-none bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={username}
                />
              </div>

                <div className="mb-4 text-lg">
                  <input
                    className="rounded-xl border-none bg-black opacity-60  px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                    type={type}
                    name="Password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
                <div onClick={handdlePassword} className="hover:cursor-pointer rounded-sm py-1 flex justify-center bg-black opacity-30  mr-2 ">
                  <Icon size={30} icon={icon} />
                </div>
             

              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-500  px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </form>           
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
