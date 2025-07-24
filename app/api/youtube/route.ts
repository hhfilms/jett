import axios from "axios";

type Video = {
  id: string;
  title: string;
  tags: string[];
};

let cachedData: Video[] | null = null;
let cacheTime: number | null = null;

export async function GET() {
  const YT_API_KEY = process.env.NEXT_PUBLIC_YT_API_KEY;
  const UPLOADS_PLAYLIST_ID = process.env.NEXT_PUBLIC_UPLOADS_PLAYLIST_ID;
  const cacheDuration = 60 * 60 * 1000; // 1 hour

  if (cachedData && cacheTime && Date.now() - cacheTime < cacheDuration) {
    return new Response(JSON.stringify(cachedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
      },
    });
  }

  try {
    const playlistResponse = await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems", {
      params: {
        part: "snippet",
        maxResults: 15,
        playlistId: UPLOADS_PLAYLIST_ID,
        key: YT_API_KEY,
      },
    });

    if (playlistResponse.status !== 200) {
      console.error("YouTube playlistItems response:", playlistResponse.data);
      throw new Error(`Error fetching playlist data: ${playlistResponse.statusText}`);
    }

    const playlistItems: { snippet: { resourceId: { videoId: string } } }[] = playlistResponse.data.items;
    const videoIds = playlistItems.map((item) => item.snippet.resourceId.videoId);

    const videoResponse = await axios.get("https://youtube.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet",
        id: videoIds.join(","),
        key: YT_API_KEY,
      },
    });

    if (videoResponse.status !== 200) {
      console.error("YouTube videos response:", videoResponse.data);
      throw new Error(`Error fetching video details: ${videoResponse.statusText}`);
    }

    const videosWithTags: Video[] = videoResponse.data.items.map(
      (video: { id: string; snippet: { title: string; tags?: string[] } }) => ({
        id: video.id,
        title: video.snippet.title,
        tags: video.snippet.tags || [],
      })
    );

    cachedData = videosWithTags;
    cacheTime = Date.now();

    if (!playlistItems.length) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
        },
      });
    }

    return new Response(JSON.stringify(videosWithTags), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=59",
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
