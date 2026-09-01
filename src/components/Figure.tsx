import Image from "next/image";

/*
 * Image slot for writeups. Drop a file in /public and reference it by path.
 * Width and height are the intrinsic pixel size of the source and only set the
 * aspect ratio, since the image renders fluid and next/image is unoptimized
 * under the static export.
 */
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
