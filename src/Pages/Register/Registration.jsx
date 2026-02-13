import { updateProfile } from "firebase/auth";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import "./Registration.css";

const Registration = () => {
  const axiosPublic = useAxiosPublic();
  const [registerError, setRegisterError] = useState("");
  const [showPass, setShowpass] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
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
    const role = e.target.role.value;
    const phoneNumber = e.target.phoneNumber.value;

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

    createUser(email, password, role)
      .then((result) => {
        Swal.fire({
          text: "Successfully Registered",
          icon: "success",
        });
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            const userinfo = { name, email, role, phoneNumber };
            axiosPublic.post("/users", userinfo).then((res) => {
              if (res.data.insertedID) {
                console.log("User added to the database");
                e.target.reset();
                setShowpass(false);
                Swal.fire({
                  text: "Successfully Registered",
                  icon: "success",
                });
              }
              setIsLoading(false);
            });
          })
          .catch((error) => {
            Swal.fire({
              text: error.message,
              icon: "error",
            });
            setIsLoading(false);
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
        }).then(() => {
          setIsLoading(false); // Hide loading indicator
          window.location.reload(); // Refresh the page on error
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen py-12 bg-gradient-to-b from-indigo-50 via-white to-pink-50 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-40 -top-20 w-96 h-96 bg-indigo-100 rounded-full opacity-30 blur-3xl transform rotate-45"></div>
        <div className="absolute -left-32 -bottom-20 w-80 h-80 bg-pink-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold">Create your account</h2>
            <p className="mt-2 text-sm text-gray-500">
              Join Storks — fast parcel booking and reliable delivery tracking.
            </p>

            <form onSubmit={registerFormHandler} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <input
                    name="name"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    name="phoneNumber"
                    required
                    className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
                    placeholder="01xxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
                  placeholder="you@company.com"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  required
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowpass(!showPass)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo URL (optional)
                </label>
                <input
                  name="photoURL"
                  className="mt-1 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User type
                </label>
                <select
                  name="role"
                  required
                  className="mt-1 block w-40 px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
                >
                  <option value="user">User</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Captcha
                </label>
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <LoadCanvasTemplate />
                  </div>
                  <input
                    onBlur={handleValidateCaptcha}
                    name="captcha"
                    placeholder="Enter captcha"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
                    required
                  />
                </div>
              </div>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  onClick={() => setShowButton(!showButton)}
                  required
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-semibold">
                  I accept the <u>Terms &amp; Conditions</u>
                </span>
              </label>

              <button
                type="submit"
                disabled={disabled || isLoading}
                className="w-full py-3 bg-indigo-600 disabled:opacity-50 text-white rounded-2xl font-semibold shadow-md"
              >
                {isLoading ? "Creating..." : "Create account"}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-500">
              Already registered?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold">
                Sign in
              </Link>
            </p>
          </div>

          <div className="hidden md:flex items-center justify-center bg-gradient-to-tr from-indigo-50 to-white p-8">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center px-4"
            >
              <h3 className="text-2xl font-bold mb-2">
                Get started with Storks
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Fast pickups, secure deliveries and real-time tracking — sign up
                and start sending.
              </p>
              <div className="inline-flex bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow">
                Book a Parcel
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Registration;
