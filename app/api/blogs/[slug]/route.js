import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET Single Blog
export async function GET(req, { params }) {
  try {
    const { slug } = await params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        faqs: {
          orderBy: { order: "asc" },
        },
        images: {
          orderBy: [{ paragraph: "asc" }, { order: "asc" }],
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch blog" }, { status: 500 });
  }
}

// UPDATE BLOG
export async function PUT(req, { params }) {
  try {
    const { slug } = await params;

    const body = await req.json();

    const { title, excerpt, content, coverImage, category, author, published, faqs = [], images = [] } = body;

    const existing = await prisma.blog.findUnique({ where: { slug } });

    if (!existing) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const updatedBlog = await prisma.$transaction(async (tx) => {
      const blog = await tx.blog.update({
        where: { slug },
        data: {
          title,
          excerpt,
          content,
          coverImage,
          category,
          author,
          published,
          publishedAt: published ? new Date() : null,
        },
      });

      await tx.blogFaq.deleteMany({ where: { blogId: blog.id } });

      if (faqs.length > 0) {
        await tx.blogFaq.createMany({
          data: faqs.map((faq, index) => ({
            question: faq.question,
            answer: faq.answer,
            order: faq.order ?? index,
            blogId: blog.id,
          })),
        });
      }

      await tx.blogImage.deleteMany({ where: { blogId: blog.id } });

      if (images.length > 0) {
        await tx.blogImage.createMany({
          data: images.map((image, index) => ({
            url: image.url,
            alt: image.alt || "",
            caption: image.caption || "",
            paragraph: image.paragraph ?? 0,
            order: image.order ?? index,
            blogId: blog.id,
          })),
        });
      }

      return await tx.blog.findUnique({
        where: { id: blog.id },
        include: {
          faqs: { orderBy: { order: "asc" } },
          images: { orderBy: [{ paragraph: "asc" }, { order: "asc" }] },
        },
      });
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update blog", error: error.message }, { status: 500 });
  }
}

// DELETE BLOG
export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;

    const existing = await prisma.blog.findUnique({ where: { slug } });

    if (!existing) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    await prisma.blog.delete({ where: { slug } });

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete blog" }, { status: 500 });
  }
}