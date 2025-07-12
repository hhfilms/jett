import {NextRequest, NextResponse} from "next/server";
import {createClient} from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2023-01-01",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN!,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {_id, title, description, imageUrl} = body;

  if (!_id) {
    return NextResponse.json({error: "Missing _id"}, {status: 400});
  }

  try {
    const patch = client.patch(_id).set({
      ...(title && {title}),
      ...(description && {description}),
      ...(imageUrl && {imageUrl}),
    });

    const result = await patch.commit();

    return NextResponse.json({success: true, result});
  } catch (err) {
    console.error(err);
    return NextResponse.json({error: "Failed to patch document"}, {status: 500});
  }
}
