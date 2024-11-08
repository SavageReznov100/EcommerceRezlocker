import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Authentication/store/reducer/auth";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
import { toast } from "react-toastify";

const ProfileNav = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setToken } = useContext(ProductContext);
  const storedToken = localStorage.getItem("token");
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center w-28 h-28  text-black bg-white">
        <div>
          <Link to="/myorders">
            <h1>My Orders </h1>
          </Link>
        </div>

        {!storedToken ? (
          <div>
            <Link to="/signup">
              <button className="  bg-black hover:bg-latergator text-white  py-1.5 px-2 transition-all duration-700">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <button
              onClick={() =>
                dispatch(logout()).then(() => {
                  navigate("/");
                  setToken(null);
                  toast.success("Logged Out");
                })
              }
              className="  bg-black hover:bg-latergator text-white  py-1.5 px-2 transition-all duration-700"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileNav;
