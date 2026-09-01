"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Maximize2, X } from "lucide-react";

const ZOOMABLE = "(min-width: 640px)";

function subscribe(onChange: () => void) {
  const m = window.matchMedia(ZOOMABLE);
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
}

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

  // On a phone the modal shows the image at nearly the width the page already
  // gives it, so there is nothing to open. Renders as a plain image instead.
  const canZoom = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(ZOOMABLE).matches,
    () => false
  );

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [open]);

  const image = (
    <Image
      src={src}
      alt={alt}
      width={1600}
      height={1000}
      priority={priority}
      className="w-full h-auto"
    />
  );

  if (!canZoom) {
    return (
      <div className="overflow-hidden rounded-xl border border-rule bg-muted/40">
        {image}
      </div>
    );
  }

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
        {image}
        <span
          aria-hidden
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
