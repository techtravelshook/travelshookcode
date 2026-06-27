import { withSecurity } from "@/lib/withSecurity";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

 async function RamdanPackage(request) {
  try {
    const {
      name,
      email,
      packageName,
    } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TravelHooks" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      subject: `New Ramadan Package Inquiry - ${packageName}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2 style="color:#F6931F">
            New Ramadan Package Inquiry
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
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send inquiry.",
      },
      {
        status: 500,
      }
    );
  }
}
export const POST=withSecurity(RamdanPackage)