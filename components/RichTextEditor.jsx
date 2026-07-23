"use client";

import { useEffect, useRef, useState } from "react";

// ─── Toolbar button ─────────────────────────────────────────────────────────
function ToolBtn({ onClick, title, children, active }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      title={title}
      className={[
        "px-2 py-1 rounded text-sm transition-colors duration-100",
        active
          ? "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400"
          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

// ─── Separator ───────────────────────────────────────────────────────────────
function Sep() {
  return <span className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1 self-center" />;
}

// ─── Get a Range from a pointer position (cross-browser) ────────────────────
function getRangeFromPoint(x, y) {
  if (document.caretRangeFromPoint) return document.caretRangeFromPoint(x, y);
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
  const fileInputRef     = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeFormats, setActiveFormats] = useState({});

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
    updateActiveFormats();
  };

  // ── Track which formats are active at cursor ──────────────────────────────
  const updateActiveFormats = () => {
    try {
      setActiveFormats({
        bold:          document.queryCommandState("bold"),
        italic:        document.queryCommandState("italic"),
        underline:     document.queryCommandState("underline"),
        strikeThrough: document.queryCommandState("strikeThrough"),
        ul:            document.queryCommandState("insertUnorderedList"),
        ol:            document.queryCommandState("insertOrderedList"),
        justifyLeft:   document.queryCommandState("justifyLeft"),
        justifyCenter: document.queryCommandState("justifyCenter"),
        justifyRight:  document.queryCommandState("justifyRight"),
      });
    } catch (_) {}
  };

  const exec = (command, val = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    notifyChange();
  };

  // ── Font size via execCommand fontSize (1-7) ──────────────────────────────
  // We map friendly names to execCommand values + clean up <font> tags with CSS
  const applyFontSize = (size) => {
    // size: e.g. "1rem", "1.25rem", etc. — we'll wrap in a span instead
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    // Wrap selection in a <span> with the desired font-size
    const span = document.createElement("span");
    span.style.fontSize = size;
    try {
      range.surroundContents(span);
    } catch {
      // selection spans multiple nodes — extract & wrap
      const frag = range.extractContents();
      span.appendChild(frag);
      range.insertNode(span);
    }
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
    saveCursorRange();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      insertImageAtRange(evt.target.result, savedRange.current);
      savedRange.current = null;
    };
    reader.readAsDataURL(file);
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
        position:absolute;left:0;right:0;height:2px;
        background:#f97316;border-radius:2px;pointer-events:none;
        z-index:50;transition:top 60ms linear;
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

        {/* Text style */}
        <ToolBtn onClick={() => exec("bold")}          title="Bold"          active={activeFormats.bold}>          <strong>B</strong>   </ToolBtn>
        <ToolBtn onClick={() => exec("italic")}        title="Italic"        active={activeFormats.italic}>        <em>I</em>            </ToolBtn>
        <ToolBtn onClick={() => exec("underline")}     title="Underline"     active={activeFormats.underline}>     <u>U</u>              </ToolBtn>
        <ToolBtn onClick={() => exec("strikeThrough")} title="Strikethrough" active={activeFormats.strikeThrough}> <s>S</s>              </ToolBtn>

        <Sep />

        {/* Block format */}
        <ToolBtn onClick={() => exec("formatBlock", "h1")} title="Heading 1">H1</ToolBtn>
        <ToolBtn onClick={() => exec("formatBlock", "h2")} title="Heading 2">H2</ToolBtn>
        <ToolBtn onClick={() => exec("formatBlock", "h3")} title="Heading 3">H3</ToolBtn>
        <ToolBtn onClick={() => exec("formatBlock", "h4")} title="Heading 4">H4</ToolBtn>
        <ToolBtn onClick={() => exec("formatBlock", "p")}  title="Paragraph">¶</ToolBtn>

        <Sep />

        {/* Font size */}
        <ToolBtn onClick={() => applyFontSize("0.75rem")}  title="Small text">A<sub>s</sub></ToolBtn>
        <ToolBtn onClick={() => applyFontSize("1rem")}     title="Normal text">A</ToolBtn>
        <ToolBtn onClick={() => applyFontSize("1.25rem")}  title="Large text"><span style={{fontSize:"1.1em"}}>A</span></ToolBtn>
        <ToolBtn onClick={() => applyFontSize("1.5rem")}   title="Extra large"><span style={{fontSize:"1.25em"}}>A</span></ToolBtn>

        <Sep />

        {/* Lists */}
        <ToolBtn onClick={() => exec("insertUnorderedList")} title="Bullet list"   active={activeFormats.ul}>• List</ToolBtn>
        <ToolBtn onClick={() => exec("insertOrderedList")}   title="Numbered list" active={activeFormats.ol}>1. List</ToolBtn>
        <ToolBtn onClick={() => exec("indent")}              title="Indent">⇥</ToolBtn>
        <ToolBtn onClick={() => exec("outdent")}             title="Outdent">⇤</ToolBtn>

        <Sep />

        {/* Alignment */}
        <ToolBtn onClick={() => exec("justifyLeft")}   title="Align left"   active={activeFormats.justifyLeft}>   ⬅</ToolBtn>
        <ToolBtn onClick={() => exec("justifyCenter")} title="Center"       active={activeFormats.justifyCenter}> ≡</ToolBtn>
        <ToolBtn onClick={() => exec("justifyRight")}  title="Align right"  active={activeFormats.justifyRight}>  ➡</ToolBtn>

        <Sep />

        <ToolBtn onClick={handleLink}             title="Insert link">🔗</ToolBtn>
        <ToolBtn onClick={handleImagePickerClick} title="Insert image">🖼 Image</ToolBtn>
        <ToolBtn onClick={() => exec("removeFormat")} title="Clear formatting">✕ fmt</ToolBtn>
      </div>

      {/* Drag hint banner */}
      {isDragOver && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border-b border-orange-200 dark:border-orange-800 px-4 py-2 text-xs text-orange-600 dark:text-orange-300 font-medium flex items-center gap-2">
          <span className="text-base">📍</span>
          Drop here — image will be inserted at the orange line
        </div>
      )}

      {/* ── Critical: scoped styles that re-apply browser defaults inside contentEditable ── */}
      <style>{`
        /* Reset Tailwind's base reset inside the editor so heading/list tags render visually */
        .rte-body h1 { font-size: 2rem;    font-weight: 700; line-height: 1.25; margin: 0.75rem 0 0.5rem; }
        .rte-body h2 { font-size: 1.5rem;  font-weight: 700; line-height: 1.3;  margin: 0.75rem 0 0.5rem; }
        .rte-body h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.4;  margin: 0.5rem  0 0.4rem; }
        .rte-body h4 { font-size: 1.1rem;  font-weight: 600; line-height: 1.4;  margin: 0.5rem  0 0.4rem; }
        .rte-body h5 { font-size: 1rem;    font-weight: 600; margin: 0.4rem  0 0.3rem; }
        .rte-body h6 { font-size: 0.875rem;font-weight: 600; margin: 0.4rem  0 0.3rem; }
        .rte-body p  { margin: 0.25rem 0; min-height: 1.4em; }

        /* Lists — the most common failure point */
        .rte-body ul {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin: 0.4rem 0;
        }
        .rte-body ol {
          list-style-type: decimal;
          padding-left: 1.75rem;
          margin: 0.4rem 0;
        }
        .rte-body ul ul   { list-style-type: circle;  }
        .rte-body ul ul ul{ list-style-type: square;  }
        .rte-body ol ol   { list-style-type: lower-alpha; }
        .rte-body li {
          display: list-item;    /* critical: Tailwind resets this to block */
          margin: 0.15rem 0;
        }

        /* Inline formatting */
        .rte-body b, .rte-body strong { font-weight: 700; }
        .rte-body i, .rte-body em    { font-style: italic; }
        .rte-body u                  { text-decoration: underline; }
        .rte-body s, .rte-body strike{ text-decoration: line-through; }
        .rte-body a                  { color: #f97316; text-decoration: underline; }

        /* Images */
        .rte-body img { max-width: 100%; border-radius: 8px; margin: 8px 0; display: block; }

        /* Blockquote */
        .rte-body blockquote {
          border-left: 3px solid #f97316;
          padding-left: 1rem;
          margin: 0.5rem 0;
          color: #6b7280;
          font-style: italic;
        }

        /* Code */
        .rte-body pre, .rte-body code {
          font-family: ui-monospace, monospace;
          font-size: 0.875em;
          background: #f3f4f6;
          border-radius: 4px;
          padding: 0.1em 0.3em;
        }

        /* Empty state hint */
        .rte-body:empty:before {
          content: 'Start writing… use H1–H4 for headings, • List for bullets, or drag an image in.';
          color: #9ca3af;
          pointer-events: none;
        }

        /* Dark mode overrides */
        @media (prefers-color-scheme: dark) {
          .rte-body pre, .rte-body code { background: #374151; color: #e5e7eb; }
          .rte-body blockquote { color: #9ca3af; }
        }
      `}</style>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={notifyChange}
        onKeyUp={updateActiveFormats}
        onMouseUp={updateActiveFormats}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "rte-body",
          "min-h-[320px] p-4 outline-none",
          "text-gray-800 dark:text-gray-200",
          "bg-white dark:bg-gray-900",
          "text-base leading-relaxed",
          "transition-colors duration-100",
          isDragOver ? "bg-orange-50/40 dark:bg-orange-900/10" : "",
        ].join(" ")}
        style={{ direction: "ltr" }}
      />
    </div>
  );
}