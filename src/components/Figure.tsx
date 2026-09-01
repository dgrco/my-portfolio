import Image from "next/image";

// width/height are the source's intrinsic size; they only set the aspect ratio.
export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1000,
  pixelated = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  pixelated?: boolean;
}) {
  return (
    <figure className="my-8">
      <div className="rounded-lg overflow-hidden border border-rule bg-muted/40">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          style={pixelated ? { imageRendering: "pixelated" } : undefined}
        />
      </div>
      {caption && (
        <figcaption className="meta mt-3 leading-relaxed">{caption}</figcaption>
      )}
    </figure>
  );
}
