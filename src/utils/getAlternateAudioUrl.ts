import axios from "axios";

export async function getAlternateAudioUrl(songName: string, artist: string) {
  const query = encodeURIComponent(`${songName} ${artist} official audio`);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.YOUTUBE_API_KEY}&maxResults=1&type=video`;

  const response = await axios.get(url);
  if (response.data.items.length === 0) return null;

  const youtubeVideoUrl = `https://www.youtube.com/watch?v=${response.data.items[0].id.videoId}`;

  return youtubeVideoUrl;
}
