import { withSecurity } from "@/lib/withSecurity";
import nodemailer from "nodemailer";

async function FormInquiry(req) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Travel Hooks" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: data.email,
      subject: `New ${data.formType} Inquiry`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
          <h2 style="color:#0070A1;">New Inquiry Received</h2>

          <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;width:100%;">
            <tr>
              <td><strong>Form Type</strong></td>
              <td>${data.formType || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Name</strong></td>
              <td>${data.name || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>${data.email || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Phone</strong></td>
              <td>${data.phone || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Destination</strong></td>
              <td>${data.destination || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Days</strong></td>
              <td>${data.days || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Current Location</strong></td>
              <td>${data.currentLocation || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Category</strong></td>
              <td>${data.category || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Rooms</strong></td>
              <td>${data.rooms || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Travellers</strong></td>
              <td>${data.travellers || "N/A"}</td>
            </tr>
          </table>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}

export const POST = withSecurity(FormInquiry);