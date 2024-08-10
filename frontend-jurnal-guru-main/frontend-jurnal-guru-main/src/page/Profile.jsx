import React, { useEffect, useState } from "react";
import axios from "axios";
import JurnalGuru from "./JurnalGuru";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataProfile } from "../redux/profileRedux";
import { selectDataProfile, selectLoadingProfile, selectRoleProfile } from "../redux/selectorRedux";
import Load from "../components/Load";
const Profile = ({ id = null }) => {
  const token = localStorage.getItem("access_token");
  const role = useSelector(selectRoleProfile);
  
  const data = useSelector(selectDataProfile);
  const loading = useSelector(selectLoadingProfile);


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataProfile({id:id}));
    console.log(role)
  }, [dispatch]);

  if (data?.loading) return <h1>Loading...</h1>;
  if (
    !data ||
    data?.error?.message?.split(" ")[4] === "404"
  ) {
    return (
      <div className="px-10 py-2">
        <h1 className="font-bold">Profile is Empty</h1>
      </div>
    );
  }
  if (data?.error) return <h1>Error</h1>;
  if (loading) return <Load />;

  return (
    <div className=" w-full h-full ">
      <div class="flex flex-col pt-8 px-28">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5 ">
          <div class="py-2 inline-block w-[100%] sm:px-6 lg:px-8  ">
            <div className="bg-blue-300 flex justify-between gap-64 leading-8 p-5 rounded-md text-[#333333] ">
              <div className="p-14 text-3xl leading-[5rem] bg- bg-blue-200 rounded-md ">
                <p className="font-bold">
                  Name : <span>{data?.data?.nama}</span>
                </p>
                <p className="font-bold">
                  Role : <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </p>
                <p className="font-bold">
                  Username : <span>{data?.data?.username}</span>
                </p>

                
              </div>
              <div className="py-14">
                <img
                  className="w-[15rem] h-[15rem] rounded-full mr-24"
                  src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                  alt=""
                />
              </div>
            </div>
            {role === "teacher" && (
              <div class="overflow-scroll no-scrollbar">
                
                <JurnalGuru isProfile={true} id={data?.data?._id}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
