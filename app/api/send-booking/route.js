import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const passportNumber = formData.get("passportNumber");
    const dateOfBirth = formData.get("dateOfBirth");

    const departureCode = formData.get("departureCode");
    const destinationCode = formData.get("destinationCode");
    const departureCity = formData.get("departureCity");
    const destinationCity = formData.get("destinationCity");
    const airlineName = formData.get("airlineName");
    const price = formData.get("price");
    const dates = formData.get("dates");

    const passportImage = formData.get("passportImage");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking Request: ${departureCity} to ${destinationCity}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Passport Number:</strong> ${passportNumber}</p>
        <p><strong>Date of Birth:</strong> ${dateOfBirth}</p>
        <hr>
        <p><strong>Route:</strong> ${departureCity} (${departureCode}) → ${destinationCity} (${destinationCode})</p>
        <p><strong>Airline:</strong> ${airlineName}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Dates:</strong> ${dates}</p>
      `,
      attachments: [],
    };

    if (passportImage && passportImage.size > 0) {
      const buffer = Buffer.from(await passportImage.arrayBuffer());
      mailOptions.attachments.push({
        filename: passportImage.name,
        content: buffer,
      });
    }

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}