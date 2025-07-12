import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const {searchParams} = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({error: "Missing URL"}, {status: 400});
  }

  try {
    const {data} = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
    const {title, description, image} = data.data;

    const fallbackImage = `https://placehold.co/800/png?text=Article+Image+Not+Available&font=roboto`;

    interface ImageData {
      url?: string;
      size?: number;
      height?: number;
      width?: number;
    }

    const isValidImage = (img: ImageData) => {
      if (!img?.url) return false;
      const src = img.url;
      if (src.startsWith("data:image")) return false;
      if (src.includes("1x1") || src.includes("pixel") || src.includes("transparent")) return false;
      if (img.size && img.size < 2000) return false; // 2KB minimum size
      if (img.height === 1 && img.width === 1) return false;
      return true;
    };

    const safeImage = isValidImage(image) ? image.url : fallbackImage;

    return NextResponse.json({
      title: title || "No title found",
      description: description || "",
      image: safeImage,
    });
  } catch (err) {
    console.error("Error fetching metadata >>> ", err);
    return NextResponse.json({error: "Failed to scrape URL"}, {status: 500});
  }
}
