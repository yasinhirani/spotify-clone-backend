import axios from "axios";

const getSpotifyAccessToken = async () => {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "client_credentials",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.data.access_token;
};

export default getSpotifyAccessToken;
