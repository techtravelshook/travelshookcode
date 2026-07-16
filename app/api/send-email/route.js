import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const {
      name,
      email,
      phone,
      message,
      packageName,
      packagePrice,
    } = await request.json();

    // Basic validation
    if (!name || !phone || !packageName) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Travel Hooks" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
      ...(email && { replyTo: email }),
      subject: `New Holiday Package Inquiry - ${packageName}`,
      html: `
      <div style="max-width:700px;margin:30px auto;font-family:Arial,Helvetica,sans-serif;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 6px 16px rgba(0,0,0,.08);">

        <!-- Header -->
        <div style="background:linear-gradient(90deg,#0070A1,#F6931F);padding:24px;">
          <h2 style="margin:0;color:#fff;">
            New Holiday Package Inquiry
          </h2>
          <p style="margin-top:8px;color:#f3f4f6;">
            A customer has submitted a holiday package inquiry.
          </p>
        </div>

        <!-- Customer Details -->
        <div style="padding:25px;">

          <table style="width:100%;border-collapse:collapse;font-size:15px;">
            <tr>
              <td style="padding:12px;font-weight:bold;border-bottom:1px solid #eee;width:180px;">
                Package
              </td>
              <td style="padding:12px;border-bottom:1px solid #eee;">
                ${packageName || "N/A"}
              </td>
            </tr>

            <tr>
              <td style="padding:12px;font-weight:bold;border-bottom:1px solid #eee;">
                Package Price
              </td>
              <td style="padding:12px;border-bottom:1px solid #eee;">
                ${packagePrice || "N/A"}
              </td>
            </tr>

            <tr>
              <td style="padding:12px;font-weight:bold;border-bottom:1px solid #eee;">
                Customer Name
              </td>
              <td style="padding:12px;border-bottom:1px solid #eee;">
                ${name}
              </td>
            </tr>

            <tr>
              <td style="padding:12px;font-weight:bold;border-bottom:1px solid #eee;">
                Email
              </td>
              <td style="padding:12px;border-bottom:1px solid #eee;">
                ${email || "Not Provided"}
              </td>
            </tr>

            <tr>
              <td style="padding:12px;font-weight:bold;border-bottom:1px solid #eee;">
                Phone
              </td>
              <td style="padding:12px;border-bottom:1px solid #eee;">
                ${phone}
              </td>
            </tr>
          </table>

          <h3 style="margin-top:30px;color:#0070A1;">
            Customer Message
          </h3>

          <div style="background:#f8fafc;padding:18px;border-left:5px solid #F6931F;border-radius:6px;line-height:1.6;">
            ${message || "No additional message provided."}
          </div>

          <div style="margin-top:30px;padding:16px;background:#eef7fb;border-left:4px solid #0070A1;border-radius:6px;">
            <strong>Next Step</strong><br>
            ${
              email
                ? "Click <strong>Reply</strong> to respond directly to the customer's email."
                : "Customer email was not provided. Please contact them using the phone number."
            }
          </div>

        </div>

        <!-- Footer -->
        <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px;text-align:center;font-size:13px;color:#6b7280;">
          This inquiry was submitted through the <strong>Travel Hooks</strong> website.
        </div>

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully.",
    });
  } catch (error) {
    console.error("Holiday Inquiry Mail Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send inquiry.",
      },
      {
        status: 500,
      }
    );
  }
}