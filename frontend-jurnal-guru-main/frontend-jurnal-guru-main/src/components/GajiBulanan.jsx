import { useDispatch, useSelector } from "react-redux";
import { fetchDataJP } from "../redux/jurnalRedux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { selectDataJurnalGuru, selectErrorJurnalGuru, selectLoadingJurnalGuru } from "../redux/selectorRedux";

const GajiBulanan = ({ id, from }) => {
  // Redux
  const dispatch = useDispatch();

  const data = useSelector(selectDataJurnalGuru);
  const loading = useSelector(selectLoadingJurnalGuru)
  const error = useSelector(selectErrorJurnalGuru)
  const [monthName, setMonthName] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  // useEffect(() => {
  //   const monthlyName = [
  //     "Januari",
  //     "Februari",
  //     "Maret",
  //     "April",
  //     "Mei",
  //     "Juni",
  //     "Juli",
  //     "Agustus",
  //     "September",
  //     "Oktober",
  //     "November",
  //     "Desember",
  //   ];

  //   const month = from ? parseInt(from.split("-")[1])-1 : new Date().getMonth();
  //   const year = from ? from.split("-")[0] : new Date().getFullYear();
  //   setYear(year);
  //   console.log(month, year,"MONTH YEAR");
  //   dispatch(fetchDataJP({ id, month, year }));
    
  //   setMonthName(month ? monthlyName[month] : false);
  // }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  
  console.log(data, "DATA");
  return (
    <div className="px-10 py-2">
      <h1 className="font-bold">
        Payment {data?.month ? `in ${data?.month} ${data?.year}` : "This Month"}:
      </h1>
      <div className="flex justify-between w-[50%]">

        {data?.jumlahJP ? (<ul className="list-disc px-16 py-2">
          <li>Teaching Hours: {data?.jumlahJP}</li>
          <li>Payment: {new Intl.NumberFormat("id-ID",{
            style:"currency",
            currency:"IDR"
          }).format(data?.gaji)}</li>
        </ul>) : <p className="px-16 py-2">No Data</p>}
      </div>
    </div>
  );
};

export default GajiBulanan;
