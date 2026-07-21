"use client";

import { useEffect, useRef, useState } from "react";

// ─── Toolbar button ─────────────────────────────────────────────────────────
function ToolBtn({ onClick, title, children }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className="px-2 py-1 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-100"
    >
      {children}
    </button>
  );
}

// ─── Get a Range from a pointer position (cross-browser) ────────────────────
function getRangeFromPoint(x, y) {
  if (document.caretRangeFromPoint) {
    return document.caretRangeFromPoint(x, y);
  }
  if (document.caretPositionFromPoint) {
    const pos = document.caretPositionFromPoint(x, y);
    if (!pos) return null;
    const range = document.createRange();
    range.setStart(pos.offsetNode, pos.offset);
    range.collapse(true);
    return range;
  }
  return null;
}

// ─── RichTextEditor ─────────────────────────────────────────────────────────
export default function RichTextEditor({ value, onChange }) {
  const editorRef        = useRef(null);
  const isInternalChange = useRef(false);
  const savedRange       = useRef(null);
  const dropLineRef      = useRef(null);
  const fileInputRef     = useRef(null);        // hidden <input type="file">
  const [isDragOver, setIsDragOver] = useState(false);

  // ── Sync external value → DOM ─────────────────────────────────────────────
  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const notifyChange = () => {
    isInternalChange.current = true;
    onChange?.(editorRef.current?.innerHTML ?? "");
  };

  const exec = (command, val = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    notifyChange();
  };

  // ── Save cursor position before toolbar interactions ──────────────────────
  const saveCursorRange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        savedRange.current = range.cloneRange();
      }
    }
  };

  // ── Insert image at a given Range ─────────────────────────────────────────
  const insertImageAtRange = (url, range) => {
    const editor = editorRef.current;
    if (!editor) return;

    if (!range || !editor.contains(range.commonAncestorContainer)) {
      const p = document.createElement("p");
      const img = document.createElement("img");
      img.src = url;
      img.alt = "";
      img.style.cssText = "max-width:100%;border-radius:8px;margin:8px 0;display:block;";
      p.appendChild(img);
      editor.appendChild(p);
      notifyChange();
      return;
    }

    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    const wrapper = document.createElement("p");
    const img = document.createElement("img");
    img.src = url;
    img.alt = "";
    img.style.cssText = "max-width:100%;border-radius:8px;margin:8px 0;display:block;";
    wrapper.appendChild(img);

    const after = document.createElement("p");
    after.appendChild(document.createElement("br"));

    range.deleteContents();
    range.insertNode(after);
    range.insertNode(wrapper);

    const newRange = document.createRange();
    newRange.setStart(after, 0);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);

    notifyChange();
  };

  // ── Toolbar: pick image from device ──────────────────────────────────────
  const handleImagePickerClick = () => {
    // Save cursor before the file dialog opens (focus leaves the editor)
    saveCursorRange();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const dataUrl = evt.target.result;
      insertImageAtRange(dataUrl, savedRange.current);
      savedRange.current = null;
    };
    reader.readAsDataURL(file);

    // Reset so the same file can be picked again
    e.target.value = "";
  };

  // ── Drop-line ─────────────────────────────────────────────────────────────
  const showDropLine = (x, y) => {
    const editor = editorRef.current;
    if (!editor) return;

    let line = dropLineRef.current;
    if (!line) {
      line = document.createElement("div");
      line.style.cssText = `
        position:absolute; left:0; right:0; height:2px;
        background:#f97316; border-radius:2px; pointer-events:none;
        z-index:50; transition:top 60ms linear;
      `;
      editor.parentElement.style.position = "relative";
      editor.parentElement.appendChild(line);
      dropLineRef.current = line;
    }

    const parentRect = editor.parentElement.getBoundingClientRect();
    const editorRect  = editor.getBoundingClientRect();

    const relY = Math.max(
      editorRect.top  - parentRect.top,
      Math.min(y - parentRect.top, editorRect.bottom - parentRect.top)
    );

    line.style.display = "block";
    line.style.top = `${relY}px`;
  };

  const hideDropLine = () => {
    if (dropLineRef.current) dropLineRef.current.style.display = "none";
  };

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);

    const range = getRangeFromPoint(e.clientX, e.clientY);
    if (range && editorRef.current?.contains(range.commonAncestorContainer)) {
      savedRange.current = range;
    }

    showDropLine(e.clientX, e.clientY);
  };

  const handleDragLeave = (e) => {
    if (!editorRef.current?.contains(e.relatedTarget)) {
      setIsDragOver(false);
      hideDropLine();
      savedRange.current = null;
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    hideDropLine();

    const url = e.dataTransfer.getData("text/plain");
    if (!url) return;

    const dropRange = getRangeFromPoint(e.clientX, e.clientY) ?? savedRange.current;
    savedRange.current = null;

    insertImageAtRange(url, dropRange);
  };

  // ── Toolbar: insert link ──────────────────────────────────────────────────
  const handleLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  // ── Cleanup drop-line on unmount ──────────────────────────────────────────
  useEffect(() => {
    return () => { dropLineRef.current?.remove(); };
  }, []);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <ToolBtn onClick={() => exec("bold")}          title="Bold">          <strong>B</strong>   </ToolBtn>
        <ToolBtn onClick={() => exec("italic")}        title="Italic">        <em>I</em>            </ToolBtn>
        <ToolBtn onClick={() => exec("underline")}     title="Underline">     <u>U</u>              </ToolBtn>
        <ToolBtn onClick={() => exec("strikeThrough")} title="Strikethrough"> <s>S</s>              </ToolBtn>

        <span className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

        <ToolBtn onClick={() => exec("formatBlock", "h2")} title="Heading 2">H2</ToolBtn>
        <ToolBtn onClick={() => exec("formatBlock", "h3")} title="Heading 3">H3</ToolBtn>
        <ToolBtn onClick={() => exec("formatBlock", "p")}  title="Paragraph">¶</ToolBtn>

        <span className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

        <ToolBtn onClick={() => exec("insertUnorderedList")} title="Bullet list">• List</ToolBtn>
        <ToolBtn onClick={() => exec("insertOrderedList")}   title="Numbered list">1. List</ToolBtn>

        <span className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

        <ToolBtn onClick={() => exec("justifyLeft")}   title="Align left">⬅</ToolBtn>
        <ToolBtn onClick={() => exec("justifyCenter")} title="Center">≡</ToolBtn>
        <ToolBtn onClick={() => exec("justifyRight")}  title="Align right">➡</ToolBtn>

        <span className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1" />

        <ToolBtn onClick={handleLink}             title="Insert link">🔗</ToolBtn>

        {/* ── Image picker button ── */}
        <ToolBtn onClick={handleImagePickerClick} title="Insert image from device">🖼 Image</ToolBtn>

        <ToolBtn onClick={() => exec("removeFormat")} title="Clear formatting">✕ fmt</ToolBtn>
      </div>

      {/* Drag hint banner */}
      {isDragOver && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800 px-4 py-2 text-xs text-orange-600 dark:text-orange-300 font-medium flex items-center gap-2">
          <span className="text-base">📍</span>
          Drop here — image will be inserted at the orange line
        </div>
      )}

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={notifyChange}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "min-h-[320px] p-4 outline-none",
          "text-gray-800 dark:text-gray-200",
          "bg-white dark:bg-gray-900",
          "prose prose-sm max-w-none dark:prose-invert",
          "[&_img]:rounded-lg [&_img]:shadow-sm [&_img]:max-w-full [&_img]:my-3",
          "transition-colors duration-100",
          isDragOver ? "bg-orange-50/40 dark:bg-orange-900/10" : "",
        ].join(" ")}
        style={{ direction: "ltr" }}
      />

      {/* Empty-state hint */}
      <style>{`
        [contenteditable]:empty:before {
          content: 'Start writing your blog… or drag an image from the gallery / use 🖼 Image to insert one inline.';
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}