import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")        // Remove special characters
    .replace(/[\s_-]+/g, "-")        // Replace spaces and underscores with hyphen
    .replace(/^-+|-+$/g, "");        // Remove leading/trailing hyphens
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      title,
      slug: inputSlug,
      excerpt,
      content,
      coverImage,
      category,
      author,
      published,
      faqs = [],
      images = [],
      tags = [],
    } = body;

    // Generate slug automatically if not provided
    let slug = inputSlug?.trim();
    if (!slug) {
      if (!title) {
        return NextResponse.json(
          { message: "Title is required to generate slug." },
          { status: 400 }
        );
      }
      slug = generateSlug(title);
    }

    // Basic validation
    if (
      !title ||
      !excerpt ||
      !content ||
      !coverImage ||
      !category ||
      !author
    ) {
      return NextResponse.json(
        { message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    // Check if slug already exists
    let finalSlug = slug;
    let counter = 1;

    while (true) {
      const existingBlog = await prisma.blog.findUnique({
        where: { slug: finalSlug },
      });

      if (!existingBlog) break;

      // Append number if slug exists (e.g., my-title-1, my-title-2)
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImage: coverImage.startsWith("/")
      ? coverImage
      : `/${coverImage}`,
        category,
        author,
        published,
        publishedAt: published ? new Date() : null,

        faqs: {
          create: faqs
            .filter((faq) => faq.question && faq.answer)
            .map((faq, index) => ({
              question: faq.question,
              answer: faq.answer,
              order: index,
            })),
        },

      images: {
  create: images.map((image, index) => ({
    url: image.url.startsWith("/")
      ? image.url
      : `/${image.url}`,
    alt: image.alt || "",
    caption: image.caption || "",
    paragraph: image.paragraph || 0,
    order: index,
  })),
},
      },

      include: {
        faqs: true,
        images: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully.",
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while creating the blog.",
      },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        faqs: true,
        images: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      {
        status: 500,
      }
    );
  }
}
