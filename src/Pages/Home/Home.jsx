import React, { useState, useEffect } from "react";

import { Helmet, HelmetProvider } from "react-helmet-async";

import { DNA, Radio } from "react-loader-spinner";
import Banner from "./Banner";
import Features from "./Features";
import TopDeliveryMan from "./TopDeliveryMan";
import FAQ from "./FAQ";
import Loader from "../../Components/Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://storks-assignment12.vercel.app");
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
        <Loader />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>STORKS | Home</title>
        </Helmet>
      </HelmetProvider>
      <Banner />
      <Features />
      <TopDeliveryMan />
      <FAQ />
    </div>
  );
};

export default Home;
