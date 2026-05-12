function toYouTubeEmbedUrl(idOrUrl: string) {
  try {
    const url = new URL(idOrUrl);
    if (url.hostname.includes("youtu.be")) {
      return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`;
    }

    const videoId = url.searchParams.get("v") ?? url.pathname.split("/").pop();
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  } catch {
    return `https://www.youtube-nocookie.com/embed/${idOrUrl}`;
  }
}

export function YouTube({
  id,
  title = "YouTube video",
}: {
  id: string;
  title?: string;
}) {
  return (
    <div className="my-6 aspect-video overflow-hidden rounded-md bg-neutral-100">
      <iframe
        className="h-full w-full"
        src={toYouTubeEmbedUrl(id)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

export function PdfEmbed({
  src,
  title = "PDF document",
  height = 720,
}: {
  src: string;
  title?: string;
  height?: number;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
      <iframe
        className="w-full"
        src={src}
        title={title}
        height={height}
        loading="lazy"
      />
    </div>
  );
}
