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
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: `New ${data.formType} Inquiry`,
      html: `
        <h2>New Inquiry Received</h2>

        <p className='text-4xl'><strong>Form Type:</strong> ${data.formType}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Destination:</strong> ${data.destination}</p>
        <p><strong>Days:</strong> ${data.days}</p>
        <p><strong>Current Location:</strong> ${data.currentLocation}</p>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Rooms:</strong> ${data.rooms}</p>
        <p><strong>Travellers:</strong> ${data.travellers}</p>
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