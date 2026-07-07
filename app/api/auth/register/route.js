import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { email, password, fullname } = await request.json(); // Changed name to fullname

    // 1. Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 }
      );
    }

    // 3. Create user in MySQL mapping to the 'fullname' column
    const newUser = await prisma.user.create({
      data: {
        email,
        password, 
        fullname, // Changed from name to fullname to match your DB
      },
    });

    return NextResponse.json(
      { message: 'User registered successfully', userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    // This will print the exact Prisma error in your terminal if it fails again
    console.error("Registration Error:", error); 
    return NextResponse.json(
      { error: 'Something went wrong during registration.' },
      { status: 500 }
    );
  }
}
