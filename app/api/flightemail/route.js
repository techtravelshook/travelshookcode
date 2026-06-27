import { withSecurity } from "@/lib/withSecurity";
import nodemailer from "nodemailer";

 async function FlightEmail(req) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Flight Inquiry",
      html: `

        <h2>Flight Inquiry</h2>
        <h3> ${JSON.stringify(body, null, 2)}<br/></h3>
      

        <p><strong>WhatsApp:</strong> ${body.whatsapp || "N/A"}</p>
        <p><strong>Trip Type:</strong> ${body.tripType || "N/A"}</p>
        <p><strong>From:</strong> ${body.fromAirport || "N/A"}</p>
        <p><strong>To:</strong> ${body.toAirport || "N/A"}</p>
        <p><strong>Departure:</strong> ${body.departDate || "N/A"}</p>
        <p><strong>Return:</strong> ${body.returnDate || "N/A"}</p>
        <p><strong>Cabin:</strong> ${body.cabin || "Economy"}</p>

        <hr>

      
      `,
    });

    return Response.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("MAIL ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
export const POST= withSecurity(FlightEmail)