"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Individual image thumbnail ───────────────────────────────────────────────
function ImageThumb({ file, onPick }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", file.url);
    e.dataTransfer.effectAllowed = "copy";
  };

  return (
    <div
      title={file.name}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onPick(file.url)}
      className="group relative cursor-grab active:cursor-grabbing rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-150 hover:shadow-md"
    >
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-800">
        <Image
          src={file.url}
          alt={file.name}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-150 group-hover:scale-105"
          unoptimized
        />
      </div>
      {/* Drag hint overlay */}
      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-colors duration-150 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-white bg-orange-500 px-1.5 py-0.5 rounded shadow">
          drag or click
        </span>
      </div>
      <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate px-1.5 py-1 bg-white dark:bg-gray-900">
        {file.name}
      </p>
    </div>
  );
}

// ─── Recursive folder tree node ───────────────────────────────────────────────
function FolderNode({ node, depth = 0, activeFolder, onSelectFolder }) {
  const [open, setOpen] = useState(depth === 0); // root level open by default
  const isActive = activeFolder === node.path;

  const subFolders = node.children?.filter((c) => c.type === "folder") ?? [];
  const fileCount = node.children?.filter((c) => c.type === "file").length ?? 0;

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          onSelectFolder(node.path, node.children ?? []);
        }}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={`w-full flex items-center gap-2 py-1.5 pr-3 text-sm rounded-lg transition-colors duration-100 text-left
          ${isActive
            ? "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 font-medium"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          }`}
      >
        {/* chevron */}
        <svg
          className={`w-3 h-3 flex-shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
        {/* folder icon */}
        <svg className="w-4 h-4 flex-shrink-0 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <span className="truncate flex-1">{node.name}</span>
        {fileCount > 0 && (
          <span className="text-[10px] text-gray-400 flex-shrink-0">{fileCount}</span>
        )}
      </button>

      {open && subFolders.length > 0 && (
        <div>
          {subFolders.map((child) => (
            <FolderNode
              key={child.path}
              node={child}
              depth={depth + 1}
              activeFolder={activeFolder}
              onSelectFolder={onSelectFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main browser component ───────────────────────────────────────────────────
export default function ImageGalleryBrowser({ onPick }) {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFolder, setActiveFolder] = useState(null);
  const [visibleFiles, setVisibleFiles] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch folder tree once on mount
  useEffect(() => {
    fetch("/api/images/browse")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setTree(data.tree);
        // Auto-select first folder if it exists
        const firstFolder = data.tree.find((n) => n.type === "folder");
        if (firstFolder) {
          setActiveFolder(firstFolder.path);
          setVisibleFiles(firstFolder.children?.filter((c) => c.type === "file") ?? []);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectFolder = (folderPath, children) => {
    setActiveFolder(folderPath);
    setSearch("");
    setVisibleFiles(children.filter((c) => c.type === "file"));
  };

  const filtered = search.trim()
    ? visibleFiles.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    : visibleFiles;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="flex border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm" style={{ height: "420px" }}>

      {/* ── Sidebar: folder tree ─────────────────────────────────────────────── */}
      <aside className="w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900/60">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold px-2 mb-2">
          /imgs
        </p>

        {loading && (
          <p className="text-xs text-gray-400 px-2 py-3">Loading folders…</p>
        )}
        {error && (
          <p className="text-xs text-red-500 px-2 py-3">⚠ {error}</p>
        )}
        {!loading && !error && tree.length === 0 && (
          <p className="text-xs text-gray-400 px-2 py-3">No folders found in /public/imgs</p>
        )}

        {tree.map((node) =>
          node.type === "folder" ? (
            <FolderNode
              key={node.path}
              node={node}
              depth={0}
              activeFolder={activeFolder}
              onSelectFolder={handleSelectFolder}
            />
          ) : null
        )}
      </aside>

      {/* ── Main panel: image grid ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* search bar */}
        <div className="flex items-center gap-2 p-3 border-b border-gray-100 dark:border-gray-700">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={activeFolder ? `Search in ${activeFolder.split("/").pop()}…` : "Search images…"}
            className="flex-1 text-sm bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* hint bar */}
        <div className="px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 border-b border-orange-100 dark:border-orange-900/40">
          <p className="text-[11px] text-orange-600 dark:text-orange-400">
            💡 <strong>Drag</strong> an image into the editor to insert it inline, or <strong>click</strong> to set as cover image
          </p>
        </div>

        {/* grid */}
        <div className="flex-1 overflow-y-auto p-3">
          {!activeFolder && !loading && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              ← Select a folder
            </div>
          )}

          {activeFolder && filtered.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              {search ? "No images match your search" : "No images in this folder"}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2">
            {filtered.map((file) => (
              <ImageThumb key={file.url} file={file} onPick={onPick} />
            ))}
          </div>
        </div>

        {/* footer */}
        {filtered.length > 0 && (
          <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-700 text-[11px] text-gray-400">
            {filtered.length} image{filtered.length !== 1 ? "s" : ""}
            {search ? ` matching "${search}"` : ` in ${activeFolder?.split("/").pop()}`}
          </div>
        )}
      </div>
    </div>
  );
}