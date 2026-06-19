// app/api/send-email/route.js

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const {
      email,
      tripType,
      fromAirport,
      toAirport,
      departDate,
      returnDate,
      passengers,
      cabin,
    } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // YOU receive the email
      replyTo: email, // Reply goes to customer
      subject: `✈️ New Flight Inquiry: ${fromAirport} → ${toAirport}`,
      html: `
        <h2>New Flight Inquiry</h2>

        <p><strong>Customer Email:</strong> ${email}</p>

        <hr />

        <p><strong>Trip Type:</strong> ${tripType}</p>
        <p><strong>From:</strong> ${fromAirport}</p>
        <p><strong>To:</strong> ${toAirport}</p>
        <p><strong>Departure Date:</strong> ${departDate}</p>
        <p><strong>Return Date:</strong> ${returnDate || "N/A"}</p>

        <hr />

        <p><strong>Adults:</strong> ${passengers?.adults || 0}</p>
        <p><strong>Children:</strong> ${passengers?.children || 0}</p>
        <p><strong>Infants:</strong> ${passengers?.infants || 0}</p>
        <p><strong>Total Passengers:</strong> ${passengers?.total || 0}</p>

        <hr />

        <p><strong>Cabin Class:</strong> ${cabin}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Inquiry sent successfully",
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}