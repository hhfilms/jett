import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body);
    const {name, email, subject, message} = body;

    if (!name || !email || !message || !subject) {
      return NextResponse.json({error: "Missing fields."}, {status: 400});
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.NEXT_PUBLIC_EMAIL_RECEIVER,
      subject: `New Message from ${name} about "${subject}"`,
      text: message,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({error: "Email failed to send."}, {status: 500});
  }
}
