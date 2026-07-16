import { withSecurity } from "@/lib/withSecurity";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function Honeymoon(request) {
  try {
    const {
      name,
      phone,
      email,
      message,
      packageTitle,
    } = await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
    from: `"${name || "Customer"} via Travel Hooks" <${process.env.EMAIL_USER}>`,
to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
replyTo: email || process.env.EMAIL_USER,
      subject: `New Honeymoon Inquiry - ${packageTitle}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #e5e5e5;border-radius:8px;padding:20px;">
          
          <h2 style="color:#0070A1;margin-top:0;">
            New Honeymoon Inquiry
          </h2>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Package</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${packageTitle || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Name</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${name || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Email</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${email || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Phone</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${phone || "N/A"}</td>
            </tr>
          </table>

          <h3 style="margin-top:25px;">Customer Message</h3>

          <div style="background:#f8f8f8;padding:15px;border-left:4px solid #F6931F;border-radius:4px;">
            ${message || "No message provided."}
          </div>

        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Mail Transmission Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export const POST = withSecurity(Honeymoon);