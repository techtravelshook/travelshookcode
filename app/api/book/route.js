import nodemailer from "nodemailer";

export async function POST(req) {
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
  to: process.env.EMAIL_USER,
  replyTo: data.email, 
  subject: `New Booking Request - ${data.hotel || "Custom Package"}`,
      html:`
        <h2>New Booking Request</h2>
        <p><strong>Hotel:</strong> ${data.hotel}</p>
        <p><strong>Room:</strong> ${data.room}</p>
        <p><strong>Package:</strong> ${data.package}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Check-in:</strong> ${data.checkInDate}</p>
        <p><strong>Check-out:</strong> ${data.checkOutDate}</p>
        <p><strong>Guests:</strong> ${data.guests}</p>
        ${data.specialRequests ? `<p><strong>Special Requests:</strong> ${data.specialRequests}</p>` : ''}
      `
    });

    return Response.json({
      success: true,
      message: "Booking request received. We will contact you shortly.",
    });
  } catch (error) {
    console.error("Email Error:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}