import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { user } from "react-icons-kit/icomoon/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { selectDataGuru } from "../redux/selectorRedux";
import { fetchDataGuru } from "../redux/teacherRedux";

const FormJurnalForGuru = ({id=null}) => {
  const role = localStorage.getItem("role").toLowerCase();
  const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const teacher = useSelector(selectDataGuru)
  const kelas = ["VII", "VIII", "IX"];
  const jam = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const mataPelajaran = [
    "Matematika",
    "Bahasa Inggris",
    "Bahasa Jawa",
    "IPA",
    "IPS",
    "Biologi",
  ];
  const [jurnal, setJurnal] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  // ------------------------------------------------------Get all data

 

  const fetchJurnalGuru = useCallback(async () => {
    try {
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role").toLowerCase();
        const { data } = await axios({
            method: "get",
            url: `${process.env.BASE_URL}/${role}/jp/${id}`,
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
    let teacher_id = jurnal.teacher ? jurnal.teacher : teacher.find((item) => item._id === teacher_id);
    teacherReplacement_id = teacher.find((item) => item._id === teacherReplacement_id);
    console.log(teacher);

    const formData = {
      hari:jurnal.hari,
      jamKe: jurnal.jamKe,
      teacher: {
        _id: teacher_id._id,
        nama: teacher_id.nama,
      },
      teacherReplacement: teacherReplacement_id ? {
        _id: teacherReplacement_id._id,
        nama: teacherReplacement_id.nama
        } : null,
      kelas: jurnal.kelas,
      mapel: jurnal.mapel,
      materi: form.get("materi"),
      jumlahJP:jurnal.jumlahJP,
    };
    console.log(formData);

    try {
      let link = `${process.env.BASE_URL}/${role}`;
      if (role === "admin") {
        link += "/jurnal-teacher";
      } else {
        link += "/jp";
      }
      if (id) {
        link += `/${id}`;
      }
      
      const { data } = await axios({
        method: "post",
        url: `${process.env.BASE_URL}/${role}/jurnal-teacher`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });
      console.log(data);

      Swal.fire({
        icon: "success",
        title:"Succes Adding Jurnal",
      });
      
      navigate("/jurnal");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    console.log("id<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    fetchJurnalGuru();

    dispatch(fetchDataGuru())
  }, []);

  return (
    <>
      <div
        
        className="items-center justify-center md:h-screen  p-12"
      >
        
        <div className="mx-auto w-full max-w-[600px] p-10 bg-black bg-opacity-50 rounded-md shadow-lg  ">
          <form onSubmit={postJurnalGuru}>
          <div className="flex justify-between my-[1rem]">
            <h1 className="text-3xl font-bold text-white">Form Teacher Journal</h1>
          </div>
            <div className="md:flex md:gap-28">
              <div>
                <label
                  htmlFor="hari"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Days
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                <input
                  type="text"
                  name="hari"
                  id="subject"
                  value={jurnal?.hari}
                  placeholder="Enter your subject"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  readOnly={true}
                />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="jamKe"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Start Hours
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                  <input
                  type="text"
                  name="hari"
                  id="subject"
                  value={jurnal?.jamKe}
                  placeholder="Enter your subject"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    readOnly={true}
                />
                  </div>
                </div>

                <label
                  htmlFor="teacher"
                  className="mb-3 block text-base font-medium text-white"
                >
                  Teacher
                </label>

                <div className="mb-5 bg-white p-3 rounded-md">
                <input
                  type="text"
                  name="hari"
                  id="subject"
                  value={jurnal?.teacher?.nama}
                  placeholder="Enter your subject"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  readOnly={true}
                />
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
                    {teacher?.map((item) => {
                      return (
                        <>
                          <option key={item._id} value={item._id}>
                            {item.nama}
                          </option>
                        </>
                      );
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
                <input
                  type="text"
                  name="kelas"
                  id="subject"
                  value={jurnal?.kelas?.nama}
                  placeholder="Enter your subject"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  readOnly={true}
                />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="mapel"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    School Subjects
                  </label>
                  <div className="mb-5 bg-white p-3 rounded-md">
                  <input
                  type="text"
                  name="mapel"
                  id="subject"
                  value={jurnal?.mapel?.nama}
                  placeholder="Enter your subject"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  readOnly={true}
                />
                  </div>
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Lesson Material
                  </label>
                  <input
                  type="text"
                  name="materi"
                  id="subject"
                  
                  placeholder="Enter your subject"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required={true}
                />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="jumlahJP"
                    className="mb-3 block text-base font-medium text-white"
                  >
                    Total Working Hours
                  </label>
                  <input
                    type="text"
                    name="jumlahJP"
                    id="jumlahJP"
                    placeholder="Enter your subject"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={jurnal?.jumlahJP}
                    required={true}
                    readOnly={true}
                  />
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

export default FormJurnalForGuru;
