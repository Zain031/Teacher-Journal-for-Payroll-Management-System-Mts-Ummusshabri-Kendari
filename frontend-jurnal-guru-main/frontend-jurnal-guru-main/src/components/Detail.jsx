import React, { useEffect, useState } from "react";
import axios from "axios";

const Detail = ({id,detail,keyColumns=null,columnsName=null,isPublic=false}) => {
  const role = localStorage.getItem("role").toLowerCase();
  const token = localStorage.getItem("access_token");
  
  const [result, setResult] = useState([]);
  const [key, setKey] = useState([]);
  const [columns, setColumns] = useState(columnsName ? columnsName : []);

  async function fetchDataId() {
    try {
      let link
      if(isPublic){
        link = `${process.env.BASE_URL}/${detail}/${id}`
      }else{
        link = `${process.env.BASE_URL}/${role}/${detail}/${id}`
      }
      const { data } = await axios({
        method: "get",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const keylog = Object.keys(data);
      console.log(data);
      setColumns(columnsName ? columnsName : keylog);
      console.log(keyColumns);
      setKey(keyColumns ?keyColumns : keylog);
      setResult(data);
      console.log(key);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchDataId();
    console.log(result);
  }, []);
  return (
    <div className="m-auto w-full h-screen ">
      <div className="w-full   flex justify-center  text-[#333333] ">
        <div className=" h-screen   rounded-md  w-full">
          <div className="px-3 py-4  mt-4 sticky top-20   ">
            <div className="text-center font-bold text-xl bg-blue-300 py-2">
              <p>Detail</p>
            </div>
          <div className="pl-4 py-2 bg-blue-100 grid grid-cols-2">
            {key?.map((item, index) => {
              if(item === '_id') return null
              return (
                <div key={index} className=" flex gap-2 pl-4 py-2 bg-blue-100">
                  <p className="font-bold">{columns[index].charAt(0).toUpperCase() + columns[index].slice(1)} :</p>
                  <p>{typeof result[item] === 'object' && !Array.isArray(result[item]) && result[item] !== null ?  result[item]?.nama : result[item]}</p>
                </div>
              );
            })}

          </div>

          </div>          
        </div>
      </div>
    </div>
  );
};

export default Detail;
