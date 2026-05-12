import Image, { type ImageProps } from "next/image";

type MdxImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  caption?: string;
};

export function MdxImage({ alt, caption, className = "", ...props }: MdxImageProps) {
  return (
    <figure className="my-6">
      <Image
        className={`h-auto w-full rounded-md object-cover ${className}`}
        alt={alt}
        sizes={props.sizes ?? "(min-width: 1024px) 768px, 100vw"}
        {...props}
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-neutral-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export function Gallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {images.map((image) => (
        <figure key={image.src} className="min-w-0">
          <Image
            className="aspect-[4/3] h-auto w-full rounded-md object-cover"
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1200}
            height={image.height ?? 900}
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          />
          {image.caption ? (
            <figcaption className="mt-2 text-sm text-neutral-600">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
