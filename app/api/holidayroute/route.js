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
      port: Number(process.env.EMAIL_PORT || 465),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TravelHooks Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `New Holiday Booking Request - ${packageName}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#F6931F">
            New Holiday Booking Request
          </h2>

          <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td><strong>Name</strong></td>
              <td>${name}</td>
            </tr>

            <tr>
              <td><strong>Email</strong></td>
              <td>${email}</td>
            </tr>

            <tr>
              <td><strong>Package</strong></td>
              <td>${packageName}</td>
            </tr>
          </table>

          <br/>

          <p>
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