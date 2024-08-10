import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataKelas } from "../redux/kelasRedux";
const KelasSelector = ({ dataName = "Kelas", validation=false }) => {
  const { data, loading, error } = useSelector((state) => state.kelas);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataKelas());
  },[dispatch]);

  if (loading) {
    return <Load />;
  }
  if (!data || error?.message?.split(" ")[4] === "404") {
    return <h1>Data {dataName} Tidak Ditemukan</h1>;
  }
  return (
    <div>
      <h1>{dataName}</h1>
      <div className="mb-5 bg-white p-3 rounded-md">
        <select
          className="w-full h-full"
          name={dataName.toLowerCase()}
          id={dataName.toLowerCase()}
        >
          {data.map((item) => (
            <option value={item._id}>{item.nama}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default KelasSelector;
