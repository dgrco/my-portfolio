"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

/*
 * A project cover that opens full size in a modal.
 *
 * Dense UI does not survive being scaled into a reading column, and no column
 * is wide enough to fix that, so the full file is one click away instead.
 *
 * Built on <dialog> rather than a hand-rolled overlay: it renders in the top
 * layer above everything, closes on Escape, and traps focus without any of
 * that being reimplemented here.
 */
export function CoverImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Scrolling the page behind an open modal is disorienting, and the modal
  // itself never scrolls: the image is sized to fit the viewport.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dialogRef.current?.showModal();
          setOpen(true);
        }}
        aria-label={`${alt}. Open full size`}
        className="group/cover relative block w-full overflow-hidden rounded-xl border border-rule bg-muted/40 cursor-zoom-in"
      >
        <Image
          src={src}
          alt={alt}
          width={1600}
          height={1000}
          priority={priority}
          className="w-full h-auto"
        />
        <span
          aria-hidden
          /*
            Hover reveals it on a pointer device. Touch has no hover, so there
            it stays visible rather than being permanently undiscoverable.
          */
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-background/85 backdrop-blur-sm border border-rule px-2.5 py-1.5 text-[13px] text-foreground/80 opacity-0 group-hover/cover:opacity-100 group-focus-visible/cover:opacity-100 [@media(hover:none)]:opacity-100 transition-opacity"
        >
          <Maximize2 size={13} />
          Full size
        </span>
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        aria-label={alt}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-foreground backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        {/* Clicking anywhere off the image closes; the image swallows its own
            clicks so dragging or tapping it does not dismiss. */}
        <div
          className="flex h-full w-full items-center justify-center p-4 sm:p-10"
          onClick={close}
        >
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1000}
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/85 backdrop-blur-sm border border-rule text-foreground/80 hover:text-foreground hover:bg-background transition-colors"
        >
          <X size={18} />
        </button>
      </dialog>
    </>
  );
}
