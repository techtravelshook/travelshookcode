
import { withSecurity } from "@/lib/withSecurity";
import nodemailer from "nodemailer";

async function ContactForm(req) {
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
      replyTo: data.email, // Reply goes to the customer's email
      subject: `New ${data.formType} Inquiry`,
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>

        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
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

export const POST = withSecurity(ContactForm);