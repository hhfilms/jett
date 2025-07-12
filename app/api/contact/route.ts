import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {name, email, subject, message, phone} = body;

    if (!name || !email || !message || !subject || !phone) {
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
  <div style="background-color: #f0f4f8; padding: 40px 0;">
    <style>
      @font-face {
        font-family: 'Mukta';
        font-style: normal;
        font-weight: 400;
        src: url('https://fonts.gstatic.com/s/mukta/v13/iJWHBXyXfDDVXbEOjGbd9VZbfGk.woff2') format('woff2');
      }
    </style>
    <div style="font-family: 'Mukta', Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <h2 style="color: #2c3e50; text-align: center; margin-bottom: 24px;">📩 ${subject}</h2>
      <table style="width: 100%; font-size: 16px; color: #333;">
        <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td style="padding: 16px 0;" colspan="2"><strong>Message:</strong></td></tr>
      </table>
      <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #3f69b3; font-size: 15px; color: #444; white-space: pre-line; border-radius: 5px;">
        ${message}
      </div>
    </div>
    <p style="text-align: center; color: #999; font-size: 13px; margin-top: 20px;">
      This email was generated from your website contact form.
    </p>
  </div>
`,
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({error: "Email failed to send."}, {status: 500});
  }
}
