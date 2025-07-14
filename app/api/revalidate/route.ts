// app/api/revalidate/route.ts
import {NextRequest} from "next/server";
import {revalidatePath} from "next/cache";

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  const path = req.nextUrl.searchParams.get("route");

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET || !path) {
    return new Response("Unauthorized", {status: 401});
  }

  try {
    // Sanitize path (make sure it starts with /)
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Trigger revalidation
    revalidatePath(cleanPath);
    return new Response(`Revalidated path: ${cleanPath}`, {status: 200});
  } catch (err) {
    console.info("🚀 ~ GET ~ err >>> ", err);
    return new Response("Error revalidating", {status: 500});
  }
}
