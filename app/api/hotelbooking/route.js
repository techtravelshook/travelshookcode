import { withSecurity } from "@/lib/withSecurity";
import nodemailer from "nodemailer";

async function hotelBookingHandler(req) {
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
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      replyTo: data.email,
      subject: `New Hotel Booking Request - ${data.hotelName || "Hotel Booking"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;border:1px solid #e5e5e5;border-radius:8px;padding:20px;">

          <h2 style="color:#0070A1;margin-top:0;">
            New Hotel Booking Request
          </h2>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Hotel</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${data.hotelName || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Check-in</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${data.checkIn || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Check-out</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${data.checkOut || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Guests</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${data.guests || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Name</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${data.name || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Email</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${data.email || "N/A"}</td>
            </tr>

            <tr>
              <td style="padding:8px;border-bottom:1px solid #eee;"><strong>Phone</strong></td>
              <td style="padding:8px;border-bottom:1px solid #eee;">${data.phone || "N/A"}</td>
            </tr>
          </table>

        </div>
      `,
    });

    return Response.json({
      success: true,
      message: "Booking request received. We will contact you shortly.",
    });
  } catch (error) {
    console.error("Hotel Booking Mail Error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}

export const POST = withSecurity(hotelBookingHandler);