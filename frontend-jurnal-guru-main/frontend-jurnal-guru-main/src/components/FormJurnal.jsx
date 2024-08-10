import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/icomoon/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  selectDataKelas,
  selectDataMapel,
  selectLoadingKelas,
} from "../redux/selectorRedux";
import { fetchDataKelas } from "../redux/kelasRedux";
import { fetchDataMapel } from "../redux/mapelRedux";
import incrementTimeSlot from "../services/jam.service";

const FormJurnal = ({ id = null }) => {
  const role = localStorage.getItem("role").toLowerCase();
  const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const [teacher, setGuru] = useState([]);
  const [jurnal, setJurnal] = useState({});
  const [jam, setJam] = useState([
    "07:10-07:50",
    "07:50-08:30",
    "08:30-09:10",
    "09:10-09:50",
    "10:30-11:10",
    "11:10-11:50",
    "12:30-13:10",
    "13:10-13:50",
    "13:50-14:30",
    "14:30-15:10",
  ]);
  const mataPelajaran = useSelector(selectDataMapel);

  const kelas = useSelector(selectDataKelas);
  const kelasLoading = useSelector(selectLoadingKelas);
  const kelasError = useSelector(selectLoadingKelas);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }
  function handleJamKe(e) {
    let storedJam = [
      "07:10-07:50",
      "07:50-08:30",
      "08:30-09:10",
      "09:10-09:50",
      "10:30-11:10",
      "11:10-11:50",
      "12:30-13:10",
      "13:10-13:50",
      "13:50-14:30",
      "14:30-15:10",
    ];

    if (e.target.value > 0) {
      console.log(storedJam);
      const calc = (e.target.value-1) * 40;
      let jamChange = storedJam.map((item) => incrementTimeSlot(item, calc));
      storedJam = jamChange;
      console.log(storedJam);
    } else {
      storedJam = [
        "07:10-07:50",
        "07:50-08:30",
        "08:30-09:10",
        "09:10-09:50",
        "10:30-11:10",
        "11:10-11:50",
        "12:30-13:10",
        "13:10-13:50",
        "13:50-14:30",
        "14:30-15:10",
      ];
    }
    setJam(storedJam);
  }
  // ------------------------------------------------------Get all data

  const fetchGuru = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const { data } = await axios({
        method: "get",
        url: process.env.BASE_URL + "/users/role/teacher",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGuru(data);
      console.log(JSON.stringify(teacher));
      teacher.map((item) => {
        console.log(item.nama);
      });
    } catch (error) {
      console.log(error);
    }
  });

  const fetchJurnalGuru = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role").toLowerCase();
      const { data } = await axios({
        method: "get",
        url: `${process.env.BASE_URL}/${role}/jurnal-teacher/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJurnal(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  });

  const postJurnalGuru = useCallback(async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    const form = new FormData(e.target);

    // Dapetin teacher dan _idnya
    let teacherReplacement_id = form.get("teacherReplacement");
    let teacher_id =
      jurnal && jurnal?.teacher
        ? jurnal.teacher
        : teacher.find((item) => item._id === form.get("teacher"));
    let mapel_id = form.get("mapel");
    mapel_id = mataPelajaran.find((item) => item._id === mapel_id);
    let kelas_id = form.get("kelas");
    kelas_id = kelas.find((item) => item._id === kelas_id);
    teacherReplacement_id = teacher.find(
      (item) => item._id === teacherReplacement_id
    );
    console.log(teacher);

    const formData = {
      hari: form.get("hari"),
      jamKe: form.get("jamKe"),
      teacher: {
        _id: teacher_id._id,
        nama: teacher_id.nama,
      },
      teacherReplacement: teacherReplacement_id
        ? {
            _id: teacherReplacement_id._id,
            nama: teacherReplacement_id.nama,
          }
        : null,
      kelas: {
        _id: kelas_id?._id,
        nama: kelas_id?.nama,
      },
      mapel: {
        _id: mapel_id?._id,
        nama: mapel_id?.nama,
      },
      materi: form.get("materi"),
      jumlahJP: form.get("jumlahJP"),
    };
    console.log(formData);
    try {
      const link = `${process.env.BASE_URL}/${role}/jurnal-teacher${
        id && id != "add" ? `/${id}` : ""
      }`;
      const { data } = await axios({
        method: id && id != "add" ? "put" : "post",
        url: link,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });
      console.log(data);

      Swal.fire({
        icon: "success",
        title:
          id && id != "add"
            ? "Success Updating Jurnal"
            : "Succes Adding Jurnal",
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchJurnalGuru();
    fetchGuru();
    dispatch(fetchDataKelas());
    dispatch(fetchDataMapel());
  }, [dispatch]);

  if (kelasLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="items-center justify-center md:h-screen  p-12">
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-white">
              Form Teacher Journal
            </h1>
          </div>
          <form onSubmit={postJurnalGuru}>
            <div className="md:flex md:gap-28">
              <div>
                <label
                  htmlFor="hari"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Day
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="hari" name="hari">
                    {id &&
                      jurnal &&
                      day.map((item, index) => {
                        if (
                          item.toLowerCase() === jurnal?.hari?.toLowerCase()
                        ) {
                          return (
                            <>
                              <option
                                key={index}
                                value={item}
                                selected="selected"
                              >
                                {item}
                              </option>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <option key={index} value={item}>
                                {item}
                              </option>
                            </>
                          );
                        }
                      })}
                    {!id &&
                      day.map((item, index) => {
                        return (
                          <>
                            <option key={index} value={item}>
                              {item}
                            </option>
                          </>
                        );
                      })}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="jamKe"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Start Hours
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                    <select className="w-full" id="jamKe" name="jamKe">
                      {id &&
                        jurnal &&
                        jam.map((item, index) => {
                          if (item === jurnal?.jamKe) {
                            return (
                              <>
                                <option
                                  key={index}
                                  value={item}
                                  selected="selected"
                                >
                                  {item}
                                </option>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              </>
                            );
                          }
                        })}
                      {!id &&
                        jam.map((item, index) => {
                          return (
                            <>
                              <option key={index} value={item}>
                                {item}
                              </option>
                            </>
                          );
                        })}
                    </select>
                  </div>
                </div>

                <label
                  htmlFor="teacher"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Teacher
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="teacher" name="teacher">
                    <option value="">None</option>
                    {teacher?.map((item, index) => {
                      if (item._id === jurnal?.teacher?._id) {
                        return (
                          <>
                            <option
                              key={index}
                              value={item._id}
                              selected="selected"
                            >
                              {item.nama}
                            </option>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <option key={index} value={item._id}>
                              {item.nama}
                            </option>
                          </>
                        );
                      }
                    })}
                  </select>
                </div>

                <label
                  htmlFor="teacherReplacement"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Teacher Replacement{" "}
                  <span className="font-light text-sm">(Opsional)</span>
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select
                    className="w-full"
                    id="teacherReplacement"
                    name="teacherReplacement"
                  >
                    <option value="">None</option>
                    {teacher?.map((item, index) => {
                      if (item._id === jurnal?.teacherReplacement?._id) {
                        return (
                          <>
                            <option
                              key={index}
                              value={item._id}
                              selected="selected"
                            >
                              {item.nama}
                            </option>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <option key={index} value={item._id}>
                              {item.nama}
                            </option>
                          </>
                        );
                      }
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="kelas"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Class
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                  <select className="w-full" id="kelas" name="kelas">
                    <option value="">None</option>
                    {kelas?.map((item, index) => {
                      if (item?._id === jurnal?.kelas?._id) {
                        return (
                          <>
                            <option
                              key={index}
                              value={item?._id}
                              selected="selected"
                            >
                              {item?.nama}
                            </option>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <option key={index} value={item?._id}>
                              {item?.nama}
                            </option>
                          </>
                        );
                      }
                    })}
                  </select>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="mapel"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    School Subjects
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                    <select className="w-full" id="mapel" name="mapel">
                      {mataPelajaran.map((item, index) => {
                        if (item?._id === jurnal?.mapel?._id) {
                          return (
                            <>
                              <option
                                key={index}
                                value={item._id}
                                selected="selected"
                              >
                                {item.nama}
                              </option>
                            </>
                          );
                        } else {
                          return (
                            <>
                              <option key={index} value={item._id}>
                                {item.nama}
                              </option>
                            </>
                          );
                        }
                      })}
                    </select>
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Learning Materials
                  </label>
                  <input
                    type="text"
                    name="materi"
                    id="subject"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    defaultValue={jurnal?.materi}
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="mapel"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Working Hours
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                    <select
                      name="jumlahJP"
                      className="w-full"
                      id="jumlahJP"
                      onChange={handleJamKe}
                    >
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="text-white rounded-md border-none hover:bg-green-600 bg-green-500  px-10 py-3 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
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

export default FormJurnal;
