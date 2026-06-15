import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// FIXED: Added the context object containing params as the second argument here
export async function GET(request, { params }) {
  try {
    // Extract and await the dynamic slug parameter out of the route path
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' }, 
        { status: 400 }
      );
    }

    const content = await prisma.countryContent.findUnique({
      where: {
        slug: slug.toLowerCase()
      }
    });

    if (!content) {
      return NextResponse.json(
        { error: `Content not found for slug: ${slug}` }, 
        { status: 404 }
      );
    }

    return NextResponse.json(content, { status: 200 });

  } catch (error) {
    console.error('Database fetch error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
