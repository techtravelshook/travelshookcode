import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 }
      );
    }
    // Find admin
    const admin = await prisma.admin.findUnique({
      where: {
        emails: email,
      },
    });
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }
    // Check account status
    if (!admin.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Your account has been disabled.",
        },
        { status: 403 }
      );
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 }
      );
    }
    // Generate JWT
    const token = generateToken(admin);
    // Response
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      admin: {
        id: admin.id,
        name: admin.name,
        emails: admin.emails,
        role: admin.role,
      },
    });
    // Store JWT in HttpOnly Cookie
    response.cookies.set({
      name: "admin-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 1, 
    });
    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}