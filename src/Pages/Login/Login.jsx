import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
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

const Login = () => {
  const [showPass, setShowpass] = useState(false);
  const helmetContext = {};
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);

  // captcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const { signInUser, signInWithGoogle, signInWithGithub, signInWithFacebook } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // email login
  const loginFormHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
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
        });
      });
  };

  //google login
  const googleLoginHandler = () => {
    signInWithGoogle()
      .then((result) => {
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
    <div className=" py-10 max-[450px]:h-svh  bg-gradient-to-r from-pink-400  to-purple-500  p-5">
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Login</title>
        </Helmet>
      </HelmetProvider>

      <div className="mx-auto  bg-white w-full max-w-md p-10 rounded-2xl shadow max-[450px]:p-8 ">
        <h2 className="mb-5  p-3 text-4xl font-bold text-center text-gradient2">
          Login
        </h2>
        <p className="text-sm text-center dark:text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/registration"
            rel="noopener noreferrer"
            className="focus:underline hover:underline text-primary"
          >
            Register here
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <button
            onClick={googleLoginHandler}
            aria-label="Login with Google"
            type="button"
            className="btn bg-[#4588f0] text-white flex items-center justify-center w-full p-4 space-x-4 border rounded-3xl focus:ring-2 focus:ring-offset-1 dark:border-gray-200 focus:dark:ring-violet-100"
          >
            <FaGoogle className="text-xl" />
            <p>Login with Google</p>
          </button>
          <button
            onClick={facebookLoginHandler}
            aria-label="Login with GitHub"
            role="button"
            className="btn  bg-[#3d5b99]  flex items-center justify-center w-full p-4 space-x-4 border rounded-3xl focus:ring-2 focus:ring-offset-1 dark:border-gray-100 focus:dark:ring-violet-100"
          >
            <FaFacebook className="text-white text-xl" />
            <p className="text-white">Login with Facebook</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <form
          noValidate=""
          action=""
          className="space-y-8"
          onSubmit={loginFormHandler}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
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
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
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
            </div>
            <div className="space-y-2">
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
            </div>
          </div>
          <button
            disabled={disabled}
            className="btn w-full  px-8 py-3 font-semibold rounded-3xl dark:bg-indigo-500 hover:bg-indigo-700 dark:text-gray-50"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
