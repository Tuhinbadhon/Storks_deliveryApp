import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Replace with your secure axios hook
import ApexCharts from "react-apexcharts";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const [bookingsByDate, setBookingsByDate] = useState([]);
  const [parcelsData, setParcelsData] = useState({ booked: 0, delivered: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const parcelsRes = await axiosSecure.get("/parcels");

        // Filter parcels based on status
        const bookedParcels = parcelsRes.data;
        const deliveredParcels = parcelsRes.data.filter(
          (parcel) => parcel.status.toLowerCase() === "delivered".toLowerCase()
        );

        setParcelsData({
          booked: bookedParcels.length,
          delivered: deliveredParcels.length,
        });

        // Extract booking dates and counts only for booked parcels
        const bookingDates = {};
        bookedParcels.forEach((parcel) => {
          let bookingDate = parcel.bookingDate;
          const [day, month, year] = bookingDate.split("-");
          bookingDate = `${day}-${month}-${year}`;

          // Increment the count for each booking date
          bookingDates[bookingDate] = (bookingDates[bookingDate] || 0) + 1;
        });

        // Convert booking dates object to array of objects
        const bookingsArray = Object.keys(bookingDates).map((date) => ({
          date,
          count: bookingDates[date],
        }));

        setBookingsByDate(bookingsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  const bookingsByDateChartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: bookingsByDate.map((data) => data.date),
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: "Number of Bookings",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        opacityFrom: 0.5,
        opacityTo: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Bookings",
        data: bookingsByDate.map((data) => data.count),
      },
    ],
  };

  const parcelsComparisonChartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: ["Booked", "Delivered"],
    },
    yaxis: [
      {
        title: {
          text: "Number of Parcels",
        },
      },
    ],
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Parcels",
        type: "area",
        data: [parcelsData.booked, parcelsData.delivered],
      },
    ],
  };

  const helmetContext = {};

  return (
    <div className="container mx-auto">
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Dashboard | Statistics</title>
        </Helmet>
      </HelmetProvider>
      <h2 className="text-3xl underline text-center mb-10 font-semibold">
        Statistics
      </h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card shadow-md">
            <div className="card-header">
              <h3>Bookings by Date</h3>
            </div>
            <div className="card-body">
              <ApexCharts
                options={bookingsByDateChartOptions}
                series={bookingsByDateChartOptions.series}
                type="bar"
                height={350}
              />
            </div>
          </div>
          <div className="card shadow-md">
            <div className="card-header">
              <h3>Booked vs. Delivered Parcels</h3>
            </div>
            <div className="card-body">
              <ApexCharts
                options={parcelsComparisonChartOptions}
                series={parcelsComparisonChartOptions.series}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
