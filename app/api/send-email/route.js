import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, phone, message, packageName, packagePrice } = await request.json();
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "://gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "465"),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your secure App Password
      },
    });

    const mailOptions = {
      from: `"TravelHooks Platform" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // Who receives the inquiry
      subject: `New Holiday Package Inquiry: ${packageName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #0070A1;">New Booking Inquiry</h2>
          <p><strong>Package:</strong> ${packageName} (${packagePrice})</p>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Phone Number:</strong> ${phone}</p>
          <p><strong>Custom Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #F6931F;">${message}</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email dispatched successfully" }, { status: 200 });
  } catch (error) {
    console.error("Mail Transmission Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
