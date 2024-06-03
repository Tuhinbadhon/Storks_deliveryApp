import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Registration.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const Registration = () => {
  const [registerError, setRegisterError] = useState("");
  const [showPass, setShowpass] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [disabled, setDisabled] = useState(true);

  const authInfo = useContext(AuthContext);
  const { createUser } = authInfo;

  const helmetContext = {};
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

  const registerFormHandler = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading indicator

    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(password)) {
      const errorMessage =
        "Password must have at least one uppercase letter, one lowercase letter and one number and it must be minimum 6 characters";
      setRegisterError(errorMessage);
      Swal.fire({
        text: errorMessage,
        icon: "error",
      });
      setIsLoading(false); // Hide loading indicator
      return;
    }

    createUser(email, password)
      .then((result) => {
        Swal.fire({
          text: "Successfully Registered",
          icon: "success",
        });
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {})
          .catch((error) => {
            Swal.fire({
              text: error.message,
              icon: "error",
            });
          });

        e.target.reset();
        setShowpass(false);
        setShowButton(true);
        setIsLoading(false); // Hide loading indicator
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
        setIsLoading(false); // Hide loading indicator
      });
  };

  return (
    <div>
      <div className="my-10 p-4 ">
        <HelmetProvider context={helmetContext}>
          <Helmet>
            <title>Registration</title>
          </Helmet>
        </HelmetProvider>
        <div className="mx-auto w-full max-w-md p-4 rounded-xl shadow sm:p-8 bg-gradient-to-r from-blue-200 to-pink-100 ">
          <h2 className="mb-3 text-3xl font-semibold text-center text-gradient">
            Register NOW!
          </h2>

          <p className="text-sm text-center dark:text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              rel="noopener noreferrer"
              className="focus:underline hover:underline text-primary"
            >
              Login here
            </Link>
          </p>

          <form
            noValidate=""
            action=""
            className="space-y-8"
            onSubmit={registerFormHandler}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="text" className="block text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="text" className="block text-sm">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="http://www......"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="username@gmail.com"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
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
                <label className="label ">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="Type the captcha here "
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                onClick={() => setShowButton(!showButton)}
                required
              />
              <p>
                I accept all the{" "}
                <a href="">
                  <u>Terms & Conditions</u>
                </a>{" "}
              </p>
            </div>

            <button
              className="btn w-full  px-8 py-3 
                        font-semibold rounded-md dark:bg-pink-600 hover:bg-pink-800 dark:text-gray-50"
              disabled={disabled}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
