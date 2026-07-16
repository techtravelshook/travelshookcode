import { withSecurity } from "@/lib/withSecurity";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function RamdanPackage(request) {
  try {
    const { name, email, packageName } = await request.json();

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
      replyTo: email,
      subject: `New Ramadan Package Inquiry - ${packageName || "Ramadan Package"}`,
      html: `
        <div style="max-width:650px;margin:30px auto;font-family:Arial,Helvetica,sans-serif;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <div style="background:linear-gradient(90deg,#0070A1,#F6931F);padding:20px;">
            <h2 style="margin:0;color:#fff;">
              🌙 New Ramadan Package Inquiry
            </h2>
            <p style="margin:8px 0 0;color:#f8f8f8;font-size:14px;">
              A customer has requested information about a Ramadan package.
            </p>
          </div>

          <!-- Body -->
          <div style="padding:25px;">

            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;width:180px;">
                  Customer Name
                </td>
                <td style="padding:12px;border-bottom:1px solid #eee;">
                  ${name || "N/A"}
                </td>
              </tr>

              <tr>
                <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">
                  Email Address
                </td>
                <td style="padding:12px;border-bottom:1px solid #eee;">
                  ${email || "N/A"}
                </td>
              </tr>

              <tr>
                <td style="padding:12px;border-bottom:1px solid #eee;font-weight:bold;">
                  Selected Package
                </td>
                <td style="padding:12px;border-bottom:1px solid #eee;">
                  ${packageName || "N/A"}
                </td>
              </tr>
            </table>

            <div style="margin-top:25px;padding:15px;background:#f8fafc;border-left:4px solid #F6931F;border-radius:6px;">
              <strong>Next Step:</strong><br>
              Click <strong>Reply</strong> in your email client to respond directly to the customer's email address.
            </div>

          </div>

          <!-- Footer -->
          <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:15px;text-align:center;color:#6b7280;font-size:13px;">
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
    console.error("Ramadan Inquiry Mail Error:", error);

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

export const POST = withSecurity(RamdanPackage);