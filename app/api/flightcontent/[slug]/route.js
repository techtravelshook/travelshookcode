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
// POST - Create new country content
export async function POST(request) {
  try {
    const body = await request.json();

    // Check if slug already exists
    const existing = await prisma.countryContent.findUnique({
      where: { slug: body.slug.toLowerCase() }
    });

    if (existing) {
      return NextResponse.json(
        { error: `Content with slug "${body.slug}" already exists` },
        { status: 409 }
      );
    }

    const content = await prisma.countryContent.create({
      data: {
        slug: body.slug.toLowerCase(),
        apiType: body.apiType.toLowerCase(),
        section1Title: body.section1Title,
        section1img: body.section1img,
        section1Content: body.section1Content,
        section2Title: body.section2Title,
        section2img: body.section2img,
        section2Content: body.section2Content,
        faqs: body.faqs, // stored as JSON
      },
    });

    return NextResponse.json({ success: true, data: content }, { status: 201 });

  } catch (error) {
    console.error('Create error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Update country content by slug
export async function PUT(request, { params }) {
  try {
    const { slug } = await params;
    const body = await request.json();

    // Check if content exists first
    const existing = await prisma.countryContent.findUnique({
      where: { slug: slug.toLowerCase() }
    });

    if (!existing) {
      return NextResponse.json(
        { error: `Content not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    const content = await prisma.countryContent.update({
      where: { slug: slug.toLowerCase() },
      data: {
        // only update slug if explicitly provided
        ...(body.slug && { slug: body.slug.toLowerCase() }),
        ...(body.apiType && { apiType: body.apiType.toLowerCase() }),
        ...(body.section1Title && { section1Title: body.section1Title }),
        ...(body.section1img && { section1img: body.section1img }),
        ...(body.section1Content && { section1Content: body.section1Content }),
        ...(body.section2Title && { section2Title: body.section2Title }),
        ...(body.section2img && { section2img: body.section2img }),
        ...(body.section2Content && { section2Content: body.section2Content }),
        ...(body.faqs && { faqs: body.faqs }),
      },
    });

    return NextResponse.json({ success: true, data: content }, { status: 200 });

  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE - Delete country content by slug
export async function DELETE(request, { params }) {
  try {
    const { slug } = await params;

    // Check if content exists first
    const existing = await prisma.countryContent.findUnique({
      where: { slug: slug.toLowerCase() }
    });

    if (!existing) {
      return NextResponse.json(
        { error: `Content not found for slug: ${slug}` },
        { status: 404 }
      );
    }

    await prisma.countryContent.delete({
      where: { slug: slug.toLowerCase() }
    });

    return NextResponse.json(
      { success: true, message: `Content for "${slug}" deleted successfully` },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}