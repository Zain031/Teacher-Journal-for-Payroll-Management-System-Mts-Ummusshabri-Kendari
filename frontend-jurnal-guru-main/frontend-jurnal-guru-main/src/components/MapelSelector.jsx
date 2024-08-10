import React, { useEffect } from "react";
import { fetchDataMapel } from "../redux/mapelRedux";
import { useDispatch, useSelector } from "react-redux";
import Load from "./Load";
const GuruSelector = ({ dataName = "Guru" }) => {
  const { data, loading, error } = useSelector((state) => state.mapel);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataMapel());
  }, [dispatch]);

  if (loading) {
    return <Load />;
  }
  if(!data || error?.message?.split(" ")[4] === "404"){
    return <h1>Data {dataName} Tidak Ditemukan</h1>
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <h1>{dataName}</h1>
      <div className="mb-5 bg-white p-3 rounded-md">
        <select className="w-full h-full" name={dataName.toLowerCase()} id={dataName.toLowerCase()}>
          {data.map((item) => (
            <option value={item._id}>{item.nama}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GuruSelector;
