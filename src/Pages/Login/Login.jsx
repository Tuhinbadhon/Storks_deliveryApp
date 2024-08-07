import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import "./Login.css";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const [showPass, setShowpass] = useState(false);
  const helmetContext = {};
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const from = location.state?.from?.pathname || "/";
  // const captchaRef = useRef(null);
  // const [disabled, setDisabled] = useState(true);

  // captcha
  // useEffect(() => {
  //   loadCaptchaEnginge(6);
  // }, []);
  // const handleValidateCaptcha = (e) => {
  //   const user_captcha_value = e.target.value;
  //   if (validateCaptcha(user_captcha_value)) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // };

  const {
    signInUser,
    signInWithGoogle,
    signInWithGithub,
    signInWithFacebook,
    signInWithTwitter,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  // email login
  const loginFormHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email || "N/A",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        Swal.fire({
          text: "Successfully login",
          icon: "success",
        });

        e.target.reset();
        setShowpass(false);

        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          text: "Invalid Username/Password",
          icon: "error",
        }).then(() => {
          window.location.reload(); // Refresh the page on error
        });
      });
  };

  //google login
  const googleLoginHandler = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email || "N/A",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });

        Swal.fire({
          text: "Successfully login",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };
  const facebookLoginHandler = () => {
    signInWithFacebook()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email || "N/A",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });
        Swal.fire({
          text: "Successfully login",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };
  const twitterHandler = () => {
    signInWithTwitter()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email || "N/A",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
        });

        Swal.fire({
          text: "Successfully login",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };

  //github login
  // const githubLoginHandler = () => {
  //   signInWithGithub()
  //     .then((result) => {
  //       const loggedUser = result.user;
  //       Swal.fire({
  //         text: "Successfully login",
  //         icon: "success",
  //       });
  //       navigate(from, { replace: true });
  //     })
  //     .catch((error) => {
  //       Swal.fire({
  //         text: error.message,
  //         icon: "error",
  //       });
  //     });
  // };

  return (
    <div className=" py-10  min-h-screen  max-[450px]:content-center  bg-gradient-to-r from-pink-400  to-purple-500  p-5">
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>STORKS | Login</title>
        </Helmet>
      </HelmetProvider>

      <div className="mx-auto  bg-white w-full max-w-md p-10 rounded-2xl shadow max-[450px]:p-8 ">
        <h2 className="mb-5  p-3 text-4xl font-bold text-center text-gradient2">
          Login
        </h2>

        <form
          noValidate=""
          action=""
          className="space-y-8"
          onSubmit={loginFormHandler}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-semibold text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Type your Email here"
                className="w-full px-3 py-2 border-b outline-none focus:border-b-1 focus:border-blue-400  "
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="font-semibold text-sm">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="*******"
                  className="w-full px-3 py-2 border-b outline-none focus:border-b-1 focus:border-blue-400 "
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => {
                    setShowpass(!showPass);
                  }}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="flex justify-end font-semibold">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            {/* <div className="space-y-2">
              <label className="label  ">
                <LoadCanvasTemplate />
              </label>
              <input
                onBlur={handleValidateCaptcha}
                type="text"
                name="captcha"
                placeholder="Type the captcha here "
                className="w-full px-3 py-2 border-b outline-none focus:border-b-1 focus:border-blue-400  "
                required
              />
            </div> */}
          </div>
          <button className="btn w-full  px-8 py-3 font-semibold rounded-3xl dark:bg-purple-500 hover:bg-pink-500 dark:text-gray-50">
            Log in
          </button>
        </form>

        <p className="mt-8 text-sm font-semibold text-center">
          Or Sign Up Using
        </p>
        <div className=" flex justify-center gap-2 items-baseline  space-y-4">
          {/* <button
            onClick={facebookLoginHandler}
            aria-label="Login with GitHub"
            role="button"
            className="btn  bg-[#3d5b99]  flex items-center justify-center  p-4 space-x-4 border rounded-3xl focus:ring-2 focus:ring-offset-1 dark:border-gray-100 focus:dark:ring-violet-100"
          >
            <FaFacebookF className="text-white text-xl" />
          </button> */}
          <button
            onClick={twitterHandler}
            aria-label="Login with GitHub"
            role="button"
            className="btn  bg-[#45a1f1]  flex items-center justify-center  p-4 space-x-4 border rounded-3xl focus:ring-2 focus:ring-offset-1 dark:border-gray-100 focus:dark:ring-violet-100"
          >
            <FaTwitter className="text-white text-xl" />
          </button>
          <button
            onClick={googleLoginHandler}
            aria-label="Login with Google"
            type="button"
            className="btn bg-red-500 text-white flex items-center justify-center  p-4 space-x-4 border rounded-3xl focus:ring-2 focus:ring-offset-1 dark:border-gray-200 focus:dark:ring-violet-100"
          >
            <FaGoogle className="text-xl" />
          </button>
        </div>
        <p className="text-sm mt-14 flex flex-col font-semibold text-center dark:text-gray-600">
          Don't Have Account?{" "}
          <Link
            to="/registration"
            rel="noopener noreferrer"
            className="uppercase mt-3 font-bold text-primary"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
