import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import lool from "../../../public/4042.json";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <Lottie animationData={lool} loop={true} />

          <p>The Page is {error.statusText || error.message}</p>
          <Link
            to="/"
            className="btn btn-neutral px-8 py-3 font-semibold rounded dark:bg-orange-500 dark:text-gray-50"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ErrorPage;
