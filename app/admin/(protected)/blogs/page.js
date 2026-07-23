// import Link from "next/link";
// import { prisma } from "@/lib/prisma";

// export default async function BlogsPage() {
//   const blogs = await prisma.blog.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return (
//     <div className="max-w-7xl mx-auto p-8">

//       <div className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold">
//           Blogs
//         </h1>

//         <Link
//           href="/admin/blogs/createblogs"
//           className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold"
//         >
//           + Add Blog
//         </Link>
//       </div>

//       <div className="overflow-x-auto rounded-xl border">

//         <table className="w-full">

//           <thead className="bg-gray-100">

//             <tr>

//               <th className="text-left p-4">Title</th>

//               <th className="text-left p-4">Category</th>

//               <th className="text-left p-4">Author</th>

//               <th className="text-left p-4">Status</th>

//               <th className="text-left p-4">Published</th>

//               <th className="text-left p-4">Actions</th>

//             </tr>

//           </thead>

//           <tbody>

//             {blogs.map((blog) => (
//               <tr
//                 key={blog.id}
//                 className="border-t"
//               >
//                 <td className="p-4 font-medium">
//                   {blog.title}
//                 </td>

//                 <td className="p-4">
//                   {blog.category}
//                 </td>

//                 <td className="p-4">
//                   {blog.author}
//                 </td>

//                 <td className="p-4">

//                   {blog.published ? (
//                     <span className="text-green-600 font-semibold">
//                       Published
//                     </span>
//                   ) : (
//                     <span className="text-yellow-600 font-semibold">
//                       Draft
//                     </span>
//                   )}

//                 </td>

//                 <td className="p-4">
//                   {blog.publishedAt
//                     ? new Date(blog.publishedAt).toLocaleDateString()
//                     : "-"}
//                 </td>

//                 <td className="p-4 flex gap-3">

//                   <Link
//                     href={`/admin/blogs/edit/${blog.id}`}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Edit
//                   </Link>

//                   <button className="text-red-600">
//                     Delete
//                   </button>

//                 </td>

//               </tr>
//             ))}

//           </tbody>

//         </table>

//         {blogs.length === 0 && (
//           <div className="text-center py-16 text-gray-500">
//             No blogs found.
//           </div>
//         )}

//       </div>

//     </div>
//   );
// }
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import DeleteBlogButton from "./DeleteButton";

async function deleteBlog(formData) {
  "use server";

  const id = Number(formData.get("id"));

  console.log("Deleting blog with ID:", id);

  try {
    await prisma.blog.delete({
      where: {
        id,
      },
    });

    console.log("Blog deleted successfully");

    revalidatePath("/admin/blogs");
  } catch (error) {
    console.error("Delete Error:", error);
  }
}

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Blogs</h1>

        <Link
          href="/admin/blogs/createblogs"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold"
        >
          + Add Blog
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Title</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Author</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Published</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t">
                <td className="p-4 font-medium">{blog.title}</td>

                <td className="p-4">{blog.category}</td>

                <td className="p-4">{blog.author}</td>

                <td className="p-4">
                  {blog.published ? (
                    <span className="text-green-600 font-semibold">
                      Published
                    </span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">
                      Draft
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="p-4 flex gap-4 items-center">
                  <Link
                    href={`/admin/blogs/edit/${blog.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                 <DeleteBlogButton
  action={deleteBlog}
  id={blog.id}
/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {blogs.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
}