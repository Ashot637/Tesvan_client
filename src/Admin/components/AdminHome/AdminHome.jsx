import React, { useEffect } from "react";
import classes from "./home.module.scss";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe } from "../../../redux/slices/authSlice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const AdminHome = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { admin, status } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAuthMe());
    localStorage.removeItem("language");
  }, []);

  if (
    !admin &&
    !location.pathname.includes("/login") &&
    status !== "loading" &&
    status !== "waiting"
  ) {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        {!location.pathname.includes("/login") && <AdminSidebar />}
        {location.pathname === "/admin" ? (
          <div className={classes.home}>
            <h1>
              Welcome to <span>Tesvan Electronics Admin</span>
            </h1>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </DndProvider>
  );
};

export default AdminHome;
