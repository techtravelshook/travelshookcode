import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password.' },
        { status: 400 }
      );
    }

    // 2. Find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 3. Verify plain text password
    if (user.password !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 4. Return success response (Changed user.name to user.fullname)
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname, 
      },
    });
  } catch (error) {
    console.error("Login Error:", error); // Added to log any database issues to your terminal
    return NextResponse.json(
      { error: 'Something went wrong during login.' },
      { status: 500 }
    );
  }
}
