import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://storks-assignment12.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
