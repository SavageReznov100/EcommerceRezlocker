import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signup } from "../Authentication/store/reducer/auth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log(data);
    const { email, password, fullname } = data;
    dispatch(signup({ email, password, fullname })).then((action) => {
      if (signup.fulfilled.match(action)) {
        localStorage.setItem("token", action.payload);
        navigate("/");
        toast.success("Welcome", fullname);
      }
    });
  };
  return (
    <>
      <div className=" h-screen w-screen grid md:grid-cols-2 ">
        <div className="hidden md:block">
          <img
            src="/img/auth/auth1.jpg"
            className="h-full w-full object-cover "
            placeholder="blur"
          />
        </div>
        <div className="flex flex-col ml-5 justify-center items-center">
          <h1 className="mb-7  text-2xl md:text-4xl font-semibold font-serif text-latergator  ">
            Welcome to Rezlocker
          </h1>
          <div className="flex flex-col justify-center text-red-400 gap-2">
            {auth.error && <p>{auth.error}</p>}
            {errors.email && <p>Email is not valid</p>}
            {errors.password && <p>Pasword is not Strong Enough</p>}
          </div>
          <form
            className="flex flex-col gap-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Full Name</label>
            <input
              type="text"
              {...register("fullname", { required: true })}
              placeholder="Full Name..."
              className="ring-1 w-72 ring-slate-900/10 py-2 px-3 bg-[#EFF0F2] outline-none "
            />

            <label>Email</label>
            <input
              type="text"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              placeholder="Email..."
              className="ring-1 w-72 ring-slate-900/10 py-2 px-3 bg-[#EFF0F2] outline-none "
            ></input>

            <label>Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              })}
              placeholder="Password "
              className="ring-1 w-72 ring-slate-900/10 py-2 px-3 bg-[#EFF0F2] outline-none "
            ></input>

            <button
              type="submit"
              className="px-10 py-2 bg-latergator text-white  "
            >
              Create Account
            </button>

            <p>
              Already have an account ?
              <span className="text-latergator">
                <Link to="/login"> Log in</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
