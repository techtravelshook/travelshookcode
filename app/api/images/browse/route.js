// app/api/images/browse/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function buildTree(dirPath, urlBase) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const folders = [];
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const urlPath = `${urlBase}/${entry.name}`;

    if (entry.isDirectory()) {
      folders.push({
        type: "folder",
        name: entry.name,
        path: urlPath,
        children: buildTree(fullPath, urlPath),
      });
    } else if (/\.(jpe?g|png|webp|gif|svg|avif)$/i.test(entry.name)) {
      files.push({
        type: "file",
        name: entry.name,
        url: urlPath,
      });
    }
  }

  // folders first, then files — both sorted alphabetically
  return [
    ...folders.sort((a, b) => a.name.localeCompare(b.name)),
    ...files.sort((a, b) => a.name.localeCompare(b.name)),
  ];
}

export async function GET() {
  try {
    const imgsDir = path.join(process.cwd(), "public", "imgs");

    if (!fs.existsSync(imgsDir)) {
      return NextResponse.json({ tree: [] });
    }

    const tree = buildTree(imgsDir, "/imgs");
    return NextResponse.json({ tree });
  } catch (err) {
    console.error("Image browse error:", err);
    return NextResponse.json({ error: "Failed to read image directory" }, { status: 500 });
  }
}