import axios from "axios";
const axiosSecure = axios.create({
  baseURL: "",
});
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
