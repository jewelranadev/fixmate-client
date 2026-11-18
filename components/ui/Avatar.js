import Image from "next/image";

/**
 * Avatar — image with initials fallback.
 * `src` is optional; without it (or without a name) a "?" chip renders.
 * Note for later phases: remote image hosts (e.g. ImgBB) must be added
 * to next/image remotePatterns before `src` is used with real URLs.
 */

const SIZES = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
};

function initialsOf(name) {
  if (!name || !name.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function Avatar({
  src = null,
  alt = "",
  name = "",
  size = "md",
  className = "",
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary-soft font-semibold text-secondary ${SIZES[size]} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || name}
          width={96}
          height={96}
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{initialsOf(name)}</span>
      )}
    </span>
  );
}
