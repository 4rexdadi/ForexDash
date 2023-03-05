import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://forexdashsever.onrender.com/api/",
});
