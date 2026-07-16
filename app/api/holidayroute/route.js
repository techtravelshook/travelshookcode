import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, packageName } = await request.json();

    if (!name || !email || !packageName) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Travel Hooks" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Holiday Booking Request - ${packageName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e5e5e5;border-radius:8px;padding:20px;">
          
          <h2 style="margin-top:0;color:#0070A1;">
            New Holiday Booking Request
          </h2>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Name</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${name}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Email</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${email}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Holiday Package</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${packageName}</td>
            </tr>
          </table>

          <p style="margin-top:20px;">
            A customer has requested information about this holiday package.
          </p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your booking request has been sent successfully.",
    });
  } catch (error) {
    console.error("Holiday Mail Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send email.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}