"use client";

export default function DeleteBlogButton({ action, id }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this blog?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="text-red-600 hover:text-red-700"
      >
        Delete
      </button>
    </form>
  );
}