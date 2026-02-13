import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaShippingFast, FaUserTie } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { RxRocket } from "react-icons/rx";
import { TbWorldCheck } from "react-icons/tb";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Features = () => {
  const [parcels, setParcels] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const parcelsResponse = await axiosSecure.get("/parcels");
        const usersResponse = await axiosSecure.get("/users");

        setParcels(parcelsResponse.data);
        setUsers(usersResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalParcelsBooked = parcels.length;
  const totalParcelsDelivered = parcels.filter(
    (parcel) => parcel.status.toLowerCase() === "delivered".toLowerCase(),
  ).length;

  const totalUsers = users.length;

  if (isLoading) return <div></div>;

  if (error) return <div>Error loading parcels or users: {error}</div>;

  return (
    <div className="lg:mx-24 mx-5">
      <div className="text-center mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl uppercase  mb-10 lg:text-3xl font-bold text-center relative pb-2"
        >
          Features
          <span className="custom-border absolute left-1/2 transform -translate-x-1/2 bottom-0 lg:w-64  w-52"></span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="md:text-lg text-base mt-3 mx-5"
        >
          We're leading{" "}
          <span className="font-bold text-orange-500">Parcel Service</span> in
          the world
        </motion.p>
      </div>

      {/*features cards  */}

      <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card p-5 lg:card-side bg-base-100 shadow-xl"
        >
          <div className="p-4 justify-center items-center flex">
            <RxRocket className="w-20 text-gray-300 h-20" />
          </div>
          <div className="flex flex-col max-[450px]:mt-3 justify-center">
            <h2 className="text-lg font-bold uppercase mb-2">
              Super Fast Delivery
            </h2>
            <p className="text-sm">
              Speedy parcel delivery is our specialty, ensuring your packages
              arrive swiftly and securely.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="card p-5 lg:card-side bg-base-100 shadow-xl"
        >
          <div className="p-4 justify-center items-center flex">
            <MdOutlineSecurity className="w-20 text-gray-300 h-20" />
          </div>
          <div className="flex flex-col max-[450px]:mt-3 justify-center">
            <h2 className="text-lg font-bold uppercase mb-2">Secure Service</h2>
            <p className="text-sm">
              Experience our secure parcel delivery service, providing peace of
              mind as your packages are swiftly and safely transported to their
              destination
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="card p-5 lg:card-side bg-base-100 shadow-xl"
        >
          <div className="p-4 justify-center items-center flex">
            <FaShippingFast className="w-20 text-gray-300 h-20" />
          </div>
          <div className="flex flex-col max-[450px]:mt-3 justify-center">
            <h2 className="text-lg font-bold uppercase mb-2">
              Worldwide Shipping
            </h2>
            <p className="text-sm">
              Explore global possibilities with our world-class shipping
              service, delivering your parcels swiftly and securely to
              destinations across the globe.
            </p>
          </div>
        </motion.div>
      </div>

      {/* statistic cards */}
      <div className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="p-2 bg-gray-800 shadow-xl rounded-lg "
          >
            <div className="p-2 justify-center items-center flex">
              <TbWorldCheck className="w-10 text-gray-300 h-10" />
            </div>
            <div className="flex flex-col max-[450px]:mt-3 justify-center items-center">
              <h2 className="text-3xl text-orange-500 font-bold uppercase mb-2">
                <CountUp
                  start={-875.039}
                  end={totalParcelsBooked}
                  enableScrollSpy
                />
              </h2>
              <p className="text-lg text-white">Parcel Booked</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="p-2 bg-gray-800 shadow-xl rounded-lg"
          >
            <div className="p-2 justify-center items-center flex">
              <CiDeliveryTruck className="w-10 text-gray-300 h-10" />
            </div>
            <div className="flex flex-col max-[450px]:mt-3 justify-center items-center">
              <h2 className="text-3xl text-orange-500 font-bold uppercase mb-2">
                <CountUp
                  start={-875.039}
                  end={totalParcelsDelivered}
                  enableScrollSpy
                />
              </h2>
              <p className="text-lg text-white">Parcel Delivered</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="p-2 bg-gray-800 shadow-xl rounded-lg"
          >
            <div className="p-2 justify-center items-center flex">
              <FaUserTie className="w-10 text-gray-300 h-10" />
            </div>
            <div className="flex flex-col max-[450px]:mt-3 justify-center items-center">
              <h2 className="text-3xl text-orange-500 font-bold uppercase mb-2">
                <CountUp start={-875.039} end={totalUsers} enableScrollSpy />
              </h2>
              <p className="text-lg text-white">Total Users</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
