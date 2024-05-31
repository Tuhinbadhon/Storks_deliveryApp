import React, { useState, useEffect } from "react";

import { Helmet, HelmetProvider } from "react-helmet-async";

import { DNA, Radio } from "react-loader-spinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://server-side-puce-alpha.vercel.app/items"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <DNA
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="radio-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>STUDYLAB | Home</title>
        </Helmet>
      </HelmetProvider>
    </div>
  );
};

export default Home;
