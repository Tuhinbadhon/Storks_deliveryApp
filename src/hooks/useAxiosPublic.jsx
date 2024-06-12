import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://server-side-puce-alpha.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
