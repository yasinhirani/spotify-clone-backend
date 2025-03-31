import axios from "axios";

export async function getAlternateAudioUrl(songName: string, artist: string) {
  const query = encodeURIComponent(`${songName} ${artist} official audio`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&maxResults=1&type=video`;

  const response = await axios.get(url);
  if (response.data.items.length === 0) return null;

  const alternateUrl = await axios.get(
    `https://youtube-mp36.p.rapidapi.com/dl?id=${response.data.items[0].id.videoId}`,
    {
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_HOST,
      },
    }
  );

  return alternateUrl.data.link;
}
