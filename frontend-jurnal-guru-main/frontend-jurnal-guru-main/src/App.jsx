import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import JurnalGuru from "./page/JurnalGuru";
import JadwalPelajaran from "./page/JadwalPelajaran";
import DitailJurnalGuru from "./page/DitailJurnalGuru";
import DitailJadwalPelajaran from "./page/DitailJadwalPelajaran";
import EditJadwalPelajaran from "./page/EditJadwalPelajaran";
import EditJurnalGuru from "./page/EditJurnalGuru";
import JurnalReform from "./page/JurnalReform";
import JadwalReform from "./page/JadwalReform";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Profile from "./page/Profile";
import Guru from "./page/Guru";
import DetailGuru from "./page/DetailGuru";
import LandingPage from "./page/LandingPage";
import FormBuilder from "./components/FormBuilder";
import TestPage from "./page/TestPage";
import EditGuru from "./page/EditGuru";
import Kelas from "./page/Kelas";
import FormKelas from "./page/FormKelas";
import EditKelas from "./page/EditKelas";
import Mapel from "./page/Mapel";
import DetailMapel from "./page/DetailMapel";
import DetailKelas from "./page/DetailKelas";
import JadwalSaya from "./page/JadwalSaya";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path:"/",
        element:<Home/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/test",
        element: <TestPage />,
      },
      {
        path: "/page",
        element: <LandingPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/jurnal/:id",
        element: <JurnalReform />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/jp/edit/:id",
        element: <JadwalReform />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/jp/add",
        element: <JadwalReform />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path:"/kelas",
        element:<Kelas/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }
      },{
        path:"/kelas/:id",
        element:<DetailKelas/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }
      },
      {
        path:"/kelas/edit/:id",
        element: <EditKelas/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }
      },
      {
        path:"/kelas/add",
        element:<FormKelas />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }

      },
      {
        path:"/mapel",
        element:<Mapel/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }
      },
      {
        path:"/mapel/:id",
        element:<DetailMapel/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }
      },
      {
        path:"/mapel/edit/:id",
        element:<Mapel isForm={true}/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }
      },
      {
        path:"/mapel/add",
        element:<Mapel isForm={true}/>,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        }
      },
      {
        path: "/teacher/:id",
        element: <DetailGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/teacher",
        element: <Guru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/teacher/add",
        element: <Register />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/teacher/edit/:id",
        element: <EditGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/home",
        element: <Home />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },

      {
        path: "/jadwal",
        element: <JadwalPelajaran />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/my-jadwal",
        element: <JadwalSaya />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/jurnal",
        element: <JurnalGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/ditailJadwalPelajaran/:id",
        element: <DitailJadwalPelajaran />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/ditailJurnalGuru/:id",
        element: <DitailJurnalGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/editJadwalPelajaran/:id",
        element: <EditJadwalPelajaran />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
      {
        path: "/editJurnalGuru/:id",
        element: <EditJurnalGuru />,
        loader: async () => {
          if (!localStorage.getItem("access_token")) {
            throw redirect("/login");
          }
          return null;
        },
      },
    ],
  },
]);

function NavbarWrapper() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
