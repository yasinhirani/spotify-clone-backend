import axios from "axios";

const getSpotifyAccessToken = async () => {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "client_credentials",
      client_id: "fe25bbed2ffe4b83be86f915af4ed742",
      client_secret: "9eeafb1b036d482bad2ae541e6dab984",
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
