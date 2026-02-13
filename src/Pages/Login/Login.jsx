import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaTwitter } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/AuthProvider";
import "./Login.css";

import { Helmet, HelmetProvider } from "react-helmet-async";
import Swal from "sweetalert2";
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen py-12 bg-gradient-to-b from-indigo-50 via-white to-gray-50 flex items-center"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-40 -top-20 w-96 h-96 bg-indigo-100 rounded-full opacity-40 blur-3xl transform rotate-45"></div>
        <div className="absolute -left-32 -bottom-20 w-80 h-80 bg-orange-100 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <HelmetProvider context={helmetContext}>
            <Helmet>
              <title>STORKS | Login</title>
            </Helmet>
          </HelmetProvider>

          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h2 className="text-3xl font-bold">Welcome back</h2>
              <p className="mt-2 text-sm text-gray-500">
                Login to your account to continue.
              </p>
            </motion.div>

            <motion.form
              onSubmit={loginFormHandler}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@company.com"
                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/60 focus:ring-2 focus:ring-indigo-300 outline-none pr-10"
                    required
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowpass(!showPass)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="mt-2 flex justify-end text-sm">
                  <a href="#" className="text-indigo-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl shadow-md transition">
                Sign in
              </button>
            </motion.form>

            <div className="mt-6 text-center text-sm text-gray-400">
              Or continue with
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={googleLoginHandler}
                className="flex-1 py-2 rounded-2xl border border-gray-200 bg-white hover:shadow-sm flex items-center justify-center gap-3"
              >
                <FaGoogle className="text-red-500" /> <span>Google</span>
              </button>
              <button
                onClick={twitterHandler}
                className="flex-1 py-2 rounded-2xl border border-gray-200 bg-white hover:shadow-sm flex items-center justify-center gap-3"
              >
                <FaTwitter className="text-sky-500" /> <span>Twitter</span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/registration"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Create one
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
                Fast. Reliable. Tracked.
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Create shipments, track in real time and get delivery
                confirmations — all in one place.
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

export default Login;
