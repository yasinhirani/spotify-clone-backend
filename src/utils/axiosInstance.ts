import axios from "axios";
import SpotifyAccessToken from "./spotifyAccessToken";
import getSpotifyAccessToken from "./getSpotifyAccessToken";

const axiosInstance = axios.create({
  baseURL: "https://api.spotify.com",
});

const spotifyToken = new SpotifyAccessToken();

axiosInstance.interceptors.request.use(async (req) => {
  let token = spotifyToken.getToken();
  if (!token) {
    token = await getSpotifyAccessToken();
    spotifyToken.setToken(token);
  }
  req.headers.Authorization = `Bearer ${spotifyToken.getToken()}`;
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      const token = await getSpotifyAccessToken();
      spotifyToken.setToken(token);
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
